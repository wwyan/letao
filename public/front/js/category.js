$(function(){
	// 发送ajax请求 获取数据 模板渲染

	$.ajax({
		type: 'get',
		url: '/category/queryTopCategory',
		dataType: 'json',
		success: function(res){
			console.log(res);
			var htmlStr = template('leftTpl',res);
			$('.l_category_left ul').html(htmlStr);

			// 默认渲染第一
			renderById(res.rows[0].id);
		}

	})

	// 给左侧a 注册点击事件 切换右侧数据
	$('.l_category_left').on('click','a',function(){
		// 给当前a 添加current 其他的删掉
		$('.l_category_left a').removeClass('current');
		$(this).addClass('current');

		// 获取当前id
		var id = $(this).data('id');
		console.log(id);
		renderById(id);
	})

	// 渲染二级分类
	function renderById(id){
		$.ajax({
			type: 'get',
			url: '/category/querySecondCategory',
			dataType: 'json',
			data: {
				id: id
			},
			success: function(res){
				var htmlStr = template('rightTpl',res);
				$('.l_category_right ul').html(htmlStr);
			}	
		})

	}


})