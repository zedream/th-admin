const DOM = {}
const body = document.querySelector('body')
let timer = null

export default function() {
  if (Object.prototype.hasOwnProperty.call(DOM, 'noticeDiv')) {
    clearTimeout(timer)
    timer = null
    body.removeChild(DOM.noticeDiv)
    delete DOM.noticeDiv
  }

  let option = {}
  option = {
    duration: 6600,
    ...arguments[0]
  }

  DOM.noticeDiv = document.createElement('div')
 
  let noticeBox = `<div class="notice_wrapping">
                    <div class="notice_top">
                      <span class="iconfont icon-notice-${option.type}"></span><span class="notice_title">${option.title}</span><i class="iconfont icon-notice-close notice_close"></i>
                    </div>
                    <div class="notice_bottom">${option.message}</div>
                  </div>
                  `
  DOM.noticeDiv.innerHTML = noticeBox
  body.append(DOM.noticeDiv)

  let noticeWrapping = DOM.noticeDiv.children[0]

  document.querySelector('.notice_close').addEventListener('click', () => {
    noticeWrapping.classList.add('notice_opacity')
    setTimeout(() => {
      clearTimeout(timer)
      timer = null
      body.removeChild(DOM.noticeDiv)
      delete DOM.noticeDiv
    }, 400)
  }, false)

  if (option.autoclose) {
    timer = setTimeout(() => {
      noticeWrapping.classList.add('notice_opacity')
      setTimeout(() => {
        body.removeChild(DOM.noticeDiv)
        delete DOM.noticeDiv
      }, 400)
    }, option.duration)
  }
  
  setTimeout(() => { // 第一次创建dom 延迟执行动画
    noticeWrapping.classList.add('notice_fade')
  }, 50)
}