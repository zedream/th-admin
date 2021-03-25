const DOM = {}
const body = document.querySelector('body')
let timer = null

export default function() {
  if (Object.prototype.hasOwnProperty.call(DOM, 'alertDiv')) {
    clearTimeout(timer)
    timer = null
    body.removeChild(DOM.alertDiv)
    delete DOM.alertDiv
  }

  let option = {}
  if (typeof arguments[0] === 'string') {
    option = {
      message: arguments[0],
      duration: 2500
    }
  } else if (typeof arguments[0] === 'object') {
    option = {
      message: '',
      duration: 2500,
      ...arguments[0]
    }
  } else {
    option = {
      message: '',
      duration: 2500
    }
  }

  DOM.alertDiv = document.createElement('div')
  let alertBox = `<div class="alert_wrapping">
                    <span>${option.message}</span>
                  </div>
                  `
  DOM.alertDiv.innerHTML = alertBox
  body.append(DOM.alertDiv)

  let alertWrapping = DOM.alertDiv.children[0]
  timer = setTimeout(() => {
    alertWrapping.classList.remove('alert_fade')
    setTimeout(() => {
      body.removeChild(DOM.alertDiv)
      delete DOM.alertDiv
    }, 400)
  }, option.duration)

  setTimeout(() => { // 第一次创建dom 延迟执行动画
    alertWrapping.classList.add('alert_fade')
  }, 50)
}