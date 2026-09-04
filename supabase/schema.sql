-- ════════════════════════════════════════════════════════════════
--  SETUP SUPABASE — Espace photos du mariage
--  Exécutez ce script dans : Supabase Dashboard → SQL Editor
-- ════════════════════════════════════════════════════════════════

-- 1. Table des métadonnées de photos
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  author text not null default 'Invité',
  created_at timestamptz not null default now()
);

-- 2. RLS : lecture + écriture publiques (invités sans compte), pas de suppression
alter table public.photos enable row level security;

create policy "Lecture publique des photos"
  on public.photos for select to anon using (true);

create policy "Dépôt public des photos"
  on public.photos for insert to anon with check (true);

-- 3. Bucket de stockage public
insert into storage.buckets (id, name, public)
values ('mariage-photos', 'mariage-photos', true)
on conflict (id) do nothing;

-- 4. Policies Storage : lecture publique, upload anonyme, pas de suppression
create policy "Lecture publique du bucket mariage"
  on storage.objects for select to anon
  using (bucket_id = 'mariage-photos');

create policy "Upload public dans le bucket mariage"
  on storage.objects for insert to anon
  with check (bucket_id = 'mariage-photos');
