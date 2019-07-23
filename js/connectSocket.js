var socket;

//表格数据项
var initialData = [
	["2019-07-12 08:00:00", 116],
	["2019-07-12 08:20:00", 120],
	["2019-07-12 10:00:00", 135],
	["2019-07-13 11:00:00", 140],
	["2019-07-14 12:00:00", 300]
];
window.onload = function(e) {

	//连接socket 接收数据 渲染表格
	connnectSocket(id, rate);
	
	//渲染echarts
	inintialEcharts(id, rate, initialData);
	
	//动态添加设备选择框的值
	initDeviceIdSelect();
	//改变设备选择框的值
	changeDeviceSelect(id);
	
	
}

//连接socket
function connnectSocket(id, rate) {
	if (typeof(WebSocket) == "undefined") {
		console.log("您的浏览器不支持WebSocket");
	} else {
		var wsServer = "ws://127.0.0.1:8080/chartsSocket/" + id + "/" + rate;
		console.log(wsServer);

		//初始化socketEntity对象
		window.parent.webSocket = new socketEntity();
		window.parent.webSocket.wsServer = wsServer;
		
		
		//连接websocket
		window.parent.webSocket.connect(wsServer);

		//当前socket的状态
		var state = window.parent.webSocket.getState();
		
		
		//收到socket消息的处理
		window.parent.webSocket.writeScreen = function(res) {
			if (res.senderType == heartbeatPack.senderType) {
				console.log("心跳包...");
			} else {
				console.log(res)
				if (res.senderType == NEWMESSAGETYPE.data) {
					var data = res.data;
					console.log("data----", data);
					var dataArr = [data.recordTime, data.number];
					initialData.push(dataArr);
					//渲染echarts
					// inintialEcharts(id, rate, initialData);
				}
			}

		};
	}
}
