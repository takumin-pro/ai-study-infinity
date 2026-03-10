const { createClient } = require('@supabase/supabase-js');

async function test() {
  const url = 'https://lpglqhdtkewccsszppji.supabase.co';
  const key = 'sb_publishable_0chjzk6z3k10gSoua8dczw_mebKiiKE';

  const supabase = createClient(url, key);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'wrongpassword'
    });
    console.log('Result:', { data, error });
  } catch (e) {
    console.error('Exception:', e);
  }
}

test();
