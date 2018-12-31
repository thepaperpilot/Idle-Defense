import React, { Component } from 'react'
import SpecialEntity from './SpecialEntity'

class Base extends Component {
	render() {
		const {index, ...props} = this.props
		return <SpecialEntity index={index} image="Flag" {...props} />
	}
}

export default Base
