require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function testSupabase() {
  const { data, error } = await supabase.from('Test').select('*');

  if (error) {
    console.error('❌ Supabase error:', error.message);
  } else {
    console.log('✅ Supabase connected. Data:', data);
  }
}

testSupabase();
