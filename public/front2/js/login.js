/**
 * Created by 54721 on 2019/1/10.
 */
$(function() {

  // 需求: 实现用户的基本登录
  // 获取输入框的用户名和密码, 发送ajax请求, 进行登录
  $('#loginBtn').click(function() {

    // 获取用户名和密码
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();

    // 非空校验
    if (username === "") {
      mui.toast("请输入用户名");
      return;
    }
    if (password === "") {
      mui.toast("请输入密码");
      return;
    }

    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.error === 403 ) {
          mui.toast("用户名或者密码错误");
          return;
        }

        if ( info.success ) {
          // 有传参数过来, 说明要跳回去
          // 没有传参数过来, 跳个人中心
          if ( location.search.indexOf("retUrl") != -1 ) {
            // 找到了 retUrl, 有参数, 跳回去
            // location.search =>  "?retUrl=http://localhost:3000/front/product.html?productId=7"
            // 获取跳转的地址
            var retUrl = location.search.replace("?retUrl=", "");
            // 跳回去
            location.href = retUrl;
          }
          else {
            // 没找到, 跳个人中心
            location.href = "user.html";
          }
        }
      }
    })

  })

})
