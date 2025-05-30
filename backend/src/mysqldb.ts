import mysql from 'mysql';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'instrumentos',
  connectionLimit: 10
});
