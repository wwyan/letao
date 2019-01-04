
// 发送ajax 获取数据
$(function(){

    var currentPage = 1;
    var pageSize = 5;

    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        dataType: "json",
        data: {
            page: currentPage,
            pageSize: pageSize,
        },
        success: function(res){
            var htmlStr = template('tpl',res);
            $('.l_content tbody').html(htmlStr);
        }

    })

});
