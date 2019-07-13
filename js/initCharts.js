
//初始化 echarts
function inintialEcharts(id,rate,data) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));
	var text = 'id:' + id + ' ' + rate;

	//表格配置项
	var option = {
		title: {
			text: text
		},
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			data: data.map(function(item) {
				return item[0];
			})
		},
		yAxis: {
			splitLine: {
				show: false
			}
		},
		toolbox: {
			left: 'center',
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				restore: {},
				saveAsImage: {}
			}
		},
		dataZoom: [{
			startValue: '2014-06-01'
		}, {
			type: 'inside'
		}],
		visualMap: {
			top: 10,
			right: 0,
			pieces: [{
				gt: 0,
				lte: 50,
				color: '#096'
			}, {
				gt: 50,
				lte: 100,
				color: '#ffde33'
			}, {
				gt: 100,
				lte: 150,
				color: '#ff9933'
			}, {
				gt: 150,
				lte: 200,
				color: '#cc0033'
			}, {
				gt: 200,
				lte: 300,
				color: '#660099'
			}, {
				gt: 300,
				color: '#7e0023'
			}],
			outOfRange: {
				color: '#999'
			}
		},
		series: {
			name: text,
			type: 'line',
			data: data.map(function(item) {
				return item[1];
			}),
			markLine: {
				silent: true,
				data: [{
					yAxis: 50
				}, {
					yAxis: 100
				}, {
					yAxis: 150
				}, {
					yAxis: 200
				}, {
					yAxis: 300
				}]
			}
		}
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getParam("name")
 * 返回值:tyler
 */
function getParam(paramName) {
	paramValue = "", isFound = !1;
	if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
		while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() ==
			paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
	}
	return paramValue == "" && (paramValue = null), paramValue
}
