import React, { Component } from 'react'

const TextureCache = window.PIXI.utils.TextureCache

class Image extends Component {
	render() {
		const {image, alt} = this.props

		return <img src={TextureCache[image].baseTexture.imageUrl} alt={alt || image} />
	}
}

export default Image
