let express = require('express')
let router = express.Router()
let db = require('../db')

router.get('/list', function (req, res, next) {
  let sql = `select * from dict`

  db.query(sql, [], (result, fields) => {
    let data = {}
    result.forEach(item => {
      if (data[item.dict_type]) {
        data[item.dict_type].push({key:item.dict_key, value: item.dict_value})
      } else {
        data[item.dict_type] = [{key:item.dict_key, value: item.dict_value}]
      }
    })
    res.send(Object.assign(global.strategy(0), {data}))
  })
})

router.post('/detail', function (req, res, next) {
  let id = req.body.id
  let sql = `select * from user where id=${id}`
  let sqlRole = `select * from dict where dict_type='role'`

  db.query(sql, [], (result, fields) => {
    db.query(sqlRole, [], (resultRole, fields) => {
      result[0].role = resultRole.find(val => val.dict_key === result[0].role).dict_value
      res.send(Object.assign(global.strategy(0), {data: result[0]}))
    })
  })
})

router.post('/delete', function (req, res, next) {
  let id = req.body.id
  let sql = `delete from user where id=${id}`

  db.query(sql, [], (result, fields) => {
    res.send(Object.assign(global.strategy(0)))
  })
})


module.exports = router
