export default {
	tileSize: 50,
	initialDelay: 20000,
	waveDelay: 50000,
	enemyDelay: 2000,
	specialEntities: ['base', 'spawn'],
	baseTiles: {
		default: {
			buildable: true,
			walkable: false,
			images: [
				'tile'
			]
		},
		walkable: {
			buildable: true,
			walkable: true,
			images: [
				'walkable-1'
			]
		}
	},
	enemies: {
		normal: {
			health: 5,
			speed: 1.5,
			image: ['enemy-normal-1', 'enemy-normal-2']
		},
		fast: {
			health: 3,
			speed: 2.5,
			image: ['enemy-fast-1', 'enemy-fast-2']
		}
	}
}
