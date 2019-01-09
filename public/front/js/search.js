$(function(){

  // 功能1 获取本地存储的search_list 渲染到页面上
  //    获取到的是jsonStr 需要转成数组
  //    后面还需对获取的数据进行其他操作 故 分两步渲染

  render();
  // 获取数据
  function getHistory(){

    var jsonStr = localStorage.getItem('search_list') || '[]';

    var arr = JSON.parse(jsonStr);

    return arr;
  }

  function render(){
    var arr = getHistory();
    console.log(arr);
    var htmlStr = template('historyTpl',{arr: arr});
    $('.l_history').html(htmlStr);

  }

  // 功能2 删除全部数据
  $('.l_history .btn-empty').click(function(){
    // 弹出确认框
    mui.confirm( "确定清空搜索记录吗?", "提示", ['取消','确定'], function(e){
      console.log(e); //e.index = 1 确定 e.index = 0 取消
      if(e.index === 1){
        // 清空本地存储的search_list
        localStorage.removeItem('search_list');
        // 重新渲染
        render();
      }
    });
  })

  // 删除单条记录
  $('.l_history').on('click','.btn_delete',function(){
    // 获取需要删除的 index 
    var index = $(this).data('index');
    console.log(index);
    // 获取本地存储的数据 转成arr 根据下标删除
    var arr = getHistory();

    arr.splice(index,1);

    localStorage.setItem('search_list', JSON.stringify(arr));

    render();
    
  });

  // 添加历史记录
  $('.l_search .searchBtn').click(function(){
    // 获取input的值
    var val = $('.l_search input').val().trim();

    // 判断是否为空
    if(val === ''){
      mui.toast('请输入搜索关键字');
      return;
    }
    
    // 获取本地存储 数组
    var arr = getHistory();
    
    // 判断是否重复
    var index = arr.indexOf(val);
    if( index !== -1 ){
      // console.log('已存在'); 删除该项

      arr.splice(index,1);
    }

    // arr 最多10项 过长删除
    if(arr.length >= 10){
      arr.pop();
    }

    // 添加到最前面
    arr.unshift(val);

    // 保存到 本地
    localStorage.setItem('search_list',JSON.stringify(arr));

    render();
    
    // 清空input
    $(".l_search input").val('');

  })




})