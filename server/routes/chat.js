let express = require('express')
let router = express.Router()
let util = require('../utils/util')
let db = require('../db')
let _ = require('underscore')

const users = new Object()

let ISocket = function (port) {
  console.log("启用TCP端口:", port)
  var _io = require("socket.io").listen(port)
  _io.on('connection', function(socket){
    
    _io.emit('loginsuccess', util.formatDate(new Date()))
    console.log("TCP 连接成功-----id为", socket.id)

    //监听用户登录-获取用户id
    socket.on('getuserinfo', function(data) {
      //拿到socket临时分配的id，存储数据库
      users[data.username] = socket.id
      let sqlOnline = `update user set online=1 where username='${data.username}'`
      db.query(sqlOnline, [], (result, fields) => {})
      console.log(users)
    })

    socket.on('sendmessage', function(data) {
      _io.emit('sendmessage', data)
    })

    socket.on('privatechat', function(data) {
      if (users[data.to]) {
        let toSocket = _.findWhere(_io.sockets.sockets, {id: users[data.to]})
        let sqlInsertChatRecord = `insert into chatRecord (from_id, to_id, from_user, to_user, content, time) values ('${data.fromId}', '${data.toId}', '${data.from}', '${data.to}', '${data.msg}', '${util.formatDate(data.time)}')`
        db.query(sqlInsertChatRecord, [], (result, fields) => {
          toSocket.emit('privatechat', {
            from: data.from,
            to: data.to,
            msg: data.msg,
            time: util.formatDate(data.time)
          })
        })
      } else {
        _io.emit('privatechaterror', 'user offline')
      }
    })

    //监听用户退出
    socket.on("logout", function(data) {
      let sqlOnline = `update user set online=0 where username='${data.username}'`
      delete users[data.username]
      db.query(sqlOnline, [], (result, fields) => {
        console.log('database success')
      })
    })
    socket.on("disconnect", function(data) {
      console.log('disconnect',data)
    })
  })
}

ISocket(3001)

module.exports = router