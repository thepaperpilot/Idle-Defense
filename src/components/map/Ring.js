import { Graphics } from 'pixi.js'

export default () => {
	const g = new Graphics()
	g.beginFill(0xFFFF00, .2)
	g.lineStyle(4, 0xFFFF22, .4)
	g.drawCircle(0, 0, 35)

	return g
}
