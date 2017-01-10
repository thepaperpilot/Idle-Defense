var Map = function(map) {
	// TODO if possible it'd be easier to just use "map" (the parameter being given), but with the containers added to the things that need containers.
	this.container = new Container();
	this.ui = new UI();

	this.spawn = map.spawn;
	this.crystal = map.crystal;
	this.width = map.width;
	this.height = map.height;
	
	this.tiles = [];
	for (var i = 0; i < this.height; i++) {
		var row = [];
		for (var j = 0; j < this.width; j++) {
			var tile = new Tile(map.base_tile, this);
			tile.container.x = j * 64;
			tile.container.y = i * 64;
			tile.container.width = tile.container.height = 65;
			this.container.addChild(tile.container);
			row.push(tile);
		}
		this.tiles.push(row);
	}
	for (var i = 0; i < map.tiles.length; i++) {
		var tile = map.tiles[i];
		this.tiles[tile.y][tile.x].update(tile);
	}

	this.waves = [];
	for (var i = 0; i < map.waves.length; i++) {
		this.waves.push(new Wave(map.waves[i]));
	}
}

Map.prototype.tileCoords = function(tile) {
	for (var i = this.tiles.length - 1; i >= 0; i--) {
		for (var j = this.tiles[i].length - 1; j >= 0; j--) {
			if (tile == this.tiles[i][j])
				return {x: j, y: i};
		}
	}
	return null;
}

Map.prototype.closeMenus = function() {
	for (var i = this.tiles.length - 1; i >= 0; i--) {
		for (var j = this.tiles[i].length - 1; j >= 0; j--) {
			if (this.tiles[i][j].tower)
				this.container.removeChild(this.tiles[i][j].tower.menu);
		};
	};
}

Map.prototype.validPosition = function(tile) {
	var position = this.tileCoords(tile);
	if (this.path)
		for (var i = this.path.length - 1; i >= 0; i--) {
			if (this.path[i].x == position.x && this.path[i].y == postion.y)
				return true;
		}
	console.log(this.getPath(position));
	return this.getPath(position).length != 0;
}

Map.prototype.getPath = function(tile) {
	var outerNodes = [], nodes = [];
	outerNodes.push(map.spawn);
	
	while(outerNodes.length) {
		var node = outerNodes.shift();
		
		if (node.x == map.crystal.x && node.y == map.crystal.y) {
			var path = [];
			path.push({x: node.x, y: node.y});
			while(node.parent) {
				path.push({x: node.parent.x, y: node.parent.y});
				node = node.parent;
			}
			return path;
		}

		var neighbors = [];
		if (map.tiles[node.y - 1] && map.tiles[node.y - 1][node.x])
			neighbors.push({x: node.x, y: node.y - 1});
		if (map.tiles[node.y + 1] && map.tiles[node.y + 1][node.x])
			neighbors.push({x: node.x, y: node.y + 1});
		if (map.tiles[node.y] && map.tiles[node.y][node.x - 1])
			neighbors.push({x: node.x - 1, y: node.y});
		if (map.tiles[node.y] && map.tiles[node.y][node.x + 1])
			neighbors.push({x: node.x + 1, y: node.y});

		for (var i = neighbors.length - 1; i >= 0; i--) {
			var neighbor = map.tiles[neighbors[i].y][neighbors[i].x];
			if (!neighbor.tower && neighbor.buildable && (!tile || !(neighbors[i].x == tile.x && neighbors[i].y == tile.y))) {
				var bool = true;
				for (var j = nodes.length - 1; j >= 0; j--) {
					if (nodes[j].x == neighbors[i].x && nodes[j].y == neighbors[i].y)
						bool = false;
				}
				if (bool) {
					outerNodes.push({x: neighbors[i].x, y: neighbors[i].y, parent: node});
					nodes.push({x: neighbors[i].x, y: neighbors[i].y});
				}
			}
		}
	}

	return [];
}

var UI = function() {
	var ui = this; // for use in the scrollbar function
	this.container = new Container();
	this.panel = getNinePatch("panel_brown");
	this.panelInset = getNinePatch("panelInset_beigeLight");
	this.panelInset.x = 16;
	this.panelInset.y = 16;
	this.tower1 = getTowerButton(this, "Basic Tower", 10, "tower-1");
	this.tower2 = getTowerButton(this, "Basic Tower v2", 20, "tower-2");
	this.tower3 = getTowerButton(this, "Basic Tower v3", 30, "tower-3");
	this.tower4 = getTowerButton(this, "Basic Tower v4", 40, "tower-4");
	this.scrollbar = new ScrollBar({
		layout: function(height) {
			ui.tower1.resize(height);
			ui.tower2.resize(height);
			ui.tower3.resize(height);
			ui.tower4.resize(height);
			ui.tower1.x = 0;
			ui.tower2.x = 2 + ui.tower1.width;
			ui.tower3.x = 4 + ui.tower1.width + ui.tower2.width;
			ui.tower4.x = 6 + ui.tower1.width + ui.tower2.width + ui.tower3.width;
		}
	});
	this.scrollbar.container.x = 32;
	this.scrollbar.container.y = 32;
	this.container.addChild(this.panel);
	this.container.addChild(this.panelInset);
	this.scrollbar.scrollingContainer.addChild(this.tower1);
	this.scrollbar.scrollingContainer.addChild(this.tower2);
	this.scrollbar.scrollingContainer.addChild(this.tower3);
	this.scrollbar.scrollingContainer.addChild(this.tower4);
	this.container.addChild(this.scrollbar.container);
}

UI.prototype.resize = function() {
	this.container.y = window.innerHeight * .8;
	this.panel.width = window.innerWidth;
	this.panel.height = window.innerHeight * .2;
	this.panelInset.width = window.innerWidth - 32;
	this.panelInset.height = window.innerHeight * .2 - 32;
	this.scrollbar.update(window.innerWidth - 64, window.innerHeight * .2 - 64);
}

function getTowerButton(ui, name, cost, image) {
	var tower = new Container();
	tower.addChild(tower.bg = getNinePatch("buttonLong_grey_pressed"));
	tower.addChild(tower.image = new Sprite(TextureCache[image]));
	tower.addChild(tower.text = new Text((tower.name = name) + "\n" + (this.cost = cost)));
	tower.interactive = true;
	tower.image.x = tower.image.y = 4;
	tower.click = function(mousedata) {
		if (map) map.closeMenus();
		if (ui.tower || ui.tower == this) {
			var height = ui.tower.height;
			ui.tower.bg.texture = renderer.generateTexture(new Sprite(TextureCache["buttonLong_grey_pressed"]));
			ui.tower.resize(height);
		}
		if (ui.tower == this) ui.tower = null;
		else {
			var height = this.height;
			this.bg.texture = renderer.generateTexture(new Sprite(TextureCache["buttonLong_blue_pressed"]));
			this.resize(height);
			ui.tower = this;	
		}
		//renderer.render(tower);
	}
	tower.resize = function(height) {
		this.text.style = {fontSize: Math.max(8, Math.min(24, (height - 8) / 2))};
		this.text.x = height;
		this.text.y = Math.max(4, (height - 8 - this.text.height) / 2);
		this.image.width = this.image.height = Math.max(1, height - 8);
		this.bg.height = height;
		this.bg.width = height + this.text.width + 16;
	}
	return tower;
}

var Tile = function(tile, map) {
	var t = this;
	this.container = new Container();

	this.buildable = tile.buildable;

	for (var i = 0; i < tile.images.length; i++) {
		this.container.addChild(new Sprite(TextureCache[tile.images[i]]));
	}

	this.container.interactive = true;
	var i = 1;
	this.container.click = function (mousedata) {
		if (!map.ui.tower || !t.buildable || t.tower || !map.validPosition(t)) return;

		var tower = new Tower(t);
		if (map.ui.tower == map.ui.tower1) {
			tower.container.addChild(new Sprite(TextureCache["tower-1"]));
		} else if (map.ui.tower == map.ui.tower2) {
			tower.container.addChild(new Sprite(TextureCache["tower-2"]));
		} else if (map.ui.tower == map.ui.tower3) {
			tower.container.addChild(new Sprite(TextureCache["tower-3"]));
		} else if (map.ui.tower == map.ui.tower4) {
			tower.container.addChild(new Sprite(TextureCache["tower-4"]));
		}

		t.addTower(tower);
	}
	this.container.mouseover = function (mousedata) {
		if (!map.ui.tower || !t.buildable || t.tower || !map.validPosition(t)) return;

		if (map.ui.tower == map.ui.tower1) {
			t.sprite_preview = new Sprite(TextureCache["tower-1"]);
		} else if (map.ui.tower == map.ui.tower2) {
			t.sprite_preview = new Sprite(TextureCache["tower-2"]);
		} else if (map.ui.tower == map.ui.tower3) {
			t.sprite_preview = new Sprite(TextureCache["tower-3"]);
		} else if (map.ui.tower == map.ui.tower4) {
			t.sprite_preview = new Sprite(TextureCache["tower-4"]);
		} else return;
		t.sprite_preview.alpha = .5;
		t.container.addChild(t.sprite_preview);
	}
	this.container.mouseout = function (mousedata) {
		if (!t.buildable) return;

		t.container.removeChild(t.sprite_preview);
	}
}

Tile.prototype.update = function(tile) {
	this.buildable = tile.buildable;

	this.container.removeChildren();
	for (var i = 0; i < tile.images.length; i++) {
		this.container.addChild(new Sprite(TextureCache[tile.images[i]]));
	}
}

Tile.prototype.addTower = function(tower) {
	if (this.tower) return;
	this.tower = tower;
	this.container.addChild(tower.container);
}

Tile.prototype.removeTower = function() {
	if (!this.tower) return;
	this.container.removeChild(tower.container);
	this.tower = null;
}

var Wave = function(wave) {
	this.container = new Container();

	this.health = wave.health;
	this.speed = wave.speed;
	this.amount = wave.amount;
	this.gold = wave.gold;
	this.gems = wave.gems;
	this.container.width = 64 * wave.scale;
	this.container.height = 64 * wave.scale;

	for (var i = 0; i < wave.images.length; i++) {
		this.container.addChild(new Sprite(TextureCache[wave.images[i]]));
	}
}

var Tower = function(tile, tower) {
	var tower = this;
	this.container = new Container();
	this.container.interactive = true;

	this.menu = new Container();
	var bg = getNinePatch("panelInset_blue");
	bg.height = 128;
	bg.width = 192;
	this.menu.addChild(bg);
	var upgrade = new Container();
	var upgrade_background = new Sprite(TextureCache["buttonLong_brown_pressed"]);
	var upgrade_image = new Sprite(TextureCache["assets/diamond.png"]);
	upgrade_background.width = 176;
	upgrade_background.height = 52;
	upgrade_image.width = upgrade_image.height = 48;
	upgrade.addChild(upgrade_background);
	upgrade.addChild(upgrade_image);
	upgrade_image.x = upgrade_image.y = 2;
	upgrade.x = upgrade.y = 8;
	this.menu.addChild(upgrade);
	var sell = new Container();
	var sell_background = new Sprite(TextureCache["buttonLong_brown_pressed"]);
	var sell_image = new Sprite(TextureCache["assets/coin.png"]);
	sell_background.width = 176;
	sell_background.height = 52;
	sell_image.width = sell_image.height = 48;
	sell.addChild(sell_background);
	sell.addChild(sell_image);
	sell_image.x = sell_image.y = 2;
	sell.x = 8;
	sell.y = 68;
	this.menu.addChild(sell);

	this.container.click = function(mousedata) {
		if (map.container.children.indexOf(tower.menu) !== -1) {
			map.container.removeChild(tower.menu);
			return;
		}
		map.closeMenus();
		if (map.ui.tower) {
			var height = map.ui.tower.height;
			map.ui.tower.bg.texture = renderer.generateTexture(new Sprite(TextureCache["buttonLong_grey_pressed"]));
			map.ui.tower.resize(height);
			map.ui.tower = null;
		}
		var coords = map.tileCoords(tile);
		if (coords.x == 0) 
			tower.menu.x = tile.container.x;
		else if (coords.x == map.width - 1)
			tower.menu.x = tile.container.x - 128;
		else
			tower.menu.x = tile.container.x - 64;
		if (coords.y > map.height / 2)
			tower.menu.y = tile.container.y - 128;
		else
			tower.menu.y = tile.container.y + 64;
		map.container.addChild(tower.menu);
	}
}
