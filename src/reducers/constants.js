export default {
	tileSize: 100,
	delay: 25000,
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
			speed: 1,
			image: ['playerRed_walk1', 'playerRed_walk2']
		},
		fast: {
			health: 3,
			speed: 1.5,
			image: ['playerBlue_walk1', 'playerBlue_walk2']
		}
	}
}
