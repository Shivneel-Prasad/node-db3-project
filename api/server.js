const express = require('express');
const morgan = require('morgan')

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use(morgan('dev'))
server.use('/api/schemes', SchemeRouter);

server.get('/', (req, res) => {
    res.send(`
      <h2>Multi-Table Queries</h2>
      <p>Welcome to Multi-Table Queries</p>
    `);
});

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found',
    })
})

module.exports = server;