import mysql from 'mysql2/promise'

// conexion a la base de datos grafico
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Admin1234',
  database: 'grafico'
})

export default db