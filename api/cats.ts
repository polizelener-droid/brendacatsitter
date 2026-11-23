import type { VercelRequest, VercelResponse } from '@vercel/node';

const OWNER = 'polizelener-droid';
const REPO = 'brendacatsitter';
const BRANCH = 'main';
const DATA_PATH = 'public/cats.json';

async function github(path: string, init?: RequestInit) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('Falta configurar GITHUB_TOKEN en Vercel.');
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('GITHUB_TOKEN inválido o vencido en Vercel.');
    throw new Error(`GitHub: ${response.status}`);
  }
  return response.json();
}

async function readCats() {
  const data = await github(`/repos/${OWNER}/${REPO}/contents/${DATA_PATH}?ref=${BRANCH}`);
  const encoded = String(data.content || '').trim();
  if (!encoded) return [];
  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const cats = await readCats();
      return res.status(200).json({ cats });
    }

    const expected = process.env.ADMIN2_PASSWORD;
    const supplied = String(req.body?.password || '');
    if (!expected || supplied !== expected) return res.status(401).json({ error: 'Clave incorrecta.' });

    if (req.method === 'POST' && req.body?.action === 'auth') {
      return res.status(200).json({ ok: true });
    }

    const cats = await readCats();

    if (req.method === 'POST' && req.body?.action === 'list') {
      return res.status(200).json({ cats });
    }

    if (req.method === 'POST') {
      const cat = req.body?.cat;
      const catalog = Array.isArray(req.body?.catalog) ? req.body.catalog : [];
      if (!cat?.id || !cat?.name) return res.status(400).json({ error: 'Faltan datos del gato.' });

      // Photos are stored as separate files in public/cats; cats.json only keeps their URL.
      if (typeof cat.image === 'string' && cat.image.startsWith('data:')) {
        const match = /^data:([^;]+);base64,([A-Za-z0-9+/=]+)$/.exec(cat.image);
        if (!match || !['image/jpeg', 'image/png', 'image/webp'].includes(match[1])) {
          return res.status(400).json({ error: 'Formato de foto no válido. Usá JPG, PNG o WEBP.' });
        }
        const imageBuffer = Buffer.from(match[2], 'base64');
        if (imageBuffer.length > 4 * 1024 * 1024) return res.status(413).json({ error: 'La foto pesa demasiado. Probá con otra imagen.' });
        const ext = match[1] === 'image/png' ? 'png' : match[1] === 'image/webp' ? 'webp' : 'jpg';
        const safeId = String(cat.id).replace(/[^a-zA-Z0-9-]/g, '').slice(0, 36) || Date.now().toString();
        const safeName = String(cat.name).normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 32) || 'gato';
        const imagePath = `public/cats/${safeName}-${safeId.slice(0, 8)}.${ext}`;
        await github(`/repos/${OWNER}/${REPO}/contents/${imagePath}`, {
          method: 'PUT',
          body: JSON.stringify({ message: `Add photo for ${cat.name}`, content: imageBuffer.toString('base64'), branch: BRANCH }),
        });
        cat.image = `/cats/${safeName}-${safeId.slice(0, 8)}.${ext}`;
      }

      // If the persistent file is empty, seed it from the complete catalog currently
      // shown in the admin. This lets legacy cats become editable without losing them.
      const source = cats.length ? cats : catalog;
      const next = [...source.filter((c: any) => c?.id && c.id !== cat.id), cat];

      const current = await github(`/repos/${OWNER}/${REPO}/contents/${DATA_PATH}?ref=${BRANCH}`);
      await github(`/repos/${OWNER}/${REPO}/contents/${DATA_PATH}`, {
        method: 'PUT',
        body: JSON.stringify({ message: `Save cat ${cat.name}`, content: Buffer.from(JSON.stringify(next, null, 2) + '\n').toString('base64'), sha: current.sha, branch: BRANCH }),
      });
      return res.status(200).json({ cats: next });
    }

    if (req.method === 'DELETE') {
      const id = String(req.body?.id || '');
      const next = cats.filter((c: any) => c.id !== id);
      const current = await github(`/repos/${OWNER}/${REPO}/contents/${DATA_PATH}?ref=${BRANCH}`);
      await github(`/repos/${OWNER}/${REPO}/contents/${DATA_PATH}`, {
        method: 'PUT',
        body: JSON.stringify({ message: 'Remove cat', content: Buffer.from(JSON.stringify(next, null, 2) + '\n').toString('base64'), sha: current.sha, branch: BRANCH }),
      });
      return res.status(200).json({ cats: next });
    }

    return res.status(405).json({ error: 'Método no permitido.' });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Error inesperado.' });
  }
}
