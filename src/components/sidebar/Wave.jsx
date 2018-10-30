import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import Image from './../images/Image'
import './wave.css'

class Wave extends Component {
	componentWillReceiveProps(newProps) {
		if (!this.props.isOver && newProps.isOver) {
			const dragIndex = newProps.dragItem.index
			const hoverIndex = newProps.index

			if (dragIndex === hoverIndex)
				return

			this.props.moveWave(dragIndex, hoverIndex)
			newProps.dragItem.index = hoverIndex
		}
	}

	render() {
		const {
			wave,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
		const { enemy, amount, boundToNextWave} = wave

		return (
			connectDragSource &&
			connectDropTarget &&
			connectDragSource(
				connectDropTarget(<div className={isDragging ? 'wave outlined' : 'wave'}
					onClick={this.props.openWave} >
					<div className="wave-amount">{amount}</div>
					<div className="wave-icon">
						<Image image={`enemy-${enemy}`} alt={enemy} />
					</div>
					{boundToNextWave && <div className="wave-bound" />}
				</div>)
			)
		)
	}
}

const waveSource = {
	beginDrag(props, monitor) {
		return {
			index: props.index
		}
	}
}

const waveTarget = {}

function collectTarget(connect, monitor) {
	const isOver = monitor.isOver({ shallow: true })
	return {
		connectDropTarget: connect.dropTarget(),
		isOver,
		dragItem: isOver && monitor.getItem()
	}
}

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

export default DropTarget('wave', waveTarget, collectTarget)
	(DragSource('wave', waveSource, collectSource)(Wave))
