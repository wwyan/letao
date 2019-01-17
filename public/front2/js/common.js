/**
 * Created by 54721 on 2019/1/8.
 */
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //是否显示滚动条
});

//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
});


// 封装了一个方法, 专门用于处理获取地址栏的传参
function getSearch( k ) {
  // 利用 location.search 获取地址栏参数
  var str = location.search;

  // 进行中文解码
  str = decodeURI( str );   //  ?name=pp&age=18&desc=帅

  // 去掉问号
  // start从哪开始, end到哪结束, 包括start, 不包括end
  // 如果, end不传, 表示从 start 开始, 截取到最后
  // str.slice(start, end)
  str = str.slice( 1 );     //  name=pp&age=18&desc=帅

  // 根据 & 进行分割
  var arr = str.split("&");   // ["name=pp", "age=18", "desc=帅"]

  var obj = {};

  // 遍历数组, 获取键和值
  arr.forEach(function( v, i ) {    // v  "age=18"
    var key = v.split("=")[0]; // age
    var value = v.split("=")[1]; // 18
    obj[ key ] = value;
  });

  return obj[ k ];
}