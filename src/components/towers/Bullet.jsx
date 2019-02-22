import Entity from './../map/EntityBase'

class Bullet extends Entity {
	constructor(props) {
		super(props)
		this.props.type = "Bullet"
	}

	update(delta, { entities, removeEntity }) {
		const target = entities.find(e => e.props.id === this.props.target)
		if (!target) {
			removeEntity(this)
			return
		}

		const dy = target.sprite.position.y - this.sprite.position.y
		const dx = target.sprite.position.x - this.sprite.position.x
		const speed = this.props.speed * delta

		if (dx * dx + dy * dy <= speed * speed) {
			target.damage(this.props.damage)
			removeEntity(this)
			return
		}

		// Move towards enemy
		const angle = Math.atan2(dy, dx)
		this.sprite.position.x += speed * Math.cos(angle)
		this.sprite.position.y += speed * Math.sin(angle)
	}
}

export default Bullet
