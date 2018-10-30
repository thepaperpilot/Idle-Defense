import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './modal.css'

const modalRoot = document.getElementById('modal-root')

class Modal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: props.openByDefault
		}

		this.el = document.createElement('div')

		this.open = this.open.bind(this)
		this.close = this.close.bind(this)
		this.attemptClose = this.attemptClose.bind(this)
	}

	componentDidMount() {
		modalRoot.appendChild(this.el)
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.el)
	}

	open() {
		this.setState({
			open: true
		})
	}

	close() {
		this.setState({
			open: false
		})
	}

	attemptClose() {
		if (this.props.closable) {
			this.close()
		}
	}

	render() {
		return ReactDOM.createPortal(<div className={this.state.open ? 'modal open' : 'modal'}>
			<div className="modal-backdrop" onClick={this.attemptClose} />
			<div className="modal-content">
				<div className="modal-title">{this.props.title}</div>
				<div className="modal-title-shadow">{this.props.title}</div>
				{this.props.children}
			</div>
		</div>, this.el)
	}
}

export default Modal
