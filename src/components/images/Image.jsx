import React, { Component } from 'react'
import SVG from './SVG'
import bones from './bones.png'
import cross from './cross.png'
import home from './home.png'
import mana from './mana.png'
import tile from './tile.png'
import toolBrush from './toolBrush.png'
import walkable1 from './walkable-1.png'

const textures = {
	bones,
	cross,
	home,
	mana,
	tile,
	toolBrush,
	walkable1
}

class Image extends Component {
	render() {
		const {image, alt, ...props} = this.props

		if (image in SVG) {
			const Svg = SVG[image]
			return <Svg {...props} />
		} else if (image in textures) {
			return <img src={textures[image]} alt={alt || image} title={alt || image} {...props} />
		}

		return null
	}
}

export default Image
