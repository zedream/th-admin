module.exports = {
  0: function () {
    return {errcode: 0, msg: '操作成功'}
  },
  100001: function () {
    return {errcode: 100001, msg: '用户名或密码不能为空'}
  },
  100102: function () {
    return {errcode: 100102, msg: '用户名已存在'}
  },
  100103: function () {
    return {errcode: 100103, msg: '用户名长度太短'}
  },
  100104: function () {
    return {errcode: 100104, msg: '密码长度太短'}
  },
  100201: function () {
    return {errcode: 100201, msg: '用户名或密码错误'}
  },
  100202: function () {
    return {errcode: 100202, msg: '用户名不存在'}
  },
  500001: function () {
    return {errcode: 500001, msg: '文件不存在'}
  }
}