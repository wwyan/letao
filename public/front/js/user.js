

$(function(){
// 发送ajax 获取用户数据
  $.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function(res){
      console.log(res);
      if(res.error === 400){
        location.href = "login.html";
        return;
      }

      var htmlStr = template('userTpl', res);
      $('#userInfo').html(htmlStr);

    }
  });

  // 退出
  $('#logoutBtn').click(function(){
    $.ajax({
      type: 'get',
      url: '/user/logout',
      dataType: 'json',
      success: function(res){
        if(res.success){
          location.href = "login.html";
          return;
        }
        if(res.error){
          mui.toast('服务器忙, 请稍后重试');
          return;
        }
      }
    })

  })

})
