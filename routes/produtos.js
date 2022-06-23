const express = require('express')
const router = express()
const mssql = require('mssql/msnodesqlv8');

const conn = new mssql.ConnectionPool({
    driver: "msnodesqlv8",
    server: 'localhost',
    password: '',
    database: 'WebBackEnd',
    user: 'sa',
    password: 'Sql2@19'
})

router.get('/', (req, res) => {
  conn.connect().then((pool) => {
    const queryStr = 'SELECT * FROM produtos'
    pool.query(queryStr).then((rows) => {
      res.send(rows.recordset)
    })
  })
})

router.get('/:id', (req, res) => {
const id = req.params.id;
    conn.connect().then((pool) => {
        const queryStr = `SELECT * FROM produtos WHERE id = ${id}`
        // const queryStr = 'SELECT * FROM produto'
        pool.query(queryStr).then((rows) => {
        if(rows.recordset.length > 0){
            res.send(rows.recordset[0]);
        }else {
            res.send(404).status(rows.recordset);
        }
    })
  })
})

router.delete('/:id', (req, res) => {
const id = req.params.id;
    conn.connect().then((pool) => {
        const queryStr = `DELETE FROM produtos WHERE id = ${id}`
        pool.query(queryStr).then((rows) => {
        res.send(204).status();
    })
  })
})

module.exports = router;