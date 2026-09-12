import fs from 'node:fs';
import path from 'node:path';

const backupPath =
  'C:\\Users\\usuario\\Downloads\\db_cluster-12-09-2026@17-13-07.backup (1)\\db_cluster-12-09-2026@17-13-07.backup (1)';
const storageDir =
  'C:\\Users\\usuario\\Downloads\\wlaetolnsmrgxwxgoimd.storage (1)\\wlaetolnsmrgxwxgoimd\\cat-images';
const outDir = path.resolve('public/cats');
const outJson = path.resolve('public/cats.json');

function parseCopy(sql, table) {
  const start = sql.indexOf(`COPY public.${table} `);
  if (start < 0) throw new Error(`No se encontró ${table}`);
  const headerEnd = sql.indexOf('\n', start);
  const header = sql.slice(start, headerEnd);
  const colsMatch = header.match(/\(([^)]+)\)/);
  const cols = colsMatch ? colsMatch[1].split(',').map((col) => col.trim()) : [];
  const bodyStart = headerEnd + 1;
  const bodyEnd = sql.indexOf('\n\\.\n', bodyStart);
  const rows = sql.slice(bodyStart, bodyEnd).split('\n').filter(Boolean);
  return rows.map((line) => {
    const values = line.split('\t');
    const row = {};
    cols.forEach((col, i) => {
      row[col] = values[i] === '\\N' ? '' : values[i] ?? '';
    });
    return row;
  });
}

function slug(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'gato';
}

function findStorageFile(imageUrl, id) {
  const fromUrl = imageUrl.split('/cat-images/')[1];
  if (fromUrl) {
    const exact = path.join(storageDir, fromUrl);
    if (fs.existsSync(exact)) return exact;
  }
  const entries = fs.readdirSync(storageDir, { withFileTypes: true });
  const match = entries.find((entry) => entry.name.startsWith(id));
  if (!match) return null;
  const full = path.join(storageDir, match.name);
  if (match.isDirectory()) {
    const nested = fs.readdirSync(full).find((file) => /\.(jpe?g|png|webp)$/i.test(file));
    return nested ? path.join(full, nested) : null;
  }
  return full;
}

const sql = fs.readFileSync(backupPath, 'utf8');
const cats = parseCopy(sql, 'cats')
  .map((row) => ({
    ...row,
    sort_order: Number(row.sort_order || 0),
    visits_count: Number(row.visits_count || 0),
  }))
  .sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name, 'es'));

fs.mkdirSync(outDir, { recursive: true });

const imported = [];
let missing = 0;

for (const cat of cats) {
  const source = findStorageFile(cat.image_url, cat.id);
  let image = '';
  if (source) {
    const ext = path.extname(source) || '.jpg';
    const fileName = `${slug(cat.name)}-${cat.id.slice(0, 8)}${ext.toLowerCase()}`;
    fs.copyFileSync(source, path.join(outDir, fileName));
    image = `/cats/${fileName}`;
  } else {
    missing += 1;
  }

  imported.push({
    id: cat.id,
    name: cat.name.trim(),
    owner: (cat.owner || '').trim(),
    image,
    story: cat.story || '',
    personality: [],
    favoriteActivity: cat.favorite_activity || '',
    visitsCount: cat.visits_count,
  });
}

fs.writeFileSync(outJson, `${JSON.stringify(imported, null, 2)}\n`);
console.log(`Gatos importados: ${imported.length}`);
console.log(`Con foto: ${imported.filter((cat) => cat.image).length}`);
console.log(`Sin foto: ${missing}`);
console.log(`JSON: ${outJson}`);
