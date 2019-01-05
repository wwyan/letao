
$(function(){
    // 发送ajax 获取数据 并渲染
    "use strict"
    var currentPage = 1;
    var pageSize = 2;
    var picArr = [];

    render();

    function render(){
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            dataType: "json",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function(res){
                console.log(res);
                var htmlStr = template('tplPro',res);
    
                $('.l_content tbody').html(htmlStr);
    
                // 分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: res.page,
                    totalPages: Math.ceil(res.total/res.size),
                    onPageClicked: function(a,b,c, page){

                        currentPage = page;
                        render()
                    }
                })
            }
        });
    };

        // // 下架 上架按钮切换
        // $('.l_content tbody').on('click','.btn',function(){

        // })

        
    
    // 点击添加商品按钮 显示模态框
    $('#addProBtn').click(function(){
        $('#addProModal').modal('show');

        // 发送ajax请求 获取二级分类数据 并渲染
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            dataType: "json",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(res){
                console.log(res);
                var htmlStr = template('tplCate',res);
                $('.dropdown-menu').html(htmlStr);

            }
        })
    });

    // 获取下拉框的内容 赋值
    $('.dropdown-menu').on('click','a',function(){
        // 获取选中的文本
        var text = $(this).text();
        // 赋值
        $('#dropdownText').text(text);
        // 获取id
        var id = $(this).data('id');
        // 赋值
        $('[name="brandId"]').val(id);

    });

    // 配置fileupload
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function(e, data){
            // console.log(data);
            // 获取picurl (对象多个 图片地址)
            var picUrl = data.result;

            // 每个addr
            var picAddr = picUrl.picAddr;

            // 把新加的 图片加到最前面
            picArr.unshift(picUrl);

            console.log(picArr);

            $('#imgBox').prepend('<img src="'+ picAddr +'" width="100px" alt="">');
            
            // 判断图片数量 > 3 删除最后一个
            if( picArr.length > 3 ){
                // 图片数组 删除最后一个
                picArr.pop();
                // 删除最后一个img盒子
                $('#imgBox img:last-of-type').remove();

            }
            // 图片数量等于3 验证
            if( picArr.length === 3 ){

                $('#form').data('bootstrapValidator').updateStatus("picStatus","VALID");
            }
        }
    });

    // 表单验证
    $('#form').bootstrapValidator({
        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            brandId:{
                validator: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName:{
                validator: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc:{
                validator: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            proNum:{
                validator: {
                    notEmpty: {
                        message: "请输入商品库存"
                    }
                }
            },
            proSize:{
                validator: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    }
                }
            },
            proOldPrice:{
                validator: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            proPrice:{
                validator: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            picStatus: {
                validator: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }

    });

    // 注册校验成功事件
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();

        // 发送ajax
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            dataType: 'json',
            data: $('#form').serialize(),
            success: function(res){
                console.log(res);
                // 关闭模态框
                $('#addProModal').modal('hide');
                
                currentPage = 1;
                render();

                // 重置表单状态和 内容
                $('#form').data('bootstrapValidator').resetForm(true);
            }
        })

    })

});