import React, { PropTypes, Component } from 'react'

class AppoCell extends Component {
  constructor(props) {
    super(props)

  }
  handleChange(evt) {
        this.props.onChange(evt.target.value);
  }

  render() {
    return <td><input value={this.props.data} onChange={this.handleChange} /></td>
  }
}

AppoCell.propTypes = {
    data: PropTypes.string.isRequired,
    // Will be called with the new value for the cell
    onChange: React.PropTypes.func.isRequired
}

export default AppoCell
