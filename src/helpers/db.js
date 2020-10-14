const mysql = require('mysql')
require('dotenv').config()


//connect database
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
conn.connect((err)=>{
    if(!err) console.log('MySql connected')
    else console.log('Failed to connect database')
})

module.exports = conn