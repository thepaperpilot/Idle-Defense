import React from 'react'
import './currency.css'

export default props => {
	const {name, amount} = props
	return <div className={`currency currency-${name}`}>
		<span>{amount}</span>
		<img src={`images/${name}.png`} alt={name} title={name} />
	</div>
}
