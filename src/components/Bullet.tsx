import BulletJs from "js-bullets";
import {  onMount, For } from "solid-js";
import "../styles/bullet.css"

let screen = null
const tool_url = "https://toolkit.show/tool/"
// const tool_url = "http://localhost:9500/tool/"
const interval_time = 1000 * 60
onMount(async () => {
    screen = new BulletJs(".bullet_area", {
        trackHeight: 35, // 每条轨道高度
        speed: 100, // 速度 100px/s 根据实际情况去配置 
        pauseOnClick: true, // 点击暂停
        pauseOnHover: true, // hover 暂停
    })
    getIp()
    getAndSendBullet('watermark/wx/bullet/latest?num=100')
    setInterval(() => {
        getAndSendBullet('watermark/wx/bullet/min')
    },interval_time)
    
})

// 定时获取并发送弹幕
function getAndSendBullet(path:string) {

    fetch(tool_url+path)
        .then(response => {
            // 检查响应状态码
            if (response.ok) {
               // 返回响应结果的 JSON 格式
               return response.json();
             } else {
               console.log("watermark/wx/bullet/min Network response was not ok.");
             }
         })
         .then(async data => {
            console.log(data)
            let dataList = data.data
            for(let i = 0; i<dataList.length; i++ ) {
               
                let item = dataList[i]
                randomSendBullet(item.question)
                if(i%10 == 0) {
                    console.log(i)
                    await sleep(2000)
                }
            }
         })

   
}


// 发送并保存弹幕
export default function SendAndSaveBullet(danmu?:string) {
    let bullet = {
        "ip":getIp(),
        "question":danmu
    }
    saveBullet(bullet)
    randomSendBullet(danmu)
} 

// 保存弹幕
function saveBullet(bullet:any) {
    fetch(tool_url+'watermark/wx/bullet',{
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'ipAddr': getIp(),
        }),
        body: JSON.stringify(bullet)
    })
  .then(response => {
     // 检查响应状态码
     if (response.ok) {
        // 返回响应结果的 JSON 格式
        return response.json();
      } else {
        console.log("watermark/wx/bullet Network response was not ok.");
      }
  })
}

// 随机样式发送弹幕
function randomSendBullet(danmu:any) {
    let ori_danmu = danmu
    let font_size = Math.ceil(Math.random()*20)+10
    let font_weight = Math.ceil(Math.random()*300)+400
    let danmuAbb
    if (danmu != null && danmu.length > 15) {
      danmuAbb = danmu.substring(0,15) + "..."
    } else {
      danmuAbb = danmu
    }
    
    screen.push('<a title='+ori_danmu+' class="bullet hover: border-transparent border-3" style="font-size:'+font_size+'px;font-weight:'+font_weight+';color:'+color()+';">'+danmuAbb+'</a>')
}



// 获取ip
function getIp(): string {

    let ip = localStorage.getItem("ip") == null ? "" : localStorage.getItem("ip");
    if (ip != null && ip != 'null' && ip != "") {
      return ip;
    }

    fetch('https://api.ipify.org/?format=json',{
        method: 'GET'
    })
  .then(response => {
     // 检查响应状态码
     if (response.ok) {
        // 返回响应结果的 JSON 格式
        return response.json();
      } else {
        console.log("https://api.ipify.org/?format=json Network response was not ok.");
      }
  }).then(data => {
    ip = data.ip;
    localStorage.setItem("ip", ip == null ? "" : ip)
  })
  
    return ip == null ? "" : ip
  
  }

  function color(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    let color = 'rgba('+ r +','+ g +','+ b +',0.8)';
    return color
 }

 const sleep = (delay:number) => new Promise((resolve) => setTimeout(resolve, delay))

