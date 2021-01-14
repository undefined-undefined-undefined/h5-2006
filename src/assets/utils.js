// 1. 若干个数字求和
function fn() {
  var res = 0
  for (var i = 0; i < arguments.length; i++) {
    res += arguments[i]
  }
  return res
}

// 2. 获取最大公约数
function getGys(a, b) {
  var gys = 1
  var max = a > b ? a : b
  var min = a > b ? b : a
  for (var i = min; i >= 1; i--) {
    if (max % i === 0 && min % i === 0) {
      gys = i
      break
    }
  }
  return gys
}

// 3. 获取最小公倍数
function getGbs(a, b) {
  var gbs = a * b / getGys(a, b)
  return gbs
}

// 4. 判断是不是质数
function isZs(num) {
  var flag = true
  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      flag = false
      break
    }
  }
  return flag
}

//5.queryString(查询字符串)
//格式: 'key=value&key2=value2&key3=value3'
//结果: { key: value, key2: value2, key3: value3 }
function parseQueryString(qs){
  var obj = {}
  var tmp = qs.split('&')
  tmp.forEach(function (item){
      var t = item.split('=')
      var key = t[0]
      var value = t[1]
      obj[key] = value
  })
  return obj
}

//6.把对象转换成查询字符串
// 例子: { a: 100, b: 200, c: 300 }
// 结果: 'a=100&b=200&c=300'
function queryStringify(obj){
  var str = ''
  for(var key in obj){
      var s = key + '=' + obj[key] + '&'
      str += s
  }
  str = str.slice(0,-1)
  return str
}

//7.随机输出一个范围内的一个数字
function randomNum(a,b){
  return  Math.floor(Math.random()*(Math.abs(a - b)+1) + Math.min(a,b))
}

//8.随机输出一个16进制颜色
function randomColor() {
  function fn() {
    return Math.floor(Math.random() * (255 + 1))
  }
  var str = '#'
  for (var i = 0; i < 3; i++) {
    var n = fn().toString(16)
    if (n.length === 1) n = '0' + n
    str += n
  }
  return str
}

//8.获取两个年份的时间差
function diffTime(t1,t2){
  var diffs = Math.ceil(Math.abs(t1.getTime() - t2.getTime()) / 1000)
  return {
    day : parseInt(diffs / (60 * 60 * 24)),
    hours : parseInt(diffs % (60 * 60 * 24) / (60 * 60)),
    minutes : parseInt(diffs % (60 * 60) / 60),
    seconds : diffs % 60
  }
}

//9. 获取样式
function getStyle(ele,style){
  if(window.getComputedStyle){
      return window.getComputedStyle(ele)[style]
  }
  if(ele.currentStyle){
      return ele.currentStyle[style]
  }
  return ele.style[style]
}

//10.事件监听器绑定事件兼容
function on(ele,type,fn){
  if(ele.addEventListener){
      ele.addEventListener(type,fn)
      return
  }
  if(ele.attachEvent){
      ele.attachEvent('on' + type,fn)
      return
  }
  ele['on'+type] = fn
}

//11. 事件监听解绑兼容
function off(ele,type,fn){
  if(ele.removeEventListener){
      ele.removeEventListener(type,fn)
      return
  }
  if(ele.detachEvent){
      ele.detachEvent('on'+type,fn)
      return
  }
  ele['on' + type] = null
}

//12. 运动函数
function move(ele,target,fn){
  let count = 0
  for(let key in target){
      count++
      if(key === 'opacity') target[key] *= 100
      let current
      let timer = setInterval(()=>{
          if(key === 'opacity') current = window.getComputedStyle(ele)[key] * 100
          else current = parseInt(window.getComputedStyle(ele)[key])
          let distance = (target[key] - current) / 10
          distance = distance > 0? Math.ceil(distance):Math.floor(distance)
          if(target[key] === current){
              count--
              clearInterval(timer)
              if(!count) fn()
          }else{
              if(key === 'opacity') ele.style[key] = (current + distance) / 100
              else ele.style[key] = current + distance + 'px'
          }
      },20)
  }
}

//13.设置 cookie
function setCookie(key,value,expires){
  if(!expires){
      document.cookie= key + '=' + value;
      return
  }
  const time = new Date()
  time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
  document.cookie = `${ key }=${ value };expires=${ time }`    
}

//14.获取 cookie
function getCookie(key){
  const obj = {}
  const tmp = document.cookie.split('; ')
  tmp.forEach(item =>{
      const t = item.split('=')
      obj[t[0]] = t[1]
  })
  return key? obj[key]:obj
}

//15. ajax
function ajax(options = {}) {
    // 1. 参数验证
    // 1-1. 验证 url 必填
    if (!options.url) {
      throw new Error('url 为必填选项')
    }
  
    // 1-2. 验证 method
    if (!(options.method === undefined || /^(get|post)$/i.test(options.method))) {
      throw new Error('目前只接受 GET 和 POST 请求, 请期待更新 ^_^')
    }
  
    // 1-3. 验证 async
    if (!(options.async === undefined || typeof(options.async) === 'boolean')) {
      throw new Error('async 只能传递一个布尔值')
    }
  
    // 1-4. 验证 data
    if (!(options.data === undefined || Object.prototype.toString.call(options.data) === '[object Object]' || /^(.+=.+&?)*[^&]$/.test(options.data))) {
      throw new Error('data 需要传递一个查询字符串 或者 对象数据类型2')
    }
  
    // 1-5. 验证 success
    if (!(options.success === undefined || typeof options.success === 'function')) {
      throw new Error('success 需要传递一个 function 数据类型')
    }
  
    // 1-6. 验证 error
    if (!(options.error === undefined || typeof options.error === 'function')) {
      throw new Error('error 需要传递一个 function 数据类型')
    }
  
    // 1-7. 验证 dataType
    if (!(options.dataType === undefined || typeof(options.dataType) === 'boolean')) {
      throw new Error('dataType 只能传递一个布尔值')
    }
  
    // 2. 设置默认值
    const _default = {
      url: options.url,
      method: options.method || 'GET',
      async: typeof options.async === 'boolean' ? options.async : true,
      data: options.data || '',
      success: options.success || function () {},
      error: options.error || function () {},
      dataType: typeof options.dataType === 'boolean' ? options.dataType : true,
    }
    if (typeof _default.data === 'object') {
      _default.data = queryStringify(_default.data)
    }
    if (_default.method.toUpperCase() === 'GET' && _default.data) {
      _default.url += '?' + _default.data
    }
  
    // 3. 发送 ajax 请求
    const xhr = new XMLHttpRequest()
    xhr.open(_default.method, _default.url, _default.async)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        _default.success(_default.dataType? JSON.parse(xhr.responseText):xhr.responseText)
      }
      if (xhr.readyState === 4 && xhr.status === 404) {
        _default.error(xhr.statusText)
      }
    }
    if (_default.method.toUpperCase() === 'GET') {
      xhr.send()
    } else {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
      xhr.send(_default.data)
    }
  }

// 16.promise - ajax
//这个是以后万一要是用到回调地狱的时候
function pAjax(options={}){
    return new Promise(function (resolve,reject){
        //要执行异步做的事情
        ajax({
            url:options.rul,
            method:options.method,
            async:options.async,
            data:options.data,
            dataType:options.dataType,
            success (res){
                resolve(res)
            },
            error (res){
                reject(res)
            }
        })
    })
}