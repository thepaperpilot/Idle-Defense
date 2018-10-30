import React, { Component } from 'react'

const Tilesheet = require('./drawing.svg')

const TextureCache = window.PIXI.utils.TextureCache

class Image extends Component {
	render() {
		const {image, alt} = this.props

		if (image in TextureCache) {
			return <img src={TextureCache[image].baseTexture.imageUrl} alt={alt || image} />
		} else {
			return <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<use xlinkHref={`${Tilesheet}#${image}`} />
			</svg>
		}
	}
}

export default Image
