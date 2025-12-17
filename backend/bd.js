const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
  //отключаем строгую проверку SSL (нужно для Supabase)
});

module.exports = pool;