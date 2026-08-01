-- Brenda Cat Sitter — esquema Supabase
-- Pegá este SQL en: Supabase Dashboard → SQL Editor → New query → Run

-- Extensiones
create extension if not exists "pgcrypto";

-- Contacto (1 fila)
create table if not exists public.site_contact (
  id int primary key default 1 check (id = 1),
  whatsapp text not null,
  phone_formatted text not null,
  email text not null,
  instagram text not null,
  instagram_url text not null,
  tiktok text not null,
  tiktok_url text not null,
  whatsapp_base_message text not null,
  updated_at timestamptz default now()
);

-- Tarifas (1 fila)
create table if not exists public.service_rates (
  id int primary key default 1 check (id = 1),
  duration text not null,
  period_notice text not null,
  weekday text not null,
  saturday text not null,
  sunday_holiday text not null,
  interview text not null,
  interview_desc text not null,
  key_handover text not null,
  payment_terms text not null,
  cancellation_policy text not null,
  updated_at timestamptz default now()
);

-- Barrios
create table if not exists public.neighborhoods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Gatos (galería)
create table if not exists public.cats (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner text not null default '',
  image_url text not null default '',
  story text not null default '',
  personality text[] not null default '{}',
  favorite_activity text not null default '',
  visits_count int not null default 0,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Testimonios
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  verified boolean not null default true,
  cat_name text,
  avatar_bg text not null default 'bg-emerald-100 text-emerald-800',
  date_label text not null default '',
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Servicios
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon_name text not null default 'Heart',
  highlight text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- RLS
alter table public.site_contact enable row level security;
alter table public.service_rates enable row level security;
alter table public.neighborhoods enable row level security;
alter table public.cats enable row level security;
alter table public.testimonials enable row level security;
alter table public.services enable row level security;

-- Lectura pública
create policy "Public read contact" on public.site_contact for select using (true);
create policy "Public read rates" on public.service_rates for select using (true);
create policy "Public read neighborhoods" on public.neighborhoods for select using (true);
create policy "Public read cats" on public.cats for select using (true);
create policy "Public read testimonials" on public.testimonials for select using (true);
create policy "Public read services" on public.services for select using (true);

-- Escritura solo autenticados
create policy "Auth write contact" on public.site_contact for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write rates" on public.service_rates for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write neighborhoods" on public.neighborhoods for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write cats" on public.cats for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write services" on public.services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage para fotos de gatos
insert into storage.buckets (id, name, public)
values ('cat-images', 'cat-images', true)
on conflict (id) do nothing;

create policy "Public read cat images"
  on storage.objects for select
  using (bucket_id = 'cat-images');

create policy "Auth upload cat images"
  on storage.objects for insert
  with check (bucket_id = 'cat-images' and auth.role() = 'authenticated');

create policy "Auth update cat images"
  on storage.objects for update
  using (bucket_id = 'cat-images' and auth.role() = 'authenticated');

create policy "Auth delete cat images"
  on storage.objects for delete
  using (bucket_id = 'cat-images' and auth.role() = 'authenticated');

-- Seed inicial (contacto + tarifas + barrios)
insert into public.site_contact (
  id, whatsapp, phone_formatted, email, instagram, instagram_url, tiktok, tiktok_url, whatsapp_base_message
) values (
  1,
  '5491161386748',
  '+54 9 11 6138-6748',
  'brendacatsitter@gmail.com',
  'brendacatsitter',
  'https://www.instagram.com/brendacatsitter/',
  'brendanusynkier',
  'https://www.tiktok.com/@brendanusynkier?lang=es',
  'Hola Brenda! Me gustaría consultar disponibilidad y tarifas para el cuidado de mi gato'
) on conflict (id) do nothing;

insert into public.service_rates (
  id, duration, period_notice, weekday, saturday, sunday_holiday, interview, interview_desc,
  key_handover, payment_terms, cancellation_policy
) values (
  1,
  '45 minutos de visita dedicada',
  'Tarifas por visita — vigentes hasta fin de octubre',
  '$18.000',
  '$21.000',
  '$25.000',
  '$18.000',
  'Es ideal coordinar una primera visita a tu domicilio para conocernos, conocer a tu gato y saber dónde están todos sus elementos y cómo es su rutina.',
  'La entrega y retiro de llaves quedan a cargo del cliente en el domicilio de Brenda en Saavedra (se pueden enviar por moto mensajería).',
  '50% para congelar la reserva previo al viaje y 50% el último día de visitas.',
  'Solo se reintegra la seña si Brenda no pudiera asistir por fuerza mayor (ofreciendo siempre un reemplazo de confianza). No se realizan reembolsos si el cliente decide acortar el viaje o volver antes de lo pactado.'
) on conflict (id) do nothing;

insert into public.neighborhoods (name, sort_order) 
select * from (values
  ('Núñez', 1),
  ('Saavedra', 2),
  ('Belgrano', 3),
  ('Villa Urquiza', 4),
  ('Colegiales', 5),
  ('Vicente López', 6)
) as v(name, sort_order)
where not exists (select 1 from public.neighborhoods limit 1);
