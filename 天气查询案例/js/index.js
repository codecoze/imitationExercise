//封装一个判断天气，选择图标的函数
/**
 * 
 * @param {array} data 天气数据
 * @param {number} t  为第几天
 * @returns 
 */
function weatherIcon(data,t){
    if(data[t - 1].weather.search("阴") != -1){
        return "&#xe624"
    }
    if(data[t - 1].weather.search("多云") != -1){
        return "&#xe618"
    }
    if(data[t - 1].weather.search("晴") != -1){
        return "&#xe61f"
    }
    if(data[t - 1].weather.search("小雨") != -1){
        return "&#xe622"
    }
    if(data[t - 1].weather.search("中雨") != -1){
        return "&#xe685"
    }
    if(data[t - 1].weather.search("大雨") != -1 ||data[t - 1].weather.search("暴雨") != -1){
        return "&#xe644"
    }
    if(data[t - 1].weather.search("阵雨") != -1){
        return "&#xe642;";
    }
}


function weather(data){
    console.log(data)
    var dateDayname = document.getElementById('date-dayname');
    var dateDay = document.getElementById('date-day');
    var location = document.getElementById('location');

    //天气图标
    var weatherL = document.getElementById('weather-l');
    var weatherTemp = document.getElementById('weather-temp');
    var weatherDesc = document.getElementById('weather-desc');

    dateDayname.innerHTML = data.weather[0].date.slice(0,3);
    dateDay.innerHTML = data.date;
    location.innerHTML ="&#xe617;" +data.city;

    //这个图标需要封装一个方法来判断用什么图标
    weatherL.innerHTML = weatherIcon(data.weather,1)
    weatherTemp.innerHTML =  data.weather[0].temp.replace("/","\.");
    weatherDesc.innerHTML = data.weather[0].weather;

    var pm  =document.getElementById('pm');
    var humidity = document.getElementById('humidity');
    var wind = document.getElementById('wind');

    //现有接口数据中 缺少这两个数据
    // pm.innerHTML = data.weather[0].pm;
    // humidity.innerHTML = data.weather[0].shidu;
    pm.innerHTML = "暂无";
    humidity.innerHTML = "暂无";
    wind.innerHTML = data.weather[0].wind;

    var day1 = document.getElementById("day1");
    var span1 = day1.getElementsByTagName("span");

    var day2 = document.getElementById("day2");
    var span2 = day2.getElementsByTagName("span");

    var day3 = document.getElementById("day3");
    var span3 = day3.getElementsByTagName("span");

    var day4 = document.getElementById("day4");
    var span4 = day4.getElementsByTagName("span");

    span1[0].innerHTML = weatherIcon(data.weather,1);
    span1[1].innerHTML = data.weather[0].date.slice(0,3);
    span1[2].innerHTML = data.weather[0].temp.replace("/","\.");

    span2[0].innerHTML = weatherIcon(data.weather,2);
    span2[1].innerHTML = data.weather[1].date.slice(0,3);
    span2[2].innerHTML = data.weather[1].temp.replace("/","\.");

    span3[0].innerHTML = weatherIcon(data.weather,3);
    span3[1].innerHTML = data.weather[2].date.slice(0,3);
    span3[2].innerHTML = data.weather[2].temp.replace("/","\.");

    span4[0].innerHTML = weatherIcon(data.weather,4);
    span4[1].innerHTML = data.weather[3].date.slice(0,3);
    span4[2].innerHTML = data.weather[3].temp.replace("/","\.");
}


window.onload = function(){
    
    var btn = document.getElementById("location-button");
    var city = document.getElementById("city");
    var citys = [];
    $.getJSON("city.json", function(data){
            // 将json城市数据 转成键值对的形式，帮助之后可以更快查询；
            citys = data;
        }
    );
     //默认查询北京天气
     var script = document.createElement("script");
     script.src = `https://api.asilu.com/weather/?city=${"北京"}&callback=weather`;
     document.body.appendChild(script);

    btn.onclick = function(){
        //简单判断是否有值
        if(city.value){
            
        //     let searchKey = city.value.trim();
        //     console.log(searchKey)
        //    let searchItem =  citys.find(item=>item.city_name === searchKey);
        //    console.log(searchItem)
        //    if(!searchItem.city_code){
        //     alert("请输入城市名称！")
        //     return;
        //    }
            //let api = `http://t.weather.sojson.com/api/weather/city/${searchItem.city_code}`;
            //跨域了
            // $.get(api, function(data){
            //        console.log(data,"搜索结果")
            // });

           let searchItem = city.value.trim();
           let newScript = document.createElement("script");
           newScript.src = `https://api.asilu.com/weather/?city=${searchItem}&callback=weather`;

           //插入到页面中
           document.body.appendChild(newScript)

        }else {
            alert("请输入城市名称！")
        }
    }
}