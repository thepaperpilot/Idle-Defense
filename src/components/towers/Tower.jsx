import Entity from './../map/EntityBase'
import * as PIXI from 'pixi.js'
import Range from './Range'
import Bullet from './Bullet'

const TextureCache = PIXI.utils.TextureCache

class Tower extends Entity {
	constructor(props) {
		super(props)
		this.props.type = "Tower"

		const container = new PIXI.Container()
		container.addChild(this.sprite)
		const {x, y} = this.sprite.position
		container.position.set(x, y)

		container.addChild(this.barrel = new PIXI.Sprite(TextureCache['plantDark_1']))
		this.barrel.anchor.set(.5, .8)
		this.barrel.position.set(2, 0)
		
		this.sprite.position.set(0, 0)
		this.sprite = container

		this.target = null
		this.cooldown = 0
	}

	update(delta, {entities, addEntities}) {
		this.cooldown -= delta
		const target = entities.find(e => e.props.id === this.target)
		if (target) {
			const dx = target.sprite.position.x - this.sprite.position.x
			const dy = target.sprite.position.y - this.sprite.position.y
			if (dx * dx + dy * dy <= this.props.range * this.props.range) {
				const targetRotation = Math.atan2(dy, dx) + Math.PI / 2
				const rotDelta = 
					Math.PI - Math.abs(Math.abs(this.barrel.rotation - targetRotation) - Math.PI)
				if (rotDelta < this.props.rotSpeed * delta) {
					this.barrel.rotation = targetRotation
					while (this.cooldown <= 0) {
						this.cooldown += this.props.fireInterval
						addEntities(new Bullet({
							x: this.sprite.position.x,
							y: this.sprite.position.y,
							target: this.target,
							damage: this.props.damage,
							speed: 12,
							image: 'blueGem'
						}))
					}
				} else if ((this.barrel.rotation < targetRotation &&
					targetRotation - this.barrel.rotation <= Math.PI) ||
					(this.barrel.rotation > targetRotation &&
					this.barrel.rotation - targetRotation > Math.PI))
					this.barrel.rotation += this.props.rotSpeed * delta
				else
					this.barrel.rotation -= this.props.rotSpeed * delta
			}
		}

		const newTarget = entities.find(e => {
			if (!e.props.type || !e.props.type.includes('Enemy')) return null
			const dx = e.sprite.position.x - this.sprite.position.x
			const dy = e.sprite.position.y - this.sprite.position.y
			return dx * dx + dy * dy <= this.props.range * this.props.range
		})

		if (newTarget && newTarget.props.id !== this.target) {
			this.target = newTarget.props.id
			this.cooldown = Math.max(this.cooldown, 0)
		}
	}

	select() {
		this.sprite.addChild(this.range = new Range(this.props.range, 0xFFFFFF))
	}

	deselect() {
		if (this.range)
			this.sprite.removeChild(this.range)
	}
}

export default Tower
