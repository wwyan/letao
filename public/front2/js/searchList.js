/**
 * Created by 54721 on 2019/1/10.
 */
$(function() {

  // 获取地址栏的传参
  var key = getSearch('key');

  // 1. 将搜索关键字赋值给 input 框
  $('.search_input').val( key );

  // 2. 发送ajax请求, 将搜索关键字发送给后台
  render();

  // 3. 点击搜索按钮, 也要根据搜索关键字, 进行搜索渲染
  $('.search_btn').click(function() {
    render();
  });


  // 4. 给排序按钮, 添加点击高亮效果
  //    (1) 如果没有 current 类, 就加上 current, 还要排他
  //    (2) 如果已经有了 current 类, 改变箭头方向即可
  $('.lt_sort a[data-type]').click(function() {

    if ( $(this).hasClass("current") ) {
      // 有, 那么就切换箭头方向, 本质上切换的是 i 的类
      // fa-angle-down  <=>  fa-angle-up
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else {
      // 没有
      $(this).addClass("current").siblings().removeClass("current");
    }

    // 调用 render 重新渲染
    render();
  })


  function render() {
    $('.lt_product').html('<div class="loading"></div>');

    var paramsObj = {};

    // 三个必传的参数
    paramsObj.proName = $('.search_input').val();
    paramsObj.page = 1;
    paramsObj.pageSize = 100;

    // 两个可传的参数, 排序参数
    // 根据是否有高亮的 a 决定, 是否需要传额外的参数
    var $current = $('.lt_sort a.current'); // 获取高亮的 a
    if ( $current.length >= 1 ) {
      // 有高亮的 a, 需要进行排序
      // 从自定义属性中, 获取需要给后台传的参数名
      var sortName = $current.data("type");    // price

      // 根据箭头的方向, 决定升序还是降序, 决定给后台传的参数值  1升序，2降序
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

      // 将额外的参数, 添加到 paramsObj 中
      paramsObj[ sortName ] = sortValue;
    }

    setTimeout(function() {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: paramsObj,
        dataType: "json",
        success: function( info ) {
          console.log( info )
          var htmlStr = template("productTpl", info);
          $('.lt_product').html( htmlStr );
        }
      })
    }, 1000);
  }

})
