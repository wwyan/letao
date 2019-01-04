
$(function(){
    //表单验证
    
    // 用户名不为空
    // 密码不为空 且为6-12位
    //使用表单校验插件
$('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [':disabled', ':hidden', ':not(:visible)'],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6到12之间'
          },
          callback: '密码不正确'
        }
      },
    }
  
  });

});

// 
$(function(){

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    console.log($('#form').serialize());
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function(res){
        console.log(res);
        if(res.success){
          location.href = "index.html";
        }

        if(res.error == 1000){
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
          // 动态的改变状态
        }
        if(res.error == 1001){
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
      }
    });


  });
  // 重置表单
  $("[type='reset']").on("click", function(){
  
    //重置表单样式
    $("#form").data("bootstrapValidator").resetForm();
    
  });

});