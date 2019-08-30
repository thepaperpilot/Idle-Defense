import * as PIXI from 'pixi.js'
import Ring from './Ring'

const TextureCache = PIXI.utils.TextureCache

const CLICK_RANGE = 2

class Entity {
	constructor({x, y, image, interactive, ...props}) {
		this.pointerdown = this.pointerdown.bind(this)
		this.pointertap = this.pointertap.bind(this)
		this.click = this.click.bind(this)
		this.update = this.update.bind(this)
		this.select = this.select.bind(this)
		this.deselect = this.deselect.bind(this)

		const spriteProps = Object.assign({
			interactive: interactive == null || interactive,
			pointerdown: this.pointerdown,
			pointertap: this.pointertap
		}, props)

		if (Array.isArray(image)) {
			const anim = new PIXI.AnimatedSprite(image.map(t => TextureCache[t]))
			anim.gotoAndPlay(0)
			anim.animationSpeed = .1
			anim.anchor.set(.5)

			this.sprite = new PIXI.Container()
			this.sprite.addChild(anim)
		} else if (image in TextureCache) {
			this.sprite = new PIXI.Sprite(TextureCache[image])
			this.sprite.anchor.set(.5)
		} else {
			console.error('can\'t create sprite', image)
			return null
		}

		Object.assign(this.sprite, spriteProps)
		this.sprite.position.set(x, y)

		this.props = Object.assign({ type: 'Entity' }, props, { x, y })
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
			id: this.props.id
		})
	}

	update() {
		if (this.sprite.update)
			this.sprite.update()
	}

	select() {
		this.sprite.addChild(this.ring = new Ring())
	}

	deselect() {
		if (this.ring)
			this.sprite.removeChild(this.ring)
	}
}

export default Entity
