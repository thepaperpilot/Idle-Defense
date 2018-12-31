import React from 'react'
import Image from './../images/Image'
import './currency.css'

export default props => {
	const {name, amount} = props
	return <div className={`currency currency-${name}`}>
		<span>{amount}</span>
		<Image image={name} alt={name} />
	</div>
}
