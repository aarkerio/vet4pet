'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ApposActionCreators from '../actions/appos';
import { Button, Modal } from 'react-bootstrap';

// var moment = require('moment');
import Moment from 'moment';
var Globalize = require('globalize');

Globalize.load( 
   require("cldr-data/main/en/ca-gregorian.json"),
   require("cldr-data/main/en/numbers.json")
);

Globalize.locale('en');

var globalizeLocalizer = require('react-widgets/lib/localizers/globalize');
globalizeLocalizer(Globalize);

import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import Select from 'react-select';
require('react-select/less/default.less');
require('react-widgets/dist/css/react-widgets.css');

class AppoFormComponent extends Component {
  constructor(props) {
    super(props);
    let date =  new Date;
    this.state = { showModal:      true,
                   date:           date, 
                   pet_id:         1, 
                   owner_id:       1,
                   reminder:       false,
                   reason:         '', 
                   doctor_id:      1,
                   active:         true,
                   owner_name:     '',
                   pet_name:       '',
                   doc_name:       '',
                   owners_options: [],
                   pets_options:   [],
                   docs_options:   []
             };
  }

/**
  * Loads default data
  **/
  componentDidMount() {
    let action = ApposActionCreators.fulFillForm();
    this.props.dispatch(action);
  }
  
  componentWillReceiveProps(nextProps) {
    // let owners  = typeof nextProps.appo_arrays.owners_options !== typeof undefined ? true : false;
    // if (owners == false)  { return; }   
    if ( JSON.stringify(nextProps.appo_arrays.owners)  !=  JSON.stringify(this.state.owners_options) ) {
      let action = ApposActionCreators.fulFillForm();
      this.props.dispatch(action);
      this.setState({
                   owners_options: nextProps.appo_arrays.owners,
                   docs_options: nextProps.appo_arrays.docs
                 });
    }
  }

/**
 * Send data to new appointment
 **/
  handleSubmit(e) {
    e.preventDefault();
    let fields = { id:        this.state.id,
                   date:      this.state.date, 
                   pet_id:    this.state.pet_id, 
                   owner_id:  this.state.owner_id, 
                   reminder:  this.state.reminder,
                   reason:    this.state.reason, 
                   doctor_id: this.state.doctor_id,
                   active:    this.state.active };
    let action = ApposActionCreators.createAppo(fields);
    this.props.dispatch(action);  // thunk middlew
    console.log( ">>>>>> Sending data >>>>>>> " + JSON.stringify(fields));
    browserHistory.push('/appointments');
  }

  handleChange(name, event) {
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  handleClick(event) {
    let newvalue = this.state.ffreminder == true ? false : true;
    this.setState({reminder: newvalue});
  }

  changeOwner(value) {
    this.setState({owner_id: value['value']});
    let action = ApposActionCreators.getPets(value['value'], true);
    this.props.dispatch(action);
    let self = this;
    setTimeout(function () {
          self.setState({pets_options: self.props.pets_options}), 
          300});
  }

  changePet(value) {
    this.setState({pet_id: value['value']});
  }

  changeDoc(value) {
    this.setState({doctor_id: value['value']});
  }

  changeDate(value) {
    let newDate = new Date(value); 
    this.setState({date: newDate});
  }

  render() {
    let rand = ()=> (Math.floor(Math.random() * 20) - 10);

    const modalStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0, bottom: 0, left: 0, right: 0
    };

    const backdropStyle = {
      ...modalStyle,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5
    };

    const dialogStyle = function() {
      // we use some psuedo random coords so modals
      // don't sit right on top of each other.
      let top = 50 + rand();
      let left = 50 + rand();

      return {
        position: 'absolute',
        width: 400,
        top: top + '%', left: left + '%',
        transform: `translate(-${top}%, -${left}%)`,
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
      };
    };

    return (
        <div id="responsive" className="modal hide fade" tabIndex="-1" >
          <Modal aria-labelledby='modal-label'
            style={modalStyle}
            backdropStyle={backdropStyle}
            show={this.state.showModal}
          >
          <Modal.Header>
             <Modal.Title>Modal Überschrift  </Modal.Title>
          </Modal.Header>
            <Modal.Body>
           <form>        
             <label htmlFor="owner">Eigentümer:  </label>
             <Select name="owners" options={this.state.owners_options} value={this.state.owner_id} onChange={this.changeOwner.bind(this)} />

             <label htmlFor="pet">Kosename (haustier):</label>
				     <Select ref="petSelect" autofocus options={this.state.pets_options} name="selected-pet" value={this.state.pet_id} onChange={this.changePet.bind(this)} searchable={true} />

             <label htmlFor="doc_name">Doc:</label>
             <Select name="docs" options={this.state.docs_options} value={this.state.doctor_id} onChange={this.changeDoc.bind(this)} />

             <label htmlFor="reason">Vernunft:</label>
             <input className="form-control" name="reason" value={this.state.reason} onChange={this.handleChange.bind(this, 'reason')} />

             <label htmlFor="date">Datum:</label>
             <DateTimePicker value={this.state.date} onChange={this.changeDate.bind(this)} />

             <label htmlFor="reminder">Erinner:</label>
             <input type="checkbox" name="reminder" checked={this.state.reminder} onChange={this.handleClick.bind(this, 'reminder')} />
            </form>
            </Modal.Body>
          <Modal.Footer>
             <Button onClick={() => browserHistory.push('/appointments')}>Close</Button>
             <Button bsStyle="primary" onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
};

AppoFormComponent.propTypes = {
    appo_arrays: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
};

AppoFormComponent.defaultProps = {
    appo_arrays: {}
};

function mapStateToProps(state) {
  return {
      appo_arrays: state.rootReducer.appo_rdcer.appo_arrays,
      pets_options: state.rootReducer.appo_rdcer.pets_options
  }
};

// binding React-Redux
export default connect(mapStateToProps)(AppoFormComponent);

