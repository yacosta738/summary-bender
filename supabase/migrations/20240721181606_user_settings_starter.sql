-- Create a table for user settings
create table settings (
                        id uuid references auth.users not null primary key,
                        updated_at timestamp with time zone,
                        theme text check (theme in ('light', 'dark')),
                        language text check (char_length(language) = 2),
                        notifications_enabled boolean default true,
                        email_alias_identifier text unique not null,

                        constraint language_length check (char_length(language) = 2),
                        constraint email_alias_identifier_format check (email_alias_identifier ~ '^[a-zA-Z0-9]+$')
);

-- Set up Row Level Security (RLS)
alter table settings
  enable row level security;

create policy "Settings are viewable by the owner." on settings
  for select using ((select auth.uid()) = id);

create policy "Users can insert their own settings." on settings
  for insert with check ((select auth.uid()) = id);

create policy "Users can update their own settings." on settings
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a settings entry when a new user signs up via Supabase Auth.
create function public.handle_new_user_settings()
  returns trigger
  set search_path = ''
as $$
begin
  insert into public.settings (id, theme, language, notifications_enabled, email_alias_identifier)
  values (new.id, 'light', 'en', true, left(md5(new.id::text), 16));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created_settings
  after insert on auth.users
  for each row execute procedure public.handle_new_user_settings();
