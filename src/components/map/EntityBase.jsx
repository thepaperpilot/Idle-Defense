import SVGAnimation from './../images/SVGAnimation'
import SVGSprite from './../images/SVGSprite'
import { Sprite, utils } from 'pixi.js'

const CLICK_RANGE = 2

class Entity {
	constructor({x, y, image, interactive, ...props}) {
		const spriteProps = Object.assign({
			interactive: interactive == null || interactive,
			pointerdown: this.pointerdown,
			pointertap: this.pointertap
		}, props)

		if (Array.isArray(image)) {
			spriteProps.textures = image
			this.sprite = SVGAnimation(spriteProps)
			this.sprite.cacheAsBitmap = true
		} else if (image in utils.TextureCache) {
			this.sprite = new Sprite(utils.TextureCache[image])
			this.sprite.anchor.set(.5)
		} else {
			spriteProps.texture = image
			this.sprite = SVGSprite(spriteProps)
			this.sprite.cacheAsBitmap = true
		}

		Object.assign(this.sprite, spriteProps)
		this.sprite.position.set(x, y)

		this.props = props || {}
	}

	pointerdown(e) {
		const {screenX: x, screenY: y} = e.data.originalEvent
		this.start = {x, y}
	}

	pointertap(e) {
		const {screenX, screenY} = e.data.originalEvent
		 if (Math.abs(this.start.x - screenX) <= CLICK_RANGE &&
		 	Math.abs(this.start.y - screenY) <= CLICK_RANGE)
			(this.props.onclick || this.click)(e)
	}

	click() {
		this.props.dispatch({
			type: 'SELECT_ENTITY',
			index: this.props.index
		})
	}

	update() {
		if (this.sprite.update)
			this.sprite.update()
	}

	select() {

	}

	deselect() {

	}
}

export default Entity
