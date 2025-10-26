-- Function to create a public user profile
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'role');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();