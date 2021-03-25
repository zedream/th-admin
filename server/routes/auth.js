let express = require('express')
let router = express.Router()
let db = require('../db')
let Jwt = require('../jwt')

router.post('/login', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  let sql = `select * from user where username='${username}'`
  
  if (username === '' || password === '') {
    res.status(400).send(Object.assign(global.strategy(100001)))
  } else {
    db.query(sql, [], (result, fields) => {
      if (result.length > 0) {
        if (password === result[0].password) {
          // 将用户信息传入并生成token
          let jwt = new Jwt(result[0].id + ',' + username)
          let token = jwt.generateToken()
          let sqlRole = `select * from dict where dict_type='role' and dict_key=${result[0].role}`
          req.session.username = username
          req.session.userid = result[0].id
          req.session.role = result[0].role
          db.query(sqlRole, [], (resultRole, fields) => {
            result[0].role = resultRole[0].dict_value
            delete result[0].password
            res.send(Object.assign(global.strategy(0), {data: {token, ...result[0]}}))
          })
        } else {
          res.status(400).send(Object.assign(global.strategy(100201)))
        }
      } else {
        res.status(400).send(Object.assign(global.strategy(100201)))
      }
    })
  }
})

router.post('/register', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  let sql1 = `select * from user where username='${username}'`
  let sql2 = `insert into user (username, password, role) values ('${username}', '${password}', '9')`
  if (username === '' || password === '') {
    res.status(400).send(Object.assign(global.strategy(100001)))
  } else if (username.length < 6) {
    res.status(400).send(Object.assign(global.strategy(100103)))
  } else if (password.length < 6) {
    res.status(400).send(Object.assign(global.strategy(100104)))
  } else {
    db.query(sql1, [], (result, fields) => {
      if (result.length === 0) {
        db.query(sql2, [], (result, fields) => {
          res.send(Object.assign(global.strategy(0)))
        })
      } else {
        res.status(400).send(Object.assign(global.strategy(100102)))
      }
    })
  }
})

router.get('/routes', function(req, res, next) {
  let role = req.session.role
  let permission = []
  let routes = []
  let resRouter = []
  let sql = `select * from permission where role=${role}`
  db.query(sql, [], (result, fields) => {
    permission = result[0].permission.split(',')
    db.query('select * from router', [], (result, fields) => {
      for (let i = 0; i < permission.length; i++) {
        for (let j = 0; j < result.length; j++) {
          if (+permission[i] === result[j].id) {
            routes.push(result[j])
          }
        }
      }
      for (let i = 0; i < routes.length; i++) {
        routes[i].meta = routes[i].meta !== null ? JSON.parse(routes[i].meta) : ''
        if (routes[i].pid > 0) {
          let pRouter = routes.find(ele => ele.id === routes[i].pid)
          Object.assign(pRouter, {hasChildren: true})
          pRouter.children = pRouter.children ? [...pRouter.children] : [] 
          pRouter.children.push(routes[i])
        }
      }
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].pid === 0) {
          resRouter.push(routes[i])
        }
      }
      res.status(200).send(Object.assign(global.strategy(0), {data: resRouter}))
    })
  })
})

module.exports = router

