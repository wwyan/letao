
// 发送ajax 获取分类数据
$(function(){


    var currentPage = 1;
    var pageSize = 5;

    render();

    function render(){
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            dataType: "json",
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            success: function(res){
                console.log(res);
                
                var htmlStr = template('tpl',res);
                $('.l_content tbody').html(htmlStr);
                
                // 分页
                $('#paginator').bootstrapPaginator({
                    // 配置版本
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: res.page,
                    // 总页数
                    totalPages: Math.ceil(res.total/res.size),

                    onPageClicked: function(a , b, c, page){
                        currentPage = page;
                        render();
                    }

                })
            }
        })
    }

    // 点击添加按钮 显示模态框
    $('#addCateBtn').on('click',function(){
        $('#addModal').modal('show');

        // 表单验证
        $('#form').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                categoryName: {
                    validators: {
                        notEmpty: {
                            message: "请输入一级分类名"
                        }
                    }
                }
            }
        })
    });

    $('#form').on('success.form.bv',function(e){
        // 阻止默认的提交
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            dataType: 'json',
            data: $('#form').serialize(),

            success: function(res){
                if(res.success){
                    // 关闭模态框
                    $('#addModal').modal('hide');

                    render();

                    // 重置表单状态和内容
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }

        })


    })


})
