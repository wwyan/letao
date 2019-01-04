
// 进度条
// ajax 全局事件
$(document).ajaxStart(function(){
    NProgress.start();
});

$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },500)
});



$(function(){
    // 1 左侧二级菜单
    $('.l_aside .category').click(function(){
        // 下一个兄弟元素 .child 显示
        $(this).next().stop().slideToggle();
    })

    // 2 左侧侧边栏切换 点击menu按钮 侧边栏向左移动left值 -180 右侧padding-left 0
    $('.icon_menu').click(function(){
        $('.l_aside').toggleClass('hidemenu');
        $('.l_main').toggleClass('hidemenu');
        $('.l_main .l_topbar').toggleClass('hidemenu');

    })
    // 3 显示模态框

    $('.icon_logout').click(function() {
        // 让模态框显示
        $('#logoutModal').modal("show");
    });

    // 4 退出
    // 点击退出按钮 发送ajax请求 退出
    $('#logoutBtn').click(function(){
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function(res){
                console.log(res);
                if(res.success){
                    // 退出成功 跳转login
                    location.href = "login.html";
                }

            }
        })
    });

});