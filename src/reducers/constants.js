export default {
	tileSize: 100,
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
				'walkable1'
			]
		}
	},
	enemies: {
		normal: {
			health: 5,
			speed: 1.5,
			image: ['EnemyNormal1', 'EnemyNormal2']
		},
		fast: {
			health: 3,
			speed: 2.5,
			image: ['EnemyFast1', 'EnemyFast2']
		}
	}
}
