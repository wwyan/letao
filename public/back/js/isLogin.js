// 判断是否登录成功 登录拦截

$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function(res){
        // console.log(res);
        if(res.error === 400){
            // 未登录 跳转login
            location.href = "login.html";
        }
        if(res.success){
            // 已经登录
            console.log('已经登录');
        }
    }
})