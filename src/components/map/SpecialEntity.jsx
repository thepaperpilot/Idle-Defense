import EntityBase from './EntityBase'

class SpecialEntity extends EntityBase {
	constructor(props) {
		super(props)

		const {index, columns, tileSize} = this.props
		this.sprite.position.x = ((index % columns) + .5) * tileSize
		this.sprite.position.y = (Math.floor(index / columns) + .5) * tileSize
	}
}

export default SpecialEntity
