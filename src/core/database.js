require('dotenv').config();
const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === 'false' ? undefined : { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 5,
      dateStrings: true,
      flags: ['+FOUND_ROWS'],
    });
  }

  async query(sql, params = []) {
    const [resultado] = await this.pool.query(sql, params);
    return resultado;
  }
}

module.exports = new Database();