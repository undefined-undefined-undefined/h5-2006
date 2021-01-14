// const { ajax } = require("jquery");

const menu_btn = document.querySelector('.menu > ul');
const menu = document.querySelector('.menu');

$(menu).on('mouseover', function () {
    // console.log('kkk');
    menu_btn.style.opacity = '1';
})
$(menu).on('mouseout', function () {
    // console.log('kkk');
    menu_btn.style.opacity = '0';
})

// 回到顶部
const go_Btn=document.querySelector('.go')
const sys=document.querySelector('.sys')
window.onscroll=function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
   if(scrollTop<635){
    sys.style.position='absolute'
    sys.style.top='720px'
   }
    if(scrollTop >= 635){
        sys.style.position='fixed'
        sys.style.top='88px'
    }
    if(scrollTop >= 800){  
      go_Btn.style.display='block'
    }
    else{
      go_Btn.style.display='none'
    }
  }
  go_Btn.onclick=function(){
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }

  getList()
  function getList(){
    const atlas_id = getCookie('resource_id')
    console.log(atlas_id)
      ajax({
          url: '/dtdetail',
          data: {
            atlas_id: atlas_id
          },
          success (res) {
          //   start = res.data.next_start
              console.log(res.data)
            // 要根据 res.data.object_list 去渲染页面
            bindHtml(res.data)
            bindRight(res.data)
            // 到这里表示渲染页面完毕了
          //   flag = true
          }
        })
  }
  const left = document.querySelector('.left')
  const right = document.querySelector('.right')
  function bindHtml(data){
    const str = `
        <div class="top">
          <p>
              <img src="${data.sender.avatar}">
          </p>
          <p>
              ${ data.sender.username }<br>
              <span>${ data.album.created_at }</span>
          </p>
          <a>关注</a>
      </div>
      <div class="offcial">
        <p>${ data.desc }</p>
      </div>
      <div class="photo">
        <img src="${data.blogs[0].photo.path}">
      </div>
      <ul class="comments">
        <li>
          <span class="iconfont">&#xe61f;</span>&nbsp;赞
          </li>
        <li>
          <span class="iconfont">&#xe682;</span>&nbsp;评论
          </li>
        <li>
          <span class="iconfont">&#xe501;</span>&nbsp;14

        </li>
        <li>...更多</li>
        
      </ul>

    `
    left.innerHTML = str
  }
function bindRight(data){
  const str = `


      <ul class="topul">
          <li>
              <img src= "${ data.album.covers[0] }">
              <p>
                  ${data.album.name}<br>
                <span> ${ data.album.count }张图片·${data.album.favorite_count}人收藏</span>
              </p>
          </li>
          <p>还被收集在13个专辑中</p>
          <li class="true">
              <img src="../img/shenhe.jpg">
              <p>
                  该专辑正在审核中<br>
                <span> 403张图片·6人收藏</span>
              </p>
              
          </li>
          <li class="true">
              <img src="../img/1111.jpg">
              <p>
                  家居<br>
                <span> 63张图片·6人收藏</span>
              </p>
          </li>
          <li class="true">
              <img src="../img/shenhe.jpg">
              <p>
                  该专辑正在审核中<br>
                <span> 403张图片·6人收藏</span>
              </p>
          </li>
    </ul>
  `
  right.innerHTML = str
}
  
const logo = document.querySelector('.logo')
logo.onclick = function (){
  window.location.href = './index.html'
}

