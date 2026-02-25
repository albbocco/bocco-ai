const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xpnmjmsietrvzhumqprl.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwbm1qbXNpZXRydnpodW1xcHJsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTUxOTM5NSwiZXhwIjoyMDg3MDk1Mzk1fQ.piXHg98iYZVf7h24RNW7N0d9GNaQ8wFFtxFoErEXNj8';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTables() {
  console.log('Creating tables...');

  // Users table
  const { error: usersError } = await supabase.rpc('create_table_users', {});
  if (usersError) console.log('Users table error:', usersError.message);
  else console.log('✅ Users table created');

  console.log('Done!');
}

createTables();
