const DOM = {}
const body = document.querySelector('body')
let timer = null

export default function() {
  if (Object.prototype.hasOwnProperty.call(DOM, 'messageDiv')) {
    clearTimeout(timer)
    timer = null
    body.removeChild(DOM.messageDiv)
    delete DOM.messageDiv
  }

  let option = {}
  if (typeof arguments[0] === 'string') {
    option = {
      type: 'info',
      message: arguments[0],
      duration: 3000
    }
  } else if (typeof arguments[0] === 'object') {
    option = {
      type: 'info',
      message: '',
      duration: 3000,
      ...arguments[0]
    }
  } else {
    option = {
      type: 'info',
      message: '',
      duration: 3000
    }
  }

  DOM.messageDiv = document.createElement('div')
  let messageBox = `<div class="message_wrapping ${option.type}">
                    <i class="iconfont icon-${option.type}"></i>
                    <span>${option.message}</span>
                  </div>
                  `
  DOM.messageDiv.innerHTML = messageBox
  body.append(DOM.messageDiv)

  let messageWrapping = DOM.messageDiv.children[0]
  timer = setTimeout(() => {
    messageWrapping.classList.remove('message_fade')
    setTimeout(() => {
      body.removeChild(DOM.messageDiv)
      delete DOM.messageDiv
    }, 400)
  }, option.duration)

  setTimeout(() => { // 第一次创建dom 延迟执行动画
    messageWrapping.classList.add('message_fade')
  }, 50)
}