let express = require('express')
let router = express.Router()
let db = require('../db')

router.get('/list', function (req, res, next) {
  let total = 0
  let currentPage = +req.query.currentPage
  let pageSize = +req.query.pageSize
  let username = req.query.username || ''
  let nickname = req.query.nickname || ''
  let role = req.query.role
  let sql = ''
  if (role) {
    sql = `select * from user where username like '%${username}%' and nickname like '%${nickname}%' and role=${role} order by id asc limit ${(currentPage - 1) * pageSize}, ${currentPage * pageSize}`
  } else {
    sql = `select * from user where username like '%${username}%' and nickname like '%${nickname}%' order by id asc limit ${(currentPage - 1) * pageSize}, ${currentPage * pageSize}`
  }
  
  //let sql = `select * from user order by id asc limit ${(currentPage - 1) * pageSize}, ${currentPage * pageSize}`
  let sqlRole = `select * from dict where dict_type='role'`

  db.query(sql, [], (result, fields) => {
    db.query(`select * from user`, [], (resultAll, fields) => {
      total = resultAll.length
      db.query(sqlRole, [], (resultRole, fields) => {
        result.forEach(item => {
          delete item.password
          console.log()
          item.role = resultRole.find(val => val.dict_key === +item.role).dict_value
        })
        res.send(Object.assign(global.strategy(0), {data: {result, total, currentPage, pageSize }}))
      })
    })
  })
})

router.post('/detail', function (req, res, next) {
  let id = req.body.id
  let sql = `select * from user where id=${id}`

  db.query(sql, [], (result, fields) => {
    let sqlRole = `select * from dict where dict_type='role' and dict_key=${result[0].role}`
    db.query(sqlRole, [], (resultRole, fields) => {
      result[0].role = resultRole[0].dict_value
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
