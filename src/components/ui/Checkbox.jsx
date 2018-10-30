import React, {Component} from 'react'
import './fields.css'
import './checkbox.css'

class Checkbox extends Component {
    constructor(props) {
        super(props)

        this.id = Checkbox.id++
    }

    render() {
        return (
            <div className="field">
                <input
                    id={`checkbox-${this.id}`}
                    type="checkbox"
                    checked={!!this.props.value}
                    onChange={e => this.props.onChange(e.target.checked)}
                    disabled={this.props.disabled} />
                <label htmlFor={`checkbox-${this.id}`}>{this.props.title}</label>
            </div>
        )
    }
}

Checkbox.id = 0

export default Checkbox
