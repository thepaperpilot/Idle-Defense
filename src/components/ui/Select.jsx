import React, {Component} from 'react'
import ReactSelect, { components } from 'react-select'
import Image from './../images/Image'
import './select.css'

class Select extends Component {
    constructor(props) {
        super(props)

        this.SingleValue = this.SingleValue.bind(this)
        this.Option = this.Option.bind(this)
    }

    SingleValue({children, ...props}) {
        return <div className="option">
            <Image image={`enemy-${props.data.value}`} alt={props.data.label} />
            <components.SingleValue {...props}>
                {children}
            </components.SingleValue>
        </div>
    }

    Option({children, ...props}) {
        return <div className="option">
            <components.Option {...props}>
                <Image image={`enemy-${props.data.value}`} alt={props.data.label} />
                <div className="option-label">{children}</div>
            </components.Option>
        </div>
    }

    render() {
        return (
            <div className="field">
                <p className="field-title">{this.props.title}</p>
                <ReactSelect
                    //menuIsOpen
                    classNamePrefix="select"
                    components={{
                        SingleValue: this.SingleValue,
                        Option: this.Option
                    }}
                    onChange={e => this.props.onChange(e.value)}
                    options={this.props.options}
                    value={this.props.options.find(o => o.value === this.props.value)} />
            </div>
        )
    }
}

export default Select
