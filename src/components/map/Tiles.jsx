import React, { PureComponent } from 'react'
import Tile from './Tile'

class Tiles extends PureComponent {
	render() {
		const {
			width, height,
			tiles,
			baseTiles,
			tileSize,
			onMouseOver,
			onMouseOut,
			placeTower
		} = this.props
		return <React.Fragment>
			{new Array(width * height).fill(0).map((e, i) =>
				<Tile key={i}
					index={i}
					tile={tiles[i]}
					columns={width}
					baseTiles={baseTiles}
					tileSize={tileSize}
					onMouseOver={onMouseOver}
					onMouseOut={onMouseOut}
					placeTower={placeTower} />)}
		</React.Fragment>
	}
}

export default Tiles
