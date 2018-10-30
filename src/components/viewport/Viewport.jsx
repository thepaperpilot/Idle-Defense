import { CustomPIXIComponent } from 'react-pixi-fiber'
import Viewport from 'pixi-viewport'

const TYPE = 'viewport'
const behavior = {
	customDisplayObject: props => {
		const v = new Viewport({
			screenWidth: props.width,
			screenHeight: props.height
		})
			.clamp({ direction: 'all' })
			.drag()
			.pinch()
			.wheel()

		v.off('pointdown', v.down)
		v.off('pointercancel', v.up)
		v.off('pointerout', v.up)
		v.off('rightdown', e => {
			e.data.originalEvent = Object.assign({}, e.data.originalEvent, {
				button: 0
			})
			v.down(e)
		})
		v.on('rightup', v.up)
		v.on('rightclick', () => v.plugins.drag.last = false)

		return v
	},
	customApplyProps: (instance, oldProps, newProps) => {
		const {width, height, worldWidth, worldHeight} = newProps
		instance.resize(width, height, worldWidth, worldHeight)
		instance.clampZoom({ maxWidth: worldWidth, maxHeight: worldHeight })
	}
}

export default CustomPIXIComponent(behavior, TYPE)
