var layer;
var form;
var laydate;
//初始化 layer 对象
//初始化 from 对象
layui.use(['form', 'layer', 'laydate'], function() {
	layer = layui.layer;
	form = layui.form;
	laydate = layui.laydate;
	//渲染表单对象
	form.render();
	//渲染时间选择器
	laydate.render({
		elem: "#attendanceTimePeriod",
		type: "datetime",
		range: "到",
		format: "yyyy年M月d日H时m分s秒"
	});
})

/**
 * 点击导出报表 
 */
$("#exportBtn").bind("click", function() {
	var html = document.getElementById("exportModal").innerHTML;
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		area: ['730px', '345px'],
		shadeClose: true,
		scrollbar: true,
		resize: false,
		content: html,
		offset: '200px',
		success: function() {
			//初始化 from 对象
			layui.use(['form', 'laydate'], function() {
				var layform = layui.form;
				layform.render();
				var laydate = layui.laydate;
				//渲染时间选择器
				laydate.render({
					elem: "#attendanceTimePeriod",
					type: "datetime",
					range: "到",
					format: "yyyy年M月d日H时m分s秒"
				});
			})
		}
	});
})
