//绑定点击事件
canvas.addEventListener("click", function(e) {
	//当前点击位置x y
	let eventX = e.clientX - canvas.getBoundingClientRect().left;
	let eventY = e.clientY - canvas.getBoundingClientRect().top;

	//判断是否选中圆点
	if (isInPoint(eventX, eventY) != null) {
		//当前选中圆点对象
		var checkedObj = isInPoint(eventX, eventY);
		
		//跳转到对应圆点的 图表  页面
		 window.location.href = "xCharts.html?id=" + checkedObj.id;
	}
}, false)

//绑定鼠标移动事件
canvas.addEventListener("mousemove", function(e) {
	//当前点击位置x y
	let eventX = e.clientX - canvas.getBoundingClientRect().left;
	let eventY = e.clientY - canvas.getBoundingClientRect().top;

	//判断是否选中圆点
	if (isInPoint(eventX, eventY) != null) {
		canvas.style.cursor = "pointer";
		//改变样式
		// changePointStyle(isInPoint(eventX, eventY),ctx);
	} else {
		canvas.style.cursor = "default";
	}
}, false)

//根据圆点ID改变圆点的样式
function changePointStyle(checkedPointObj,ctx) {

	//获取当前选中点的对象
	var object = pointArray[checkedPointObj.id - 1];
	if (checkedPointObj.checked == 0) {
		//清除其他选中的圆点的样式
		for (var i = 0; i < pointArray.length; i++) {
			if (pointArray[i].p.checked == 1) {
				pointArray[i].p.r = pointArray[i].p.r - 5;
				pointArray[i].p.checked = 0;
				pointArray[i].p.color = "black";
			}
		}
		//修改半径
		object.p.r = object.p.r + 5;
		//修改选中状态
		object.p.checked = 1;
		//修改选中颜色
		object.p.color = "#002FFF";
		//替换
		pointArray.splice(checkedPointObj.id - 1, 1, object);
		
	} else {
		//修改半径
		object.p.r = object.p.r - 5;
		//修改选中状态
		object.p.checked = 0;
		//修改选中颜色
		object.p.color = "black";
		//替换
		pointArray.splice(checkedPointObj.id - 1, 1, object);
	}
	
	//清空所有画布
	ctx.clearRect(0, 0, 1024, 768);

	//绘制基坑
	drawFoundation(tangram_inside, ctx);
	//绘制小圆点
	drwaPoint(pointArray, ctx);
	//绘制提示面板
	drawHitPanel(hitPanelArray,ctx);
}

//是否在小圆点内部
function isInPoint(eventX, eventY) {
	var circleId = null;
	//圆点半径
	let radius = 5;
	//所有圆点数组
	var circleArray = [];
	for (var i = 0; i < pointArray.length; i++) {
		var circleObject = {
			id: pointArray[i].p.id,
			x1: pointArray[i].p.x*scaleNum - 5,
			x2: pointArray[i].p.x*scaleNum + 5,
			y1: pointArray[i].p.y*scaleNum - 5,
			y2: pointArray[i].p.y*scaleNum + 5,
			checked: pointArray[i].p.checked,
			color: pointArray[i].p.color
		}
		circleArray.push(circleObject);
	}
	for (var i = 0; i < circleArray.length; i++) {
		if (eventX > circleArray[i].x1 && eventX < circleArray[i].x2 && eventY > circleArray[i].y1 &&
			eventY < circleArray[i].y2) {
			// console.log("在圆内...");
			circleId = circleArray[i];
			break;
		}
	}
	return circleId;
}
