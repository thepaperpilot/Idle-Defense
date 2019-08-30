import React, { Component } from 'react'
import * as PIXI from 'pixi.js'

const TextureCache = PIXI.utils.TextureCache

class Image extends Component {
	render() {
		const {image, alt} = this.props

		return <img src={TextureCache[image].baseTexture.imageUrl} alt={alt || image} />
	}
}

export default Image
