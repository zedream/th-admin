let express = require('express')
let router = express.Router()

router.get('/get', function (req, res, next) {
  let data = {
    route: req.route,
    method: Object.keys(req.route.methods)[0],
    ip: req.ip,
    ips: req.ips,
    baseUrl: req.baseUrl,
    path: req.path,
    host: req.host,
    url: req.baseUrl + req.path,
    acceptedLanguages: req.acceptedLanguages
  }
  res.send(Object.assign(global.strategy(1), {data}))
})

router.post('/post', function (req, res, next) {
  let data = {
    route: req.route,
    method: Object.keys(req.route.methods)[0],
    ip: req.ip,
    ips: req.ips,
    baseUrl: req.baseUrl,
    path: req.path,
    host: req.host,
    url: req.baseUrl + req.path,
    accepted: req.acceptedLanguages,
    body: req.body
  }
  res.send(Object.assign(global.strategy(1), {data}))
})


router.get('/:id/:date', function (req, res, next) {
  console.log(req.params)
  res.send(Object.assign(global.strategy(1), {data: req.params}))
})

module.exports = router
