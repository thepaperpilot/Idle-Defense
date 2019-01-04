import SVGGraphics from 'pixi-vector-graphics'
import { Container } from 'pixi.js'
const Tilesheet = require('./drawing.svg')

const waiting = []
let tiles = null

function loadTile({ instance, props }) {
	const g = new SVGGraphics(tiles[props.texture])
	instance.addChild(g)
	g.x = g.y = -16
	g.scale.x = g.scale.y = .32
	instance.interactive = false
	instance.hitArea = g.getBounds()
}

function parseNode(xml) {
	if (xml.id) {
		this[xml.id] = xml
	}
	Array.from(xml.children || xml.childNodes || []).forEach(parseNode, this)
}

// Load our tilesheet
fetch(Tilesheet)
	.then(response => response.text())
	.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
	.then(xml => {
		// are you ready to see some magic?
		tiles = {}
		// Let's make that object "this" in the the parseNode function
		const boundParseNode = parseNode.bind(tiles)
		// And go through our xml looking for ids and placing them onto "this"
		boundParseNode(xml)
		// now tiles is the dictionary we were looking for
		// so now we can load all the tiles who were waiting on us to load the tilesheet
		waiting.forEach(loadTile)
	})

export default props => {
	const instance = new Container()
	instance.props = props

	// Load immediately if our tilesheet has been loaded
	if (tiles) {
		loadTile({ instance, props })
	} else {
		// Otherwise tell the tilesheet loader we're waiting
		waiting.push({ instance, props })
	}

	return instance
}
