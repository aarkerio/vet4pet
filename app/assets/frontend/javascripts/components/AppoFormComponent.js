'use strict';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as ApposActionCreators from '../actions/appos';
// var DateTimePicker = ReactWidgets.DateTimePicker;
// var DateTimePicker = require();

import DateTimePicker from 'react-widgets/lib/DateTimePicker';

class AppoFormComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
                   ffid:       0,
                   ffowner_id: 0,
                   ffdate:     '',
                   ffpet_id:   '',
                   ffreason:   '',
                   ffdoc_id:   0,
                   ffreminder: false 
                 };
   }

   handleSubmit(e) {
    e.preventDefault();
    cid        = this.state.ffid;
    cdate      = this.state.ffdate;
    cpetname   = this.state.ffpetname;
    cowner     = this.state.ffowner;
    cdocname   = this.state.ffdoname;
    creminder  = this.state.ffreminder;
    creason    = this.state.ffreason;
    data_r    = { id: cid, date: cdate, reminder: creminder, owner: cowner, petname: cpetname, docname: cdocname, reason: creason };
    //let action = ApposActionCreators.sendAppo(data_r);
    this.props.dispatch(action);  // thunk middlew
    // this.props.dispatch(createAppo);
    // console.log( ">>>>>> Sending data >>>>>>> " + JSON.stringify(data_r));
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
      // <DataListComponent ref="fieldDate" />,
      // <DateTimePicker onChange={this.handleDateChange} />
    return (
           <form onSubmit={this.handleSubmit}>        
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
                <input type="checkbox" name="reminder" checked={this.state.ffreminder} onChange={this.handleClick.bind(this, 'ffreminder')} />
            </form>
      )
  }
};

AppoFormComponent.propTypes = {
    onEhash: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
};

AppoFormComponent.defaultProps = {
    onEhash: {}
};


export default connect()(AppoFormComponent);

