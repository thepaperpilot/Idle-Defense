// Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle,
    NineSlicePlane = PIXI.mesh.NineSlicePlane,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text;

// Create some basic objects
var stage = new Container();
stage.interactive = true;
var renderer = autoDetectRenderer(1, 1, {antialias: true});
document.body.appendChild(renderer.view);

// Make the game fit the entire window
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", resize);

// Load images
loader
	.add("assets/towerDefense_tilesheet.json")
	.add("assets/uipack_rpg_sheet.json")
	.add("assets/coin.png")
	.add("assets/diamond.png")
	.load(setup);

var state;
var map;

function setup() {
	map = new Map(map_01);
	stage.addChild(map.container);
	stage.addChild(map.ui.container);
	resize();

	state = play;
	gameLoop();
}

function gameLoop() {
	requestAnimationFrame(gameLoop);

	state();

	renderer.render(stage);
}

function play() {

}

function resize() { 
  renderer.resize(window.innerWidth, window.innerHeight);

  if (!map) return;

  scale = Math.min(window.innerWidth * .8 / (64 * map.width), window.innerHeight * .8 / (64 * map.height));
  map.container.width = map.width * 64 * scale;
  map.container.height = map.height * 64 * scale;
  map.container.x = (window.innerWidth * .8 - map.container.width) / 2;
  map.container.y = (window.innerHeight * .8 - map.container.height) / 2;

  map.ui.resize();
}
