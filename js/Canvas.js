// Canvas类
class Canvas {
	blockList: Block[]
	ctx: any
	canvas: any
	createBlock(option) {
		option.Canvas = this
		this.blockList.push(new Block(option))
		this.painting()
	}
	rendering(block) { // 渲染色块函数
		this.ctx.fillStyle = block.color
		this.ctx.fillRect(block.x, block.y, block.w, block.h)
	}
	painting() { // 将容器里的色块全部渲染到canvas
		// 清空画布（渲染之前应该将老的清空）
		this.ctx.fillStyle = '#fff'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.blockList.forEach(ele => {
			this.rendering(ele)
		})
	}
	constructor(ele) { // 初始化函数（输入的是canvas）
		// 设置canvas
		this.canvas = ele
		this.ctx = this.canvas.getContext('2d')
		// 色块容器
		this.blockList = []
	}
}
class Block {
	w: number
	h: number
	x: number
	y: number
	color: string
	Canvas: Canvas
	hierarchy: number
	constructor({
		w,
		h,
		x,
		y,
		color,
		Canvas
	}) { // 初始化设置色块相关属性
		this.w = w
		this.h = h
		this.x = x
		this.y = y
		this.color = color
		this.Canvas = Canvas
	}
}


// 创建Canvas实例，并添加蓝色个宽高100px,位置(100,100)、(300,100)红色和蓝色的色块
var canvas = new Canvas(document.getElementById('canvas'))
canvas.createBlock({ // 红色
	x: 100,
	y: 100,
	w: 100,
	h: 100,
	color: '#f00'
})
canvas.createBlock({ // 蓝色
	x: 100,
	y: 100,
	w: 300,
	h: 100,
	color: '#00f'
})
