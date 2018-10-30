import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tab from './Tab'
import Number from './../ui/Number'

class General extends Component {
	constructor(props) {
		super(props)

		this.editMap = this.editMap.bind(this)
		this.printMap = this.printMap.bind(this)
	}

	editMap(key) {
		return value => {
			this.props.dispatch({
				type: 'EDIT_MAP',
				key,
				value
			})
		}
	}

	printMap() {
		this.props.dispatch({ type: 'PRINT_MAP' })
	}

	render() {
		const {width, height} = this.props
		return <Tab title="General" openByDefault>
			<Number title="Columns" value={width} onChange={this.editMap('width')} />
			<Number title="Rows" value={height} onChange={this.editMap('height')} />
			<button onClick={this.printMap}>Print Map</button>
		</Tab>
	}
}

function mapStateToProps(state) {
	return {
		width: state.map.width,
		height: state.map.height
	}
}

export default connect(mapStateToProps)(General)
