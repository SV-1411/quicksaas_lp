create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  details text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- disable RLS for easy testing
alter table public.app_users disable row level security;
