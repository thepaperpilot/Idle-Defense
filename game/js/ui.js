var elements = {
	"buttonLong_grey": {
		"leftWidth": 44,
		"rightWidth": 94,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonLong_grey_pressed": {
		"leftWidth": 44,
		"rightWidth": 94,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonLong_beige": {
		"leftWidth": 44,
		"rightWidth": 94,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonLong_beige_pressed": {
		"leftWidth": 44,
		"rightWidth": 94,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonLong_blue": {
		"leftWidth": 44,
		"rightWidth": 94,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonLong_blue_pressed": {
		"leftWidth": 44,
		"rightWidth": 94,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonLong_brown": {
		"leftWidth": 44,
		"rightWidth": 94,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonLong_brown_pressed": {
		"leftWidth": 44,
		"rightWidth": 94,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonSquare_grey": {
		"leftWidth": 8,
		"rightWidth": 8,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonSquare_grey_pressed": {
		"leftWidth": 8,
		"rightWidth": 8,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonSquare_beige": {
		"leftWidth": 8,
		"rightWidth": 8,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonSquare_beige_pressed": {
		"leftWidth": 8,
		"rightWidth": 8,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonSquare_blue": {
		"leftWidth": 8,
		"rightWidth": 8,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonSquare_blue_pressed": {
		"leftWidth": 8,
		"rightWidth": 8,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonSquare_brown": {
		"leftWidth": 8,
		"rightWidth": 8,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"buttonSquare_brown_pressed": {
		"leftWidth": 8,
		"rightWidth": 8,
		"topHeight": 17,
		"bottomHeight": 20
	},
	"panelInset_beigeLight": {
		"leftWidth": 49,
		"rightWidth": 29,
		"topHeight": 17,
		"bottomHeight": 22
	},
	"panelInset_beige": {
		"leftWidth": 49,
		"rightWidth": 29,
		"topHeight": 17,
		"bottomHeight": 22
	},
	"panelInset_blue": {
		"leftWidth": 49,
		"rightWidth": 29,
		"topHeight": 17,
		"bottomHeight": 22
	},
	"panelInset_brown": {
		"leftWidth": 49,
		"rightWidth": 29,
		"topHeight": 17,
		"bottomHeight": 22
	},
	"panel_beigeLight": {
		"leftWidth": 21,
		"rightWidth": 52,
		"topHeight": 25,
		"bottomHeight": 32
	},
	"panel_beige": {
		"leftWidth": 21,
		"rightWidth": 52,
		"topHeight": 25,
		"bottomHeight": 32
	},
	"panel_blue": {
		"leftWidth": 21,
		"rightWidth": 52,
		"topHeight": 25,
		"bottomHeight": 32
	},
	"panel_brown": {
		"leftWidth": 21,
		"rightWidth": 52,
		"topHeight": 25,
		"bottomHeight": 32
	}
};

function getNinePatch(string) {
	element = elements[string];
	return new NineSlicePlane(
		// I have to call generate texture on a sprite
		// (in lieue of just passing `TextureCache[string])`) 
		// because otherwise NineSlicePlane uses the base
		// texture, which in this case is the spritesheet
		renderer.generateTexture(new Sprite(TextureCache[string])), 
		element["leftWidth"],
		element["topHeight"],
		element["rightWidth"],
		element["bottomHeight"]);
}

function getScrollbar(color, horizontal) {
	// Colors: Back, Blue, Green, Red, Yellow
	// Back is a background "color"
	var container = new Container();
	if (horizontal) {
		var first = new Sprite(TextureCache["bar" + color + "_horizontalLeft"]);
		var mid = new Sprite(TextureCache["bar" + color + "_horizontalMid"]);
		var last = new Sprite(TextureCache["bar" + color + "_horizontalRight"]);
		mid.x = 9;
		last.x = 27;

	} else {
		var first = new Sprite(TextureCache["bar" + color + "_verticalTop"]);
		var mid = new Sprite(TextureCache["bar" + color + "_verticalMid"]);
		var last = new Sprite(TextureCache["bar" + color + "_verticalBottom"]);
		mid.y = 9;
		last.y = 27;
	}
	container.addChild(first);
	container.addChild(mid);
	container.addChild(last);
	if (horizontal)
		return new NineSlicePlane(renderer.generateTexture(container), 9, 0, 9, 0);
	return new NineSlicePlane(renderer.generateTexture(container), 0, 9, 0, 9);
}

var Slider = function(options) {
	// options = {
	// 	value: 0,
	// 	minValue: 0,
	// 	maxValue: 100,
	// 	vertical: false,
	// 	draggable: false,
	// 	color: "Blue",
	// 	onUpdate: function
	// }
	this.value = options.value || 0;
	this.minValue = options.minValue || 0;
	this.maxValue = options.maxValue || 100;
	this.vertical = options.vertical || false;
	this.onUpdate = options.onUpdate || function() {};
	this.track = getScrollbar("Back", !this.vertical);
	this.handle = getScrollbar(options.color || "Blue", !this.vertical);
	this.handle.slider = this;
	this.container = new Container();
	this.container.addChild(this.track);
	this.container.addChild(this.handle);
	if (options.draggable) {
		this.handle.interactive = true;
		this.handle.mousedown = 
			this.handle.touchstart = 
			this.onDragStart;
		this.handle.mouseup =
			this.handle.mouseupoutside =
			this.handle.touchend =
			this.handle.touchendoutside =
			this.onDragEnd;
		this.handle.mousemove =
			this.handle.touchmove = 
			this.onDragMove;
	}
}

Slider.prototype.update = function() {
	if (this.vertical) {
		this.handle.y = (this.track.height - this.handle.width) * this.value / (this.maxValue - this.minValue);
	} else {
		this.handle.x = (this.track.width - this.handle.width) * this.value / (this.maxValue - this.minValue);
	}
	this.onUpdate();
}

Slider.prototype.setValue = function(value) {
	this.value = Math.max(Math.min(value, this.maxValue), this.minValue);
	this.update();
}

Slider.prototype.onDragStart = function(event) {
	this.data = event.data;
	this.lastposition = this.data.getLocalPosition(this.slider.container);
	this.alpha = 0.5;
	this.dragging = true;
}

Slider.prototype.onDragEnd = function() {
	this.data = null;
	this.alpha = 1;
	this.dragging = false;
}

Slider.prototype.onDragMove = function() {
	if (this.dragging && (this.slider.vertical && this.slider.track.height != this.slider.handle.height || !this.slider.vertical && this.slider.track.width != this.slider.handle.width)) {
		if (this.slider.vertical) {
			this.slider.setValue(this.slider.value +
				(this.slider.maxValue - this.slider.minValue) * 
				(this.data.getLocalPosition(this.slider.container).y - this.lastposition.y) / 
				(this.slider.track.height - this.slider.handle.height));
			this.lastposition = this.data.getLocalPosition(this.slider.container);
		} else {
			this.slider.setValue(this.slider.value + 
				(this.slider.maxValue - this.slider.minValue) * 
				(this.data.getLocalPosition(this.slider.container).x - this.lastposition.x) / 
				(this.slider.track.width - this.slider.handle.width));
			this.lastposition = this.data.getLocalPosition(this.slider.container);
		}
	}
}

var ScrollBar = function(options) {
	// options = {
	// 	vertical: false,
	// 	scrollingContainer: new Container(),
	// 	layout: function
	// }
	var scrollbar = this; // for use in the slider onUpdate functuon
	this.vertical = options.vertical || false;
	this.slider = new Slider({vertical: options.vertical, draggable: true, onUpdate: function() {
		scrollbar.scrollingContainer.x = 
			(scrollbar.scrollingContainer.width - scrollbar.mask.width) * 
			(this.minValue - this.value) / 
			(this.maxValue - this.minValue);
	}});
	this.scrollingContainer = options.scrollingContainer || new Container();
	var g = new Graphics();
	g.beginFill(0xFFFFFF);
	g.drawRect(0, 0, 1, 1);
	this.mask = new Sprite(g.generateTexture());
	this.layout = options.layout || function(size) {return size;};
	this.container = new Container();
	this.container.addChild(this.mask);
	this.container.addChild(this.scrollingContainer);
	this.container.addChild(this.slider.container);
	this.scrollingContainer.mask = this.mask;
	if (this.vertical) {
		this.slider.y = 3;
	} else {
		this.slider.x = 3;
	}
}

ScrollBar.prototype.update = function(width, height) {
	if (this.vertical) {
		this.mask.width = width;
		this.height = Math.max(0, height - 6);
		this.layout(Math.max(0, width - 24));
		this.slider.container.x = width - 21;
		this.slider.track.height = height - 6;
		this.slider.handle.height = Math.max(18, (height - 6) * Math.min(1, height / this.scrollingContainer.height));
		this.slider.update();
		if (this.slider.track.height == this.slider.handle.height) {
			this.scrollingContainer.y = 0;
		}
	} else {
		this.mask.width = Math.max(0, width - 6);
		this.mask.height = height;
		this.layout(Math.max(0, height - 24));
		this.slider.container.y = height - 21;
		this.slider.track.width = width - 6;
		this.slider.handle.width = Math.max(18, (width - 6) * Math.min(1, width / this.scrollingContainer.width));
		this.slider.update();
		if (this.slider.track.width == this.slider.handle.width) {
			this.scrollingContainer.x = 0;
		}
	}
}
