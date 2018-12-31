import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'
import Tile from './Tile'
import Tab from './Tab'
import General from './General'
import Waves from './Waves'
import './sidebar.css'

const tiles = [
	'Bush-1',
	'Bush-2',
	'Bush-3',
	'Bush-4',
	'Bush-5',
	'Rock-1',
	'Rock-2',
	'Rock-3'
]

class EditorBottombar extends Component {
	constructor(props) {
		super(props)

		this.selectTile = this.selectTile.bind(this)
	}

	selectTile(key, image) {
		return () => {
			this.props.dispatch({
				type: 'SELECT_SHOP_TOWER',
				tower: {
					key,
					image
				}
			})
		}
	}

	render() {
		return <div className="sidebar">
			<ScrollArea speed={0.8} vertical={true} horizontal={false}>
				<General />
				<Tab title="Tiles">
					<div className="tiles">
						<Tile image="discRed"
							selectTile={this.selectTile('spawn', 'discRed')}>Spawn</Tile>
						<Tile image="flag"
							selectTile={this.selectTile('base', 'flag')}>Base</Tile>
						<Tile image="walkable-1">Path</Tile>
					</div>
					<hr />
					<Tile>Clear Tile</Tile>
					<div className="tiles">
						{tiles.map((tile, i) =>
							<Tile image={tile} key={i}/>)}
					</div>
				</Tab>
				<Waves />
			</ScrollArea>
		</div>
	}
}

export default connect()(EditorBottombar)
