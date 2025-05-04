import { pool } from './index';

async function runMigrations() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Create attempts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS attempts (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        points JSONB NOT NULL,
        student_answer JSONB NOT NULL,
        is_correct BOOLEAN NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('COMMIT');
    console.log('Migrations completed successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error running migrations:', error);
    throw error;
  } finally {
    client.release();
  }
}

runMigrations().catch(console.error); 