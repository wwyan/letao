
// 提交点击事件
$('#loginBtn').click(function(){
  // 获取数据验证
  var username = $('#form [name="username"]').val();
  var password = $('#form [name="password"]').val();

  if(username.trim() === ''){
    mui.toast('请输入用户名');
    return;
  }
  if(password.trim() === ''){
    mui.toast('请输入密码');
    return;
  }

  $.ajax({
    type: 'post',
    url: '/user/login',
    dataType: 'json',
    data: $('#form').serialize(),
    success: function(res){
      if(res.success){
        location.href = "user.html";
      }
      if(res.error){
        mui.toast('用户名或密码错误');
      }
    }
  })
})
