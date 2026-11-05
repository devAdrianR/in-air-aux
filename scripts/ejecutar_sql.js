require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2/promise');

(async () => {
  const archivo = process.argv[2];
  const conexion = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'false' ? undefined : { rejectUnauthorized: false },
    multipleStatements: true,
  });
  await conexion.query(fs.readFileSync(archivo, 'utf8'));
  console.log(`Script ejecutado: ${archivo}`);
  await conexion.end();
})().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});