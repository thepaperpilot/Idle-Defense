import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-pixi-fiber'
import Range from './Range'
import Entity from './../map/EntityBase'

class Tower extends Component {
	constructor(props) {
		super(props)

		this.state = {
			target: null
		}

		this.update = this.update.bind(this)
	}

	update() {

	}

	componentWillReceiveProps(newProps) {
		const target = newProps.entities.find(e => e.id === this.state.target)
		if (target) {
			const dx = target.x - this.props.x
			const dy = target.y - this.props.y
			if (dx * dx + dy * dy <= this.props.range * this.props.range)
				return
		}

		this.setState({
			target: newProps.entities.find(e => {
				if (e.type !== 'enemy') return
				const dx = e.x - this.props.x
				const dy = e.y - this.props.y
				return dx * dx + dy * dy <= this.props.range * this.props.range
			}).id
		})
	}

	render() {
		const {x, y, image, index, range} = this.props

		return <Container x={x} y={y}>
			<Entity image={image} index={index} />
			{this.props.isSelected && <Range range={range} color={0xFFFFFF} />}
		</Container>
	}
}

function mapStateToProps(state, props) {
	return {
		isSelected: state.map.isSelecting && state.map.selected === props.index
	}
}

export default connect(mapStateToProps, null, null, { withRef: true })(Tower)
