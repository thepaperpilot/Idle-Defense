import Entity from './../map/EntityBase'
import {Container} from 'pixi.js'
import Range from './Range'

class Tower extends Entity {
	constructor(props) {
		super(props)
		this.props.type = "Tower"

		const container = new Container()
		container.addChild(this.sprite)
		const {x, y} = this.sprite.position
		container.position.set(x, y)
		this.sprite.position.set(0, 0)
		this.sprite = container
		this.target = null
	}

	update(delta, {entities, addEntity}) {
		const target = entities.find(e => e.id === this.target)
		if (target) {
			const dx = target.x - this.props.x
			const dy = target.y - this.props.y
			if (dx * dx + dy * dy <= this.props.range * this.props.range)
				return
		}

		this.target = entities.find(e => {
			if (e.type !== 'enemy') return null
			const dx = e.x - this.props.x
			const dy = e.y - this.props.y
			return dx * dx + dy * dy <= this.props.range * this.props.range
		})
		if (this.target) this.target = this.target.id
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
