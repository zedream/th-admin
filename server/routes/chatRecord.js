let express = require('express')
let router = express.Router()
let util = require('../utils/util')
let db = require('../db')

router.get('/list', function(req, res, next) {
  let fromId = req.session.userid
  let toId = req.query.toId
  let sql = `select * from chatRecord where (from_id='${fromId}' and to_id='${toId}') or (from_id='${toId}' and to_id='${fromId}')`
  db.query(sql, [], (result, fields) => {
    for (let i = 0, l = result.length; i< l; i++) {
      result[i].time = util.formatDate(result[i].time)
    }
    res.status(200).send(Object.assign(global.strategy(0), {data: result}))
  })
})

router.get('/allList', function(req, res, next) {
  let fromId = req.session.userid
  let sql = `select * from chatRecord where (from_id='${fromId}' or to_id='${fromId}')`
  let recordObj = {}
  db.query(sql, [], (result, fields) => {
    for (let i = 0, l = result.length; i< l; i++) {
      result[i].time = util.formatDate(result[i].time)
      recordObj[`${fromId}&${result[i].to_id}&${result[i].from_id}&${fromId}`] = recordObj[`${fromId}&${result[i].to_id}&${result[i].from_id}&${fromId}`] ? [result[i]] : []
      recordObj[`${fromId}&${result[i].to_id}&${result[i].from_id}&${fromId}`].push(result[i])
    }
    res.status(200).send(Object.assign(global.strategy(0), {data: recordObj}))
  })
})

module.exports = router

