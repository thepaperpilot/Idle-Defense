import React, { Component } from 'react'
import SpecialEntity from './SpecialEntity'

class Spawn extends Component {
	render() {
		const {index, ...props} = this.props
		return <SpecialEntity index={index} image="discRed" {...props} />
	}
}

export default Spawn