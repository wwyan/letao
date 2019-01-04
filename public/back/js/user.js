// 发送ajax请求 获取user数据

;(function () {

    var currentPage = 1;
    render();

    function render() {

        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: 5,
            },
            success: function (res) {
                console.log(res);

                var htmlStr = template("tpl", res);
                $('.l_content tbody').html(htmlStr);


                // 分页
                // 配置分页
                $('#paginator').bootstrapPaginator({
                    // 指定bootstrap版本
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: res.page,
                    // 总页数
                    totalPages: Math.ceil(res.total / res.size),

                    // 当页面被点击时触发
                    onPageClicked: function (a, b, c, page) {
                        // page 当前点击的页码
                        currentPage = page;
                        // 调用 render 重新渲染页面
                        render();
                    }
                })
            }
        });
    }

})();