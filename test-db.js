const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

async function test() {
  // Tentar várias combinações
  const urls = [
    { name: 'Pooler 6543 (Transaction)', url: 'postgresql://postgres.fusuaknhflrjhtlddvos:Cia3wiErGbbRhBtx@aws-0-sa-east-1.pooler.supabase.com:6543/postgres' },
    { name: 'Pooler 5432 (Session)', url: 'postgresql://postgres.fusuaknhflrjhtlddvos:Cia3wiErGbbRhBtx@aws-0-sa-east-1.pooler.supabase.com:5432/postgres' },
    { name: 'Direct db host', url: 'postgresql://postgres:Cia3wiErGbbRhBtx@db.fusuaknhflrjhtlddvos.supabase.co:5432/postgres' },
  ];

  for (const { name, url } of urls) {
    console.log(`\n--- Testing: ${name} ---`);
    const sql = postgres(url, { prepare: false, connect_timeout: 10 });
    try {
      const result = await sql`SELECT 1 as ok`;
      console.log('  ✅ OK:', result[0]);
    } catch (err) {
      console.log('  ❌ Error:', err.message?.substring(0, 100));
    } finally {
      await sql.end();
    }
  }
}

test();
