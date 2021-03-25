export const formatDate = function(date, type) {
  let myDate = new Date(date)
  let yy = myDate.getFullYear()
  let MM = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
  let dd = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
  let hh = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
  let mm = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
  let ss = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
  if (type === 'time') {
    return `${hh}:${mm}:${ss}`
  }
  return `${yy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}

export const debounce = function (func, delay) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = null
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, delay || 1000)
  }
}

export const throttle = function () {

}

export const customPeriod = function(date) {
  let myTime = new Date(`2020-09-12 ${formatDate(date, 'time')}`).getTime()
  let t1 = '2020-09-12 00:00:00'
  let t2 = '2020-09-12 06:00:00'
  let t3 = '2020-09-12 08:00:00'
  let t4 = '2020-09-12 11:00:00'
  let t5 = '2020-09-12 13:00:00'
  let t6 = '2020-09-12 16:30:00'
  let t7 = '2020-09-12 18:00:00'
  let t8 = '2020-09-12 22:00:00'
  let t9 = '2020-09-12 23:59:59'
  if (myTime > new Date(t1).getTime() && myTime <= new Date(t2).getTime()) {
    return '凌晨'
  } else if (myTime > new Date(t2).getTime() && myTime <= new Date(t3).getTime()) {
    return '早起'
  } else if (myTime > new Date(t3).getTime() && myTime <= new Date(t4).getTime()) {
    return '早上'
  } else if (myTime > new Date(t4).getTime() && myTime <= new Date(t5).getTime()) {
    return '中午'
  } else if (myTime > new Date(t5).getTime() && myTime <= new Date(t6).getTime()) {
    return '下午'
  } else if (myTime > new Date(t6).getTime() && myTime <= new Date(t7).getTime()) {
    return '傍晚'
  } else if (myTime > new Date(t7).getTime() && myTime <= new Date(t8).getTime()) {
    return '晚上'
  } else if (myTime > new Date(t8).getTime() && myTime <= new Date(t9).getTime()) {
    return '夜深'
  }
}

export const greet = function(date) {
  let period = customPeriod(date)
  if (period === '凌晨') {
    return '现在是凌晨，注意休息哦'
  } else if (period === '早起') {
    return '早起是个好习惯'
  } else if (period === '早上') {
    return '早上好，一日之计在于晨'
  } else if (period === '中午') {
    return '中午要记得午休哦'
  } else if (period === '下午') {
    return '下午好，喝杯咖啡提提神吧'
  } else if (period === '傍晚') {
    return '傍晚的夕阳再美不过了'
  } else if (period === '晚上') {
    return '忙碌了一天，该休息了'
  } else if (period === '夜深') {
    return '夜深了，早点睡觉吧'
  }
}
