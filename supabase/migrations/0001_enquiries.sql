-- Website enquiries for manasgeotextile.com.
-- Run once in Supabase → SQL Editor (or `supabase db push`).
--
-- Security model: Row Level Security is ON and there are NO policies for the
-- anon/authenticated roles, so the public API cannot read or write this table.
-- Only the website's server route (using the service_role / secret key, kept in
-- Vercel env vars) can insert, and only signed-in dashboard users can read.

create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  status      text not null default 'new'
              check (status in ('new', 'contacted', 'quoted', 'won', 'lost', 'spam')),
  name        text not null check (char_length(name) between 1 and 120),
  company     text check (char_length(company) <= 160),
  email       text check (char_length(email) <= 200),
  phone       text check (char_length(phone) <= 40),
  product     text check (char_length(product) <= 120),
  quantity    text check (char_length(quantity) <= 80),
  location    text check (char_length(location) <= 160),
  message     text check (char_length(message) <= 4000),
  datasheet   boolean not null default false,
  source_page text check (char_length(source_page) <= 200),
  ip          text,
  user_agent  text check (char_length(user_agent) <= 300),
  notes       text,
  constraint enquiries_contact_present check (email is not null or phone is not null)
);

comment on table public.enquiries is 'Quote and datasheet requests from the website contact form.';
comment on column public.enquiries.status is 'Sales pipeline: new → contacted → quoted → won/lost (or spam).';

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

alter table public.enquiries enable row level security;

-- Belt and braces: make sure the public roles have no table privileges at all.
revoke all on table public.enquiries from anon, authenticated;
