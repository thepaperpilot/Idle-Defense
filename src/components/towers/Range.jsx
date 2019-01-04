import { Graphics } from 'pixi.js'

export default (range, color) => {
	const g = new Graphics()
	g.beginFill(color, .5)
	g.lineStyle(4, color)
	g.drawCircle(0, 0, range)

	return g
}
