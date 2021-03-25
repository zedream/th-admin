let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let bodyparser = require('body-parser')
let session = require('express-session')
let logger = require('morgan')
let multer = require('multer')
let Jwt = require('./jwt')

let ResStrategy = require('./utils/resStrategy')

let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let testRouter = require('./routes/test')
let uploadRouter = require('./routes/file')
let authRouter = require('./routes/auth')
let dictRouter = require('./routes/dict')
let chatRouter = require('./routes/chat')
let chatRecRouter = require('./routes/chatRecord')
let markRouter = require('./routes/mark')

let app = express()

global.strategy = function (code) {
  return ResStrategy[code]()
}

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.json()) // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }))
app.use(session ({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
      maxAge : 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
  }
}))

app.use(multer({dest: '../../uploadFiles', limit: { fileSize: '10mb' }}).array('files', 9))

app.use((req, res, next) => {
  if (req.url !== '/' && req.url !== '/auth/login' && req.url !== 'upload' && req.url !== '/auth/register' && req.url !== '/mark/list' && req.url !== '/mark/update') {
    let token = req.headers['th-auth'] ? req.headers['th-auth'].split(' ')[1] : ''
    let jwt = new Jwt(token)
    let result = jwt.verifyToken()
    console.log(result)
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result === 'err') {
        console.log(result)
        res.status(401).send({msg: '请求未授权，请重新登录'})
        //res.render('login.html')
    } else if (result.split(',')[0] ^ 0 === req.session.userid ^ 0) {
      next()
    } else {
      res.status(401).send({msg: '登录已过期，请重新登录'})
    }
} else {
    next()
  }
})

app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/test', testRouter)
app.use('/file', uploadRouter)
app.use('/auth', authRouter)
app.use('/dict', dictRouter)
app.use('/chat/record', chatRecRouter)
app.use('/chat', chatRouter)
app.use('/mark', markRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
