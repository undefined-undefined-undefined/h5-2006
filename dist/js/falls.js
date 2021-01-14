
// 获取最短ul
// 获取.falls下的ul
const uls = document.querySelectorAll('.falls > ul')

let start = 0

// 准备一个开关
let flag = true 

//获取最短ul函数
function getMinUl(){

    let minUl = uls[0];

    for(let i = 0; i < uls.length; i++){

        if(uls[i].offsetHeight < minUl.offsetHeight){

            minUl = uls[i]
        }
    }
    
    return minUl


}



// 请求数据
getList()
function getList(){

    if(!flag) return

    flag = false

    ajax({
        url:'/dthot',
        data:{
            include_fields: 'top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album',
            limit: 0,
            start: start,
            _: 1610421439479
        },
        success(res){

            start = res.data.next_start

            bindHtml(res.data.object_list)

            flag = true
        }
    })
}

//渲染页面
function bindHtml(list){

    list.forEach(item =>{
        const height = item.photo.height * 235 / item.photo.width

        const str = `
            <li>
                <div class="top" style = "height:${ height }px">
                    <img src="${item.photo.path}" alt="">
                    <div class="hidden">
                        <a href="">收集</a>
                        <a href="">点赞</a>
                        <a href="">评论</a>
                    </div>
                </div>
                <div class="bottom">
                    <p class="intro">手绘闺蜜头像（P1-4为一组）图源P站画师：田中</p>
                    <div class="favorite">
                        <div class="d1">
                            <i></i>
                            <span>${item.album.favorite_count}</span>
                        </div>
                        <div class="d2">
                            <i></i>
                            <span>${item.album.like_count}</span>
                        </div>
                    </div>
                </div>
                <div class="author">
                    <div class="one">
                        <img src="${item.sender.avatar}" alt="">
                    </div>
                    <div class="two">
                        <a class="two-a1" target="_blank" href="/people/?user_id=23663250">${item.sender.username}</a>
                        <span>
                            发布到&nbsp;
                            <a target="_blank" href="/album/?id=101073339">${item.album.name}</a>
                        </span>
                    </div>
                </div>
            </li>
        `
        const min = getMinUl()
        
        min.innerHTML += str
    })
}

//加载第二页
// 浏览器滚动事件 
window.onscroll = function(){

    //获取浏览器卷去的高度
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // console.log(scrollTop)

    //可视窗口的高
    const windowHeight = document.documentElement.clientHeight
    // console.log(windowHeight)

    //最短UL
    const minUl = getMinUl()
    // console.log(minUl)

    //最短UL的高度
    const ulHeight = minUl.offsetHeight
    // console.log(ulHeight)

    //最短ul的上方偏移量
    const ulTop = minUl.offsetTop
    // console.log(ulTop)

    //条件判断 
    if(ulHeight + ulTop <= windowHeight + scrollTop){
        getList()
    } 
    
}

// 热门点击渲染页面
const li_list = document.querySelectorAll('.hot ul li')
console.log(li_list)
