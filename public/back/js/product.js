
$(function(){
    // 发送ajax 获取数据 并渲染
    
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
                        render();
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

    // 表单验证bootstrapValidator
    $('#form').bootstrapValidator({
        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        
        fields: {
            brandId:{
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName:{
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            proNum:{
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },
            proSize:{
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 32-40'
                    }
                }
            },
            proOldPrice:{
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            proPrice:{
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }
        }

    });

    // 注册校验成功事件
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();

        // picArr    JSON.stringify后的数组字符串(格式见备注)
        var info = $('#form').serialize();
        console.log(info);
        // brandId=6&proName=%E6%98%AF&proDesc=%E6%98%AF
        // &proNum=%E9%98%BF%E8%90%A8%E5%BE%B7&proSize=%E9%98%BF%E8%90%A8%E5%BE%B7
        // &proOldPrice=%E9%98%BF%E8%90%A8%E5%BE%B7
        // &proPrice=3%E4%BA%BA
        // &picStatus=

        info += "&picArr=" + JSON.stringify(picArr);
        console.log(info);
        // 发送ajax
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            dataType: 'json',
            data: info,
            success: function(res){
                console.log(res);
                // 关闭模态框
                $('#addProModal').modal('hide');
                
                // 重置表单状态和 内容
                $('#form').data('bootstrapValidator').resetForm(true);

                currentPage = 1;
                render();

                // 删除图片
                $('#imgBox img').remove();
                // 重置数组
                picArr = [];
                // 重置下拉菜单 二级分类
                $('#dropdownText').text('请选择二级分类');
            }
        })

    })

});