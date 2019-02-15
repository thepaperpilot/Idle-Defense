import { Sprite, Graphics, Container } from 'pixi.js'
import Ring from './Ring'

const TextureCache = window.PIXI.utils.TextureCache
const AnimatedSprite = window.PIXI.extras.AnimatedSprite

const CLICK_RANGE = 2

const graphics = {
	'enemy-fast-1': () => {
		const g = new Graphics()
		g.lineStyle(2, 0x00FF00, 1)
		g.beginFill(0xFF0000, 1)
		g.drawCircle(0, 0, 100)
		g.endFill()
		return g
	},
	'enemy-fast-2': () => {
		const g = new Graphics()
		g.lineStyle(2, 0x00FF00, 1)
		g.beginFill(0xFF0000, 1)
		g.drawCircle(0, 0, 120)
		g.endFill()
		return g
	}
}

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
			const anim = new AnimatedSprite(image.map(t => TextureCache[t]))
			anim.gotoAndPlay(0)
			anim.animationSpeed = .1
			anim.anchor.set(.5)

			this.sprite = new Container()
			this.sprite.addChild(anim)
		} else if (image in graphics) {
			this.sprite = graphics[image]
		} else if (image in TextureCache) {
			this.sprite = new Sprite(TextureCache[image])
			this.sprite.anchor.set(.5)
		} else {
			console.error('can\'t create sprite', image)
			return null
		}

		Object.assign(this.sprite, spriteProps)
		this.sprite.position.set(x, y)

		this.props = Object.assign(props || {}, { x, y })
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
		console.log(this.sprite)
		this.sprite.addChild(this.ring = new Ring())
	}

	deselect() {
		if (this.ring)
			this.sprite.removeChild(this.ring)
	}
}

export default Entity
