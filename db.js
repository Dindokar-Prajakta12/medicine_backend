// const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 10,
    waitForConnections: true,   
    queueLimit: 0,
});

const promisePool = pool.promise();

promisePool.query('SELECT 1')
  .then(() => {
    console.log('Database connection successfully');
  })
  .catch((err) =>{
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });

  module.exports = promisePool;
