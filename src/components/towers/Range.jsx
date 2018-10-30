import { CustomPIXIComponent } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

const TYPE = 'range'
const behavior = {
	customDisplayObject: props => new PIXI.Graphics(),
	customApplyProps: (instance, oldProps, newProps) => {
		const {range, color} = newProps

		instance.clear()
		instance.beginFill(color, .5)
		instance.lineStyle(4, color)

		instance.drawCircle(0, 0, range)
	}
}

export default CustomPIXIComponent(behavior, TYPE)
