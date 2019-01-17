/**
 * Created by 54721 on 2019/1/10.
 */
$(function() {

  // 购物车页面
  $.ajax({
    type: "get",
    url: "/cart/queryCart",
    dataType: "json",
    success: function( info ) {
      console.log( info )
      if ( info.error === 400 ) {
        // 未登录, 拦截到登录页, 将来还要跳回来, 需要将当前页面的地址, 传递过去
        location.href = "login.html?retUrl=" + location.href;
        return;
      }

      // 利用模板引擎完成渲染, 注意需要包装,
      var htmlStr = template("cartTpl", { arr: info });
      $('.lt_main .mui-table-view').html( htmlStr );
    }
  })

})
