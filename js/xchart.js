var layer;
var form;

//获取到地址栏的id
var id = getParam("id");

//数据源(默认x)
var rate = "x";

//初始化 layer 对象
layui.use('layer', function() {
	layer = layui.layer;
})
//初始化 from 对象
layui.use('form', function() {
	form = layui.form;
	//渲染表单对象
	form.render();
	//监听设备ID 下拉框改变事件
	form.on('select(deviceId)', function(data) {
		id = data.value;
		//改变charts中的设备ID
		inintialEcharts(data.value, rate);
	});
	//监听数据源 下拉框改变事件
	form.on('select(dataSource)', function(data) {
		//改变charts中的数据源
		rate = data.value;
		inintialEcharts(id, data.value);
	});

})

//页面加载事件
window.onload = function(e) {

	//渲染echarts
	inintialEcharts(id, "x");

	//动态添加设备选择框的值
	initDeviceIdSelect();
	//改变设备选择框的值
	changeDeviceSelect(id);
}



//动态添加设备选择框的值
function initDeviceIdSelect() {
	var list = [];
	var deviceIdDom = document.getElementById("deviceId"); //server为select定义的id
	for (var i = 1; i < 19; i++) {
		list.push(i);
	}
	for (var p in list) {
		var option = document.createElement("option"); // 创建添加option属性
		option.setAttribute("value", parseInt(p) + 1); // 给option的value添加值
		option.innerText = list[p]; // 打印option对应的纯文本 
		deviceIdDom.appendChild(option); //给select添加option子标签
		form.render("select");
	}
}

//改变设备选择框的值
function changeDeviceSelect(id) {
	$("#deviceId").val(id);
	form.render('select');
}


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