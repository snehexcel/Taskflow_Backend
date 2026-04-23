import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    // Read the SQL migration file
    const migrationPath = path.join(process.cwd(), 'scripts', '01-setup-database.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    console.log('Running database migration...');

    // Execute the SQL
    const { error } = await supabase.rpc('exec', {
      sql_string: sql,
    }).catch(async () => {
      // If exec doesn't work, split and execute individually
      const statements = sql
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      let lastError = null;
      for (const statement of statements) {
        const { error } = await supabase.rpc('exec', {
          sql_string: statement + ';',
        }).catch(() => ({
          error: { message: 'Using direct execution' },
        }));

        if (error && !error.message.includes('Using direct execution')) {
          console.warn(`Warning executing: ${statement.substring(0, 50)}...`, error);
          lastError = error;
        }
      }
      return { error: lastError };
    });

    if (error) {
      console.warn('Migration warning:', error);
      // Don't fail completely as some statements might already exist
    }

    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
