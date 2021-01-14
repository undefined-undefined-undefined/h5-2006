//放大镜
function Enlarge(select) {
    // 范围元素
    this.ele = document.querySelector(select)
    // show 盒子: 范围内的 .show
    this.show = this.ele.querySelector('.show')
    // mask 盒子
    this.mask = this.ele.querySelector('.mask')
    // enlarge 盒子
    this.enlarge = this.ele.querySelector('.enlarge')
    // show 盒子的宽度
    this.showWidth = this.show.clientWidth
    // show 盒子的高度
    this.showHeight = this.show.clientHeight
    // 背景图宽度
    this.bgWidth = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
    // 背景图高度
    this.bgHeight = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
    // enlarge 盒子的宽度
    this.enlargeWidth = parseInt(window.getComputedStyle(this.enlarge).width)
    // enlarge 盒子的高度
    this.enlargeHeight = parseInt(window.getComputedStyle(this.enlarge).height)
  
    // new 完就直接出现效果
    // 直接调用启动器
    this.init()
  }
  
  // 提前准备一个方法叫做启动器
  Enlarge.prototype.init = function () {
    this.overOut()
    this.setScale()
    this.setMove()
  }
  

  Enlarge.prototype.overOut = function () {
    // 移入事件
    this.show.addEventListener('mouseover', () => {
      this.mask.style.display = 'block'
      this.enlarge.style.display = 'block'
    })
    // 移出事件
    this.show.addEventListener('mouseout', () => {
      this.mask.style.display = 'none'
      this.enlarge.style.display = 'none'
    })
  }
  
 
  Enlarge.prototype.setScale = function () {
    // 1. 计算 mask 盒子的尺寸
    this.maskWidth = this.showWidth * this.enlargeWidth / this.bgWidth
    this.maskHeight = this.showHeight * this.enlargeHeight / this.bgHeight
  
    // 2. 给 mask 盒子赋值
    this.mask.style.width = this.maskWidth + 'px'
    this.mask.style.height = this.maskHeight + 'px'
  }
  Enlarge.prototype.setMove = function () {
    // 1. 给 this.show 绑定事件
    this.show.addEventListener('mousemove', e => {
      // 处理事件对象兼容
      e = e || window.event
  
      // 2. 获取坐标了
      let moveX = e.offsetX - this.maskWidth / 2
      let moveY = e.offsetY - this.maskHeight / 2
  
      // 3. 边界值判断
      if (moveX <= 0) moveX = 0
      if (moveY <= 0) moveY = 0
      if (moveX >= this.showWidth - this.maskWidth) moveX = this.showWidth - this.maskWidth
      if (moveY >= this.showHeight - this.maskHeight) moveY = this.showHeight - this.maskHeight
  
      // 4. 赋值
      this.mask.style.left = moveX + 'px'
      this.mask.style.top = moveY + 'px'
  
      // 5. 计算背景图移动距离
      const bgX = moveX * this.enlargeWidth / this.maskWidth
      const bgY = moveY * this.enlargeHeight / this.maskHeight
  
      // 给 enlarge 盒子的 backgroundPosition 进行赋值
      this.enlarge.style.backgroundPosition = `-${ bgX }px -${ bgY }px`
    })
  }
  
  
  const enlarge = new Enlarge('.product-left')
  $('.header ul li:last-of-type').click(()=>{
      window.location.href = './index.html'
  })


