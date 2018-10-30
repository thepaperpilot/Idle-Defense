import React from 'react'
import { CustomPIXIComponent } from "react-pixi-fiber"
import SVGGraphics from 'pixi-vector-graphics'
import * as PIXI from 'pixi.js'
const Tilesheet = require('./animations.svg')

const TYPE = "SVGAnimation"

const waiting = []
let tiles = null

function loadTiles({ instance, props }) {
	instance.frames = props.textures.map(texture => {
		const g = new SVGGraphics(tiles[texture])
		g.x = g.y = -32
		g.scale.x = g.scale.y = .64
		return g
	})
	
	instance.interactive = false
	instance.hitArea = instance.frames[0].getBounds()
	instance.addChild(instance.frames[0])
	instance.frame = 0
}

function parseNode(xml) {
	if (xml.id) {
		this[xml.id] = xml
	}
	Array.from(xml.children || xml.childNodes || []).forEach(parseNode, this)
}

function update(delta) {
	if (!this.frames) return

	this.delta += delta
	while (this.delta > this.frameDuration) {
		this.delta -= this.frameDuration
		this.removeChild(this.frames[this.frame])

		this.frame++
		if (this.frame === this.frames.length)
			this.frame = 0

		this.addChild(this.frames[this.frame])
	}
}

// Create a container to store the svg from our spritesheet
const behavior = {
	customDisplayObject: props => {
		const instance = new PIXI.Container()
		instance.delta = 0
		instance.frame = 0
		instance.frameDuration = props.frameDuration || 25

		// Load immediately if our tilesheet has been loaded
		if (tiles) {
			loadTiles({ instance, props })
		} else {
			// Otherwise tell the tilesheet loader we're waiting
			waiting.push({ instance, props })
		}

		return instance
	},
	customDidAttach: instance => {
		PIXI.ticker.shared.add(update, instance)
	},
	customWillDetach: instance => {
		PIXI.ticker.shared.remove(update, instance)
	}
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
		waiting.forEach(loadTiles)
	})

export default CustomPIXIComponent(behavior, TYPE)
