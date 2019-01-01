var mariadb = require('mariadb')

const PRODUCTION = {
  connectionLimit: 10,
  host: 'wordpress-db.cfbf3bfcunf4.us-east-2.rds.amazonaws.com',
  user: 'fukkuen',
  password: 'Yy27022070',
  database: 'floatingprojectscollective_net'
}

const DEV = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fp'
}

const EMPOWER = {
  connectionLimit: 10,
  host: 'sql6.freesqldatabase.com',
  user: 'sql6152713',
  password: 'U71EIhNBaB',
  database: 'sql6152713'
}

const pool = mariadb.createPool(EMPOWER)

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }
  if (connection) connection.release()
})

module.exports = pool
