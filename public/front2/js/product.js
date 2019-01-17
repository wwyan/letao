/**
 * Created by 54721 on 2019/1/10.
 */
$(function() {

  // 1. 获取productId
  var productId = getSearch("productId");

  // 2. 根据productId 发送请求, 获取数据, 完成渲染
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    dataType: "json",
    success: function( info ) {
      console.log( info );
      // 根据得到的 info 对象, 完成页面渲染
      var htmlStr = template( 'productTpl', info );
      $('.lt_main .mui-scroll').html( htmlStr );

      // 在页面渲染完成后, 进行轮播图初始化
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      // 手动初始化数字框
      mui('.mui-numbox').numbox()
    }
  });


  // 3. 给尺码添加选中功能
  $('.lt_main').on("click", ".lt_size span", function() {
    $(this).addClass("current").siblings().removeClass("current");
  });


  // 4. 加入购物车功能
  $('#addCart').click(function() {
    // 准备商品id  productId 直接用
    // 获取尺码
    var size = $('.lt_size span.current').text();
    if ( size === null ) {
      // 提示用户, 选择尺码
      mui.toast("请选择尺码");
      return;
    }

    // 获取数量
    var num = $('.mui-numbox-input').val();

    // 发送ajax
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        num: num,
        size: size
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.error === 400 ) {
          // 说明未登录, 拦截到登录页, 由于将来要跳回来
          // 可以将当前页面的完整地址, 作为参数, 传递过去
          location.href = "login.html?retUrl=" + location.href;
          return;
        }

        if ( info.success ) {
          // 给用户提示, 加入购物车成功
          //mui.confirm(content, title, 按钮数组, 回调函数)
          mui.confirm("加入购物车成功", "文星提示", ["去购物车", "继续浏览"], function( e ) {
            // e.index 是按钮的索引(下标)
            if ( e.index === 0 ) {
              location.href = "cart.html"
            }
          })
        }
      }
    })

  })


})
