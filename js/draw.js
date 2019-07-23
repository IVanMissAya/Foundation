var canvas = document.getElementById("myCanvas");
canvas.width = 1024;
canvas.height = 768;

//缩放倍数
var scaleNum=1;

//创建 context 对象
var ctx = canvas.getContext("2d");

// ctx.scale(0.7,0.7);

//外圈
var tangram_inside =[{p:[{x:50,y:360},{x:200,y:700}]},{p:[{x:200,y:700},{x:260,y:720}]},
					{p:[{x:260,y:720},{x:400,y:660}]},{p:[{x:400,y:660},{x:470,y:650}]},
					{p:[{x:470,y:650},{x:950,y:250}]},{p:[{x:950,y:250},{x:860,y:20}]},
					{p:[{x:860,y:20},{x:100,y:260}]},{p:[{x:100,y:260},{x:50,y:360}]}];
//内圈
var tangram_outside =[{p:[{x:80,y:360},{x:220,y:680}]},{p:[{x:220,y:680},{x:265,y:695}]},
					 {p:[{x:265,y:695},{x:375,y:645}]},{p:[{x:375,y:645},{x:450,y:630}]},
					 {p:[{x:450,y:630},{x:920,y:245}]},{p:[{x:920,y:245},{x:845,y:50}]},
					 {p:[{x:845,y:50},{x:130,y:280}]},{p:[{x:130,y:280},{x:80,y:360}]}];
			
//绘制基坑
drawFoundation(tangram_inside,ctx);
			
//绘制基坑
function drawFoundation(tangram_inside,ctx){
	
	for(var i=0;i<tangram_inside.length;i++){
		drawLine(tangram_inside[i],ctx,"red");
		drawLine(tangram_outside[i],ctx,"gray");
	}
}
					
			
//绘制边线
function drawLine(tangram_inside,ctx,strokeStyle){
		ctx.beginPath();
		ctx.moveTo(tangram_inside.p[0].x,tangram_inside.p[0].y);  //定义开始绘制路径
		for(var j=1;j<tangram_inside.p.length;j++){
				ctx.lineTo(tangram_inside.p[j].x,tangram_inside.p[j].y);
			}
		ctx.closePath();
		ctx.strokeStyle=strokeStyle;
		ctx.lineWidth=2;
		ctx.stroke();
}
			
//小圆点
var pointArray=[{p:{x:50,y:360,r:5,checked:0,color:"black",id:"1"}},{p:{x:90,y:450,r:5,checked:0,color:"black",id:"2"}},
				{p:{x:147,y:580,r:5,checked:0,color:"black",id:"3"}},{p:{x:200,y:700,r:5,checked:0,color:"black",id:"4"}},
				{p:{x:260,y:720,r:5,checked:0,color:"black",id:"5"}},{p:{x:400,y:660,r:5,checked:0,color:"black",id:"6"}},
				{p:{x:470,y:650,r:5,checked:0,color:"black",id:"7"}},{p:{x:580,y:560,r:5,checked:0,color:"black",id:"8"}},
				{p:{x:690,y:468,r:5,checked:0,color:"black",id:"9"}},{p:{x:800,y:375,r:5,checked:0,color:"black",id:"10"}},
				{p:{x:950,y:250,r:5,checked:0,color:"black",id:"11"}},{p:{x:905,y:135,r:5,checked:0,color:"black",id:"12"}},
				{p:{x:750,y:55,r:5,checked:0,color:"black",id:"13"}},{p:{x:600,y:103,r:5,checked:0,color:"black",id:"14"}},
				{p:{x:400,y:165,r:5,checked:0,color:"black",id:"15"}},{p:{x:230,y:218,r:5,checked:0,color:"black",id:"16"}},
				{p:{x:860,y:20,r:5,checked:0,color:"black",id:"17"}},{p:{x:100,y:260,r:5,checked:0,color:"black",id:"18"}}];
							
//绘制圆点				
drwaPoint(pointArray,ctx);

//绘制小圆点		
function drwaPoint(pointArray,ctx){
	
	//字体
	ctx.font="13px bold 黑体";
	//颜色
	ctx.fillStyle="black";
	//设置水平对齐方式
	ctx.textAlign="left";
	//设置垂直对齐方式
	ctx.textBaseline = "middle";
	
	for(var i=0;i<pointArray.length;i++){
		ctx.beginPath();
		ctx.arc(pointArray[i].p.x,pointArray[i].p.y,pointArray[i].p.r, 0, 2 * Math.PI,true);
		ctx.fillStyle=pointArray[i].p.color;
		ctx.stroke();
		ctx.fill();
		
		var x_rate=0;
		var y_rate=0;
		
		if(i>=4&&i<10){
			x_rate=pointArray[i].p.x;
			y_rate=pointArray[i].p.y+20;
		}else{
			if(i==10){
				x_rate=pointArray[i].p.x+20;
				y_rate=pointArray[i].p.y;
			}else if(i==11){
				x_rate=pointArray[i].p.x+20;
				y_rate=pointArray[i].p.y;
			}else{
				x_rate=pointArray[i].p.x-50;
				y_rate=pointArray[i].p.y;
			}
		}
		ctx.fillText("id:"+pointArray[i].p.id,x_rate,y_rate);
	}
	
}

//提示面板小圆点位置
var hitPanelArray=[{p:{x:830,y:600,color:"blue"}},{p:{x:830,y:650,color:"green"}},{p:{x:830,y:700,color:"red"}}];

drawHitPanel(hitPanelArray,ctx);

//绘制提示面板
function drawHitPanel(hitPanelArray,ctx){
	for(var i=0;i<hitPanelArray.length;i++){
			ctx.beginPath();
			ctx.arc(hitPanelArray[i].p.x,hitPanelArray[i].p.y,5, 0, 2 * Math.PI,true);
			ctx.fillStyle=hitPanelArray[i].p.color;
			ctx.stroke();
			ctx.fill();
	}
	
	//绘制提示文字
	//字体
	ctx.font="16px bold 黑体";
	//颜色
	ctx.fillStyle="black";
	//设置水平对齐方式
	ctx.textAlign="left";
	//设置垂直对齐方式
	ctx.textBaseline = "middle";
	//绘制文字（参数：要写的字，x坐标，y坐标）
	ctx.fillText("选中", 860, 600);
	ctx.fillText("数据正常",860, 650);
	ctx.fillText("数据异常", 860, 700);
}




			
				