import React, { Component } from 'react'
import Tower from './../towers/Tower'
import Enemy from './../enemies/Enemy'

class Entities extends Component {
	constructor(props) {
		super(props)

		this.entities = new Array(props.entities).fill(0).map(() => React.createRef())
	}

	componentWillReceiveProps(newProps) {
		// Make sure our array of entity refs is the right size
		let diff = newProps.entities.length - this.props.entities.length
		if (diff > 0) {
			// Add diff new refs
			this.entities = [...this.entities, ...new Array(diff).fill(0).map(() => React.createRef())]
		} else if (diff < 0) {
			// Remove -diff refs
			this.entities = this.entities.slice(0, diff)
		}
	}

	render() {
		return <React.Fragment>
			{this.props.entities.map((entity, i) => {
				const props = {
					key: i,
					index: i,
					ref: this.entities[i],
					...entity
				}

				switch (entity.type) {
				case 'tower': return <Tower {...props} entities={this.props.entities} />
				case 'enemy': return <Enemy {...props} />
				default: return null
				}
			})}
		</React.Fragment>
	}
}

export default Entities
