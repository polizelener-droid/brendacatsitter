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
  if (!response.ok) throw new Error(`GitHub: ${response.status}`);
  return response.json();
}

async function readCats() {
  const data = await github(`/repos/${OWNER}/${REPO}/contents/${DATA_PATH}?ref=${BRANCH}`);
  return JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const expected = process.env.ADMIN2_PASSWORD;
    const supplied = String(req.body?.password || '');
    if (!expected || supplied !== expected) return res.status(401).json({ error: 'Clave incorrecta.' });

    // Used by the Admin2 login screen to verify the password without exposing it.
    if (req.method === 'POST' && req.body?.action === 'auth') {
      return res.status(200).json({ ok: true });
    }

    const cats = await readCats();

    if (req.method === 'GET') return res.status(200).json({ cats });

    if (req.method === 'POST') {
      const cat = req.body?.cat;
      if (!cat?.id || !cat?.name || !cat?.image) return res.status(400).json({ error: 'Faltan datos del gato.' });
      const next = [...cats.filter((c: any) => c.id !== cat.id), cat];
      const current = await github(`/repos/${OWNER}/${REPO}/contents/${DATA_PATH}?ref=${BRANCH}`);
      await github(`/repos/${OWNER}/${REPO}/contents/${DATA_PATH}`, {
        method: 'PUT',
        body: JSON.stringify({ message: `Add cat ${cat.name}`, content: Buffer.from(JSON.stringify(next, null, 2) + '\n').toString('base64'), sha: current.sha, branch: BRANCH }),
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
