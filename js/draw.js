var canvas = document.getElementById("myCanvas");
canvas.width = 1024;
canvas.height = 768;

//创建 context 对象
var ctx = canvas.getContext("2d");
			
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
var pointArray=[{p:{x:50,y:360,r:5,checked:0,color:"black"}},{p:{x:90,y:450,r:5,checked:0,color:"black"}},
				{p:{x:147,y:580,r:5,checked:0,color:"black"}},{p:{x:200,y:700,r:5,checked:0,color:"black"}},
				{p:{x:260,y:720,r:5,checked:0,color:"black"}},{p:{x:400,y:660,r:5,checked:0,color:"black"}},
				{p:{x:470,y:650,r:5,checked:0,color:"black"}},{p:{x:580,y:560,r:5,checked:0,color:"black"}},
				{p:{x:690,y:468,r:5,checked:0,color:"black"}},{p:{x:800,y:375,r:5,checked:0,color:"black"}},
				{p:{x:905,y:135,r:5,checked:0,color:"black"}},{p:{x:950,y:250,r:5,checked:0,color:"black"}},
				{p:{x:750,y:55,r:5,checked:0,color:"black"}},{p:{x:600,y:103,r:5,checked:0,color:"black"}},
				{p:{x:400,y:165,r:5,checked:0,color:"black"}},{p:{x:230,y:218,r:5,checked:0,color:"black"}},
				{p:{x:860,y:20,r:5,checked:0,color:"black"}},{p:{x:100,y:260,r:5,checked:0,color:"black"}}];
							
//绘制圆点				
drwaPoint(pointArray,ctx);
			
function drwaPoint(pointArray,ctx){
		//绘制小圆点
		for(var i=0;i<pointArray.length;i++){
			ctx.beginPath();
			ctx.arc(pointArray[i].p.x,pointArray[i].p.y,pointArray[i].p.r, 0, 2 * Math.PI,true);
			ctx.fillStyle=pointArray[i].p.color;
			ctx.stroke();
			ctx.fill();
			}
}
			
			
			
			
				