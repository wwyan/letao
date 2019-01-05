
// 发送ajax 获取数据
$(function(){

    var currentPage = 1;
    var pageSize = 5;

    render();

    function render(){
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

                // 分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage : res.page,
                    totalPages: Math.ceil( res.total/res.size ),

                    onPageClicked: function(a,b,c, page){
                        currentPage = page;
                        render();
                    }
                })
            }
        });
    }

    $('#addCateBtn').click(function(){
        // 显示模态框
        $('#addModal').modal('show');

        // 获取一级分类数据
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            dataType: "json",
            data: {
                page: 1,
                pageSize: 100,
            },
            success: function(res){
                    
                var htmlStr = template('tplDown',res);

                $('.dropdown-menu').html(htmlStr);
            }
        })
    });

    // 点击下拉框 替换文本内容
    $('.dropdown-menu').on('click','a',function(){
        // 获取当前下拉框 的内容
        var text = $(this).text();
        // 获取categoryId
        var categoryId = $(this).data('id');

        // 修改
        $('.dropdownText').text(text);
        // 存储id
        $('[name="categoryId"]').val(categoryId);

        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
    });

    // 图片上传
    $('#fileupload').fileupload({
        dataType: "json",

        done: function(e, data){
            console.log(data);
            // 获取图片地址
            var picAddr = data.result.picAddr;
            // 把图片地址给img
            $('#imgBox img').attr('src',picAddr);
            // 存储地址
            $('[name="brandLogo"]').val(picAddr);
            // 验证
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }

    })


    // 配置表单验证
    $('#form').bootstrapValidator({
        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图像"
                    }
                }
            }
        }

    });


    // 表单验证成功 发送ajax请求 添加数据
    $('#form').on('success.form.bv',function(e){
        // 阻止默认跳转
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            dataType: "json",
            data: $('#form').serialize(),
            success: function(res){
                // 关闭模态框
                $('#addModal').modal('hide');

                // 重置表单
                $('#form').data('bootstrapValidator').resetForm(true);
            }
        })
    })


});
