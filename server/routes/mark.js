let express = require('express')
let router = express.Router()
let db = require('../db')

router.post('/list', function (req, res, next) {
  let sql = `select * from mark`
  db.query(sql, [], (result, fields) => {
    let data = []
    if (result[0].copy) {
      data = result[0].copy.split(',')
      data = Array.from(new Set(data))
    }
    res.send(Object.assign(global.strategy(0), { data }))
  })
})

router.post('/update', function (req, res, next) {
  let method = req.body.method
  let data = req.body.data
  let sql = `select * from mark`
  db.query(sql, [], (result, fields) => {
    let tempResult = []
    if (result[0].copy) {
      tempResult = result[0].copy.split(',')
    }
    let index = tempResult.findIndex(_ => _ === data)
    if (index > -1) {
      tempResult.splice(index, 1)
      db.query(`update mark set copy='${tempResult.join(',')}'`, [], (result, fields) => {
        res.send(Object.assign(global.strategy(0), { msg: '标记为 [未复制]' }))
      })
    } else {
      tempResult.push(data)
      db.query(`update mark set copy='${tempResult.join(',')}'`, [], (result, fields) => {
        res.send(Object.assign(global.strategy(0), { msg: '标记为 [已复制]' }))
      })
    }
  })
})

module.exports = router
