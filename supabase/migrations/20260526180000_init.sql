-- ===================================================================
-- NURVICA initial schema.
--
-- Tables, RLS policies, and the RAG match RPC. All user-owned tables
-- enable RLS and policies key on auth.uid().
-- ===================================================================

create extension if not exists vector;
create extension if not exists pgcrypto;


-- ────────────────────────────────────────────────────────────────────
-- profiles — onboarding answers, one row per auth user
-- ────────────────────────────────────────────────────────────────────
create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  migrated_at     timestamptz,  -- non-null once localStorage migration ran

  -- Onboarding answers (mirror app/onboarding/questions.ts keys; arrays are
  -- text[] so we can write directly without lookup tables in this phase).
  gender          text,
  age_gate        boolean,
  curl_pattern    text,
  hair_length     text,
  thickness       text,
  wet_feel        text,
  current_state   text[] default '{}',
  scalp_feel      text[] default '{}',
  wash_frequency  text,
  concerns        text[] default '{}',
  main_goal       text[] default '{}',
  styles          text[] default '{}',
  heat            text,
  tension         text,
  activity        text,
  lifestyle       text[] default '{}',
  city            text,
  climate         text,
  anything_else   text
);

alter table public.profiles enable row level security;

create policy "profiles: select own"  on public.profiles for select using (auth.uid() = id);
create policy "profiles: insert own"  on public.profiles for insert with check (auth.uid() = id);
create policy "profiles: update own"  on public.profiles for update using (auth.uid() = id);


-- ────────────────────────────────────────────────────────────────────
-- routine_completions — replaces localStorage `nurvica:routine:YYYY-M-D`
-- ────────────────────────────────────────────────────────────────────
create table public.routine_completions (
  user_id     uuid not null references auth.users(id) on delete cascade,
  date        date not null,
  step_id     text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, date, step_id)
);

alter table public.routine_completions enable row level security;

create policy "routine: select own" on public.routine_completions for select using (auth.uid() = user_id);
create policy "routine: insert own" on public.routine_completions for insert with check (auth.uid() = user_id);
create policy "routine: delete own" on public.routine_completions for delete using (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────────────
-- conversations + messages — replaces localStorage `nurvica:chat:store`
-- ────────────────────────────────────────────────────────────────────
create table public.conversations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null default 'New chat',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index conversations_user_updated_idx on public.conversations (user_id, updated_at desc);

alter table public.conversations enable row level security;

create policy "conversations: select own" on public.conversations for select using (auth.uid() = user_id);
create policy "conversations: insert own" on public.conversations for insert with check (auth.uid() = user_id);
create policy "conversations: update own" on public.conversations for update using (auth.uid() = user_id);
create policy "conversations: delete own" on public.conversations for delete using (auth.uid() = user_id);


create table public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role            text not null check (role in ('user', 'assistant')),
  content         text not null default '',
  -- Assistant message structured payload (AIResponse shape: intro, diagnosis,
  -- steps, followUp, links). null for user rows.
  response        jsonb,
  saved           boolean not null default false,
  created_at      timestamptz not null default now()
);

create index messages_conversation_created_idx on public.messages (conversation_id, created_at);

alter table public.messages enable row level security;

-- Membership of a message is via conversation ownership.
create policy "messages: select via conv" on public.messages for select
  using (exists (
    select 1 from public.conversations c
    where c.id = messages.conversation_id and c.user_id = auth.uid()
  ));
create policy "messages: insert via conv" on public.messages for insert
  with check (exists (
    select 1 from public.conversations c
    where c.id = messages.conversation_id and c.user_id = auth.uid()
  ));
create policy "messages: update via conv" on public.messages for update
  using (exists (
    select 1 from public.conversations c
    where c.id = messages.conversation_id and c.user_id = auth.uid()
  ));
create policy "messages: delete via conv" on public.messages for delete
  using (exists (
    select 1 from public.conversations c
    where c.id = messages.conversation_id and c.user_id = auth.uid()
  ));


-- ────────────────────────────────────────────────────────────────────
-- community_state — replaces localStorage `nurvica:community:store`
-- One row per user. Arrays mirror the client-side Set semantics.
-- ────────────────────────────────────────────────────────────────────
create table public.community_state (
  user_id   uuid primary key references auth.users(id) on delete cascade,
  selected  text not null default 'for-you',
  joined    text[] not null default '{}',
  saved     text[] not null default '{}',
  helpful   text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.community_state enable row level security;

create policy "community: select own" on public.community_state for select using (auth.uid() = user_id);
create policy "community: insert own" on public.community_state for insert with check (auth.uid() = user_id);
create policy "community: update own" on public.community_state for update using (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────────────
-- kb_documents + kb_chunks — RAG knowledge base
-- ────────────────────────────────────────────────────────────────────
create table public.kb_documents (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  source_path   text not null,          -- e.g. "content/kb/wash-day.docx"
  content_hash  text not null,          -- SHA-256 of the source file
  updated_at    timestamptz not null default now()
);

alter table public.kb_documents enable row level security;

-- Knowledge base is public-read: any authenticated or anon caller can read
-- to power retrieval. Writes are service-role only (no policy below means
-- only the service role can write).
create policy "kb_documents: public read" on public.kb_documents for select using (true);


create table public.kb_chunks (
  id           bigserial primary key,
  document_id  uuid not null references public.kb_documents(id) on delete cascade,
  position     int not null,
  content      text not null,
  tokens       int,
  embedding    vector(1536) not null,
  created_at   timestamptz not null default now()
);

create index kb_chunks_doc_idx on public.kb_chunks (document_id, position);
create index kb_chunks_embedding_idx
  on public.kb_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

alter table public.kb_chunks enable row level security;

create policy "kb_chunks: public read" on public.kb_chunks for select using (true);


-- ────────────────────────────────────────────────────────────────────
-- chat_traces — optional row per RAG turn, for tuning the system prompt
-- ────────────────────────────────────────────────────────────────────
create table public.chat_traces (
  id                  bigserial primary key,
  user_id             uuid references auth.users(id) on delete set null,
  prompt              text not null,
  retrieved_chunk_ids bigint[] not null default '{}',
  response_text       text not null,
  created_at          timestamptz not null default now()
);

alter table public.chat_traces enable row level security;

-- Users can see their own traces; service role writes them.
create policy "chat_traces: select own" on public.chat_traces for select using (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────────────
-- RPC: match_kb_chunks
-- Returns top-K chunks ordered by cosine similarity to the query embedding,
-- filtered by an optional minimum similarity threshold.
-- ────────────────────────────────────────────────────────────────────
create or replace function public.match_kb_chunks(
  query_embedding vector(1536),
  match_count     int default 6,
  min_similarity  float default 0.4
)
returns table (
  id          bigint,
  document_id uuid,
  content     text,
  similarity  float,
  doc_slug    text,
  doc_title   text
)
language sql
stable
as $$
  select
    c.id,
    c.document_id,
    c.content,
    1 - (c.embedding <=> query_embedding) as similarity,
    d.slug as doc_slug,
    d.title as doc_title
  from public.kb_chunks c
  join public.kb_documents d on d.id = c.document_id
  where 1 - (c.embedding <=> query_embedding) >= min_similarity
  order by c.embedding <=> query_embedding
  limit match_count
$$;


-- ────────────────────────────────────────────────────────────────────
-- Trigger: keep updated_at fresh on row updates
-- ────────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at         before update on public.profiles         for each row execute function public.set_updated_at();
create trigger conversations_updated_at    before update on public.conversations    for each row execute function public.set_updated_at();
create trigger community_state_updated_at  before update on public.community_state  for each row execute function public.set_updated_at();
create trigger kb_documents_updated_at     before update on public.kb_documents     for each row execute function public.set_updated_at();


-- ────────────────────────────────────────────────────────────────────
-- Trigger: auto-create a profile row when a new auth user signs up
-- ────────────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
