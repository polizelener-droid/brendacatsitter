# Panel Admin (Supabase)

El contenido del sitio se puede editar en `/admin` sin tocar código.

## 1. Crear proyecto en Supabase

1. Entrá a [https://supabase.com](https://supabase.com) y creá un proyecto.
2. Andá a **Project Settings → API** y copiá:
   - **Project URL**
   - **anon public** key

## 2. Configurar el sitio

1. En Supabase andá a **Settings → API Keys**.
2. Copiá la **Publishable key** (`sb_publishable_...`). **No uses la Secret.**
3. La **Project URL** está en **Settings → Data API** o en el botón **Connect** (arriba), formato `https://xxxxx.supabase.co`.
4. Completá `.env`:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

5. Reiniciá `npm run dev`.

## 3. Crear tablas y permisos

1. En Supabase: **SQL Editor → New query**.
2. Pegá todo el contenido de `supabase/schema.sql`.
3. Ejecutá **Run**.

Eso crea tablas, políticas de lectura pública, escritura solo para usuarios logueados, el bucket de fotos `cat-images`, y datos iniciales de contacto, tarifas y barrios.

## 4. Crear usuario admin

1. En Supabase: **Authentication → Users → Add user**.
2. Creá un usuario con email y contraseña (marcá “Auto Confirm”).
3. Entrá a la web: `http://localhost:3000/admin`
4. Iniciá sesión con ese email y contraseña.

## 5. Qué se puede editar

| Sección | Acciones |
|---------|----------|
| Gatos | Agregar, editar nombre, subir foto, eliminar |
| Tarifas | Precios y textos de políticas |
| Reseñas | Agregar / editar / eliminar (o importar las actuales) |
| Contacto | WhatsApp, email, Instagram, TikTok |
| Barrios | Agregar / renombrar / eliminar |
| Servicios | Agregar / editar / eliminar (o importar los actuales) |

## Notas

- Sin `.env.local`, el sitio sigue funcionando con el contenido local de respaldo.
- Si en Supabase no hay gatos con foto, se muestran los gatos locales.
- En producción (Vercel/Netlify), cargá las mismas variables de entorno y asegurate de que las rutas SPA redirijan `/admin` al `index.html`.
