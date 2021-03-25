const util = {
  formatDate: function(date) {
    let myDate = new Date(date)
    let yy = myDate.getFullYear()
    let MM = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
    let dd = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
    let hh = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
    let mm = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
    let ss = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
    return `${yy}-${MM}-${dd} ${hh}:${mm}:${ss}`
  }
}

module.exports = util