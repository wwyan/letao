/**
 * Created by 54721 on 2019/1/10.
 */
$(function() {

  // 1. 一进入页面, 完成用户数据渲染
  $.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function( info ) {
      console.log( info )
      if ( info.error === 400 ) {
        // 说明当前用户未登录, 拦截到登录页
        location.href = "login.html"
        return;
      }

      // 说明已登录, 服务器端返回用户信息, 根据用户信息完成渲染
      var htmlStr = template('userTpl', info);
      $('#userInfo').html( htmlStr );
    }
  })

  // 2. 退出功能
  $('#logout').click(function() {

    $.ajax({
      type: "get",
      url: "/user/logout",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 退出成功, 去登陆页
          location.href = "login.html";
        }
      }
    })

  })

})
