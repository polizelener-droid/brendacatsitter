import type { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import type { Connect, Plugin } from 'vite';

const LOCAL_PASSWORD_FALLBACK = 'brenda';

function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw) as Record<string, unknown>);
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export function adminApiPlugin(password: string | undefined): Plugin {
  const expected = password || LOCAL_PASSWORD_FALLBACK;

  const handle = async (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
    const url = req.url?.split('?')[0];
    if (url !== '/api/cats') {
      next();
      return;
    }

    const catsPath = path.resolve(process.cwd(), 'public/cats.json');
    const readCats = () => {
      try {
        if (!fs.existsSync(catsPath)) return [];
        const parsed = JSON.parse(fs.readFileSync(catsPath, 'utf8'));
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };
    const writeCats = (cats: unknown[]) => {
      fs.writeFileSync(catsPath, `${JSON.stringify(cats, null, 2)}\n`);
    };

    try {
      if (req.method === 'GET') {
        sendJson(res, 200, { cats: readCats() });
        return;
      }

      const body = await readBody(req);
      const supplied = String(body.password || '');
      if (supplied !== expected) {
        sendJson(res, 401, { error: 'Clave incorrecta.' });
        return;
      }

      if (req.method === 'POST' && body.action === 'auth') {
        sendJson(res, 200, { ok: true });
        return;
      }

      const cats = readCats();

      if (req.method === 'POST' && body.action === 'list') {
        sendJson(res, 200, { cats });
        return;
      }

      if (req.method === 'POST') {
        const cat = body.cat as { id?: string; name?: string } | undefined;
        const catalog = Array.isArray(body.catalog) ? body.catalog : [];
        if (!cat?.id || !cat?.name) {
          sendJson(res, 400, { error: 'Faltan datos del gato.' });
          return;
        }
        const source = cats.length ? cats : catalog;
        const next = [...source.filter((item) => {
          const row = item as { id?: string };
          return row?.id && row.id !== cat.id;
        }), cat];
        writeCats(next);
        sendJson(res, 200, { cats: next });
        return;
      }

      if (req.method === 'DELETE') {
        const id = String(body.id || '');
        const next = cats.filter((item) => (item as { id?: string }).id !== id);
        writeCats(next);
        sendJson(res, 200, { cats: next });
        return;
      }

      sendJson(res, 405, { error: 'Método no permitido.' });
    } catch (error) {
      sendJson(res, 500, { error: error instanceof Error ? error.message : 'Error inesperado.' });
    }
  };

  return {
    name: 'local-admin-api',
    configureServer(server) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle);
    },
  };
}
