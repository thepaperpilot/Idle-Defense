import EntityBase from './../map/EntityBase'

const names = {
	normal: [
		'James',
		'George',
		'David',
		'John',
		'Richard',
		'Robert',
		'Michael',
		'William',
		'Thomas',
		'Donald',
		'Brian',
		'Jeff',
		'Jason',
		'Edward',
		'Mark',
		'Joseph',
		'Charles',
		'Paul',
		'Steven',
		'Kevin',
		'Anthony',
		'Kenneth',
		'Ronald',
		'Christopher',
		'Daniel',
		'Eevee',
		'Flint'
	],
	fast: [
		'Dash',
		'Bolt',
		'Apce',
		'Boaz',
		'Arnan',
		'Celerino',
		'Hayao',
		'Javas',
		'Chapal',
		'Flash',
		'Ettore',
		'Capala',
		'Recene',
		'Sufjan',
		'Javin',
		'Teji',
		'Tez',
		'Usain',
		'Ryker',
		'Kohana',
		'Uday',
		'Raghu',
		'Sherwin',
		'Skeet',
		'Eimar',
		'Remus',
		'Swift',
		'Phelps',
		'Asuga',
		'Blitz',
		'Achira',
		'Fleta',
		'Sarama',
		'Ajia',
		'Bo',
		'Diana',
		'Gijima',
		'Daytona',
		'Atira',
		'Min',
		'Dahy',
		'Mikil',
		'Maira',
		'Saya',
		'Celerina',
		'Presta',
		'Tvarika',
		'Ranhita',
		'Laghu',
		'Veyron',
		'Mahira',
		'Spritz',
		'Xun',
		'Tadita',
		'Tuwawi',
		'Jet',
		'Sonic',
		'Comet',
		'Turbo',
		'Wile E',
		'Tails',
		'Goku',
		'Kirby',
		'McQueen',
		'Fox',
		'Naruto'
	]
}

class Enemy extends EntityBase {
	constructor({type, path, health, speed, width, tileSize, dispatch, ...props}) {
		super(props)
		this.props = { path, health, speed, width, tileSize, dispatch }
		this.props.type = `${type} Enemy`
		this.props.name = names[type][Math.floor(Math.random() * names[type].length)]

		// Easter eggs!
		if (Math.random() <= .01)
			this.sprite.rotation = 3 * Math.PI / 2
		if (Math.random() <= .025)
			this.sprite.rotation = Math.PI

		this.position = 0
		this.interpolation = 0
		this.current = this.getCoords(this.props.path[this.position])
		this.target = this.getCoords(this.props.path[this.position + 1])

		this.click = this.click.bind(this)
	}

	update(delta, {removeEntity}) {
		super.update(delta)

		if (this.props.health <= 0) {
			// TODO give gold
			removeEntity(this)
			return
		}

		this.interpolation += this.props.speed * delta
		while (this.interpolation > 100) {
			this.position++
			this.interpolation -= 100
			this.current = this.getCoords(this.props.path[this.position])
			this.target = this.getCoords(this.props.path[this.position + 1])
		}
		if (this.position >= this.props.path.length - 1) {
			this.props.dispatch({ type: 'LOSE_LIFE' })
			removeEntity(this)
		}

		const {x, y} = this.updatePosition()
		this.sprite.position.set(x, y)
	}

	updatePosition() {
		const {x: currX, y: currY} = this.current
		const {x: nextX, y: nextY} = this.target
		return {
			x: (currX + (nextX - currX) * this.interpolation / 100) * this.props.tileSize,
			y: (currY + (nextY - currY) * this.interpolation / 100) * this.props.tileSize
		}
	}

	getCoords(index) {
		return {
			x: index % this.props.width + .5,
			y: Math.floor(index / this.props.width) + .5
		}
	}

	damage(damage) {
		this.props.health -= damage
	}
}

export default Enemy
