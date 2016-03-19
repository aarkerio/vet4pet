'use strict';

import React, { PropTypes, Component } from 'react';

// var DateTimePicker = ReactWidgets.DateTimePicker;
// var DateTimePicker = require('react-widgets/lib/DateTimePicker');

//import DateTimePicker from 'ReactWidgets.DateTimePicker';

class AppoFormComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: true,
                   ffid: this.props.routeParams.id,
                   ffowner:   '',
                   ffdate:    '',
                   ffpetname: '',
                   ffreason:  '',
                   ffdocname: '',
                   ffreminder: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    cdate     = this.state.date;
    cpet      = this.state.pet;
    cowner    = this.refs.fieldDate.state.owner;
    cdoctor   = this.state.doctor;
    creminder = this.state.reminder;
    creason   = this.state.reason;
    data_r    = { date: cdate, reminder: creminder, owner: cowner, pet: cpet, doctor: cdoctor, reason: creason };

    // this.props.dispatch(createAppo);
    console.log( ">>>>>> Sending data >>>>>>> " + JSON.stringify(data_r));
  }

  handleChange(name, event) {
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  handleClick(event) {
    let newvalue = this.state.ffreminder == true ? false : true;
    this.setState({ffreminder: newvalue});
  }


  render () {
    return (
           <form onSubmit={this.handleSubmit}>
             //<DataListComponent ref="fieldDate" />,
             // <DateTimePicker onChange={this.handleDateChange} />
             <label htmlFor="owner">Eigentümer:  </label>
             <input className="form-control" placeholder="Owner" name="owner" value={this.state.ffowner} onChange={this.handleChange.bind(this, 'ffowner')} />
             <label htmlFor="petname">Kosename (haustier):</label>
                <input className="form-control" name="petname" value={this.state.ffpetname} onChange={this.handleChange.bind(this, 'ffpetname')} />
                <label htmlFor="docname">Doc:</label>
                <input className="form-control" name="docname" value={this.state.ffdocname} onChange={this.handleChange.bind(this, 'ffdocname')} />
                <label htmlFor="reason">Vernunft:</label>
                <input className="form-control" name="reason" value={this.state.ffreason} onChange={this.handleChange.bind(this, 'ffreason')} />
                <label htmlFor="date">Datum:</label>
                <input className="form-control" id="date" name="date" value={this.state.ffdate} onChange={this.handleChange.bind(this, 'ffdate')} />
                <label htmlFor="reminder">Erinner:</label>
                <input type="checkbox" name="reminder" checked={this.state.ffreminder} onClick={this.handleClick.bind(this, 'ffreminder')} />
            </form>
      )
  }
};

AppoFormComponent.propTypes = {
    oneAppo: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
};

AppoFormComponent.defaultProps = {
    oneAppo: {}
};

function mapStateToProps(state) {
  // console.log('state.rootReducer.appointments_rdcer.inhaber >>' +  state.rootReducer.appointments_rdcer.inhaber);
  return {
      oneAppo: state.rootReducer.appo_rdcer.oneAppo
  }
};

// binding React-Redux
export default connect(mapStateToProps)(AppoFormComponent);


