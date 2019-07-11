(function () {
  /*
  * Container
  **/
    cee.Container = function (canvas, cb) {
        this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.child = []; // canvas绘制的元素的数组
    this.eventCallback = cb || '';
    this.bubbling = false; // 控制冒泡
    }
  cee.Container.prototype.addChild = function (canvasEl) {
    canvasEl.canvas = this.canvas;
    canvasEl.context = this.context;
    this.child.unshift(canvasEl); // 顺序冒泡
  }
  cee.Container.prototype.draw = function () {
    this.child.forEach(function (item) {
      item.draw();
    })
  }
  cee.Container.prototype.enableClick = function () {
    var self = this;
    this.canvas.addEventListener('click', function (event) {
      self._handleClick(event, self);
    });
  }
  cee.Container.prototype._handleClick = function (event, self) {
    var self = this;
    var pos = this._getPosToCanvas(event.clientX, event.clientY);
    var _x = pos.x;
    var _y = pos.y;
    this.child.forEach(function (item) {
      if (!self.bubbling) {
        if (item.hasPoint(_x, _y)) {
          self.bubbling = item.bubbling;
          typeof item.eventClick === 'function' && item.eventClick(pos, self.eventCallback);
        }
      }
    });
    this.bubbling = false;
  }
  cee.Container.prototype._getPosToCanvas = function (x, y) {
    var box = this.canvas.getBoundingClientRect();
    return {
      x: x - box.left,
      y: y - box.top
    }
  }

  /*
  * shape- rect | circle | polygon
  **/
  cee.Rect = function (x, y, width, height, bub) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bubbling = !!bub;
  }
  cee.Rect.prototype.hasPoint = function (x, y) {
    var _x = this.x;
    var _y = this.y;
    var _w = this.width;
    var _h = this.height;
    if (_x < x && _x + _w > x && _y < y && _y + _h > y) {
      return true;
    }
    return false;
  }
  cee.Rect.prototype.draw = function () {
    var ctx = this.context;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
  cee.Rect.prototype.eventClick = function (position, cb) {
    var msg = `click rect in x - ${position.x} y - ${position.y}`;
    cb && cb(msg)
  }

  cee.Circle = function (x, y, r, bub) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.bubbling = !!bub;
  }
  cee.Circle.prototype.draw = function () {
    var ctx = this.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, 0);
    ctx.closePath();
    ctx.stroke();
  }
  cee.Circle.prototype.hasPoint = function (x, y) {
    var distance = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) - Math.pow(this.r, 2);
    if (distance < 0) {
      return true
    }
    return false
  }
  cee.Circle.prototype.eventClick = function (position, cb) {
    var msg = `click circle in x - ${position.x} y - ${position.y}`;
    cb && cb(msg)
  }

  cee.Polygon = function (points, bub) {
    this.points = points || [];
    this.bubbling = !!bub;
  }
  cee.Polygon.prototype.draw = function () {
    var ctx = this.context;
    var points = this.points;
    if (points.length < 2) {
      console.log('绘制多边形至少需要2个点');
      return;
    }
    ctx.beginPath();
    ctx.moveTo(points)
    for (var i = 0; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.stroke();
  }
  cee.Polygon.prototype.hasPoint = function (x, y) {
    var ctx = this.context;
    var points = this.points;
    if (points.length < 2) {
      console.log('绘制多边形至少需要2个点');
      return;
    }
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(points)
    for (var i = 0; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.restore();
    ctx.isPoint
  }

}())