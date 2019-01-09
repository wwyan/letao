$(function(){

  // 发送ajax 获取购物车数据 模板渲染

  render();

  function render(){

    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      dataType: 'json',
      success: function(res){
        if(res.error === 400){
          // 用户没有登路
          location.href = "login.html"
        }
        var htmlStr = template('cartTpl',{arr: res});
        $('.mui-table-view').html(htmlStr);

      }
  
    })
  };

  // 删除
  

});