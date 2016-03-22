'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ApposActionCreators from '../actions/appos';
import { Button, Modal } from 'react-bootstrap';

import Select from 'react-select';

require('react-select/less/default.less');

class AppoModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true, 
                   id:         0,
                   date:       '', 
                   pet_id:     0, 
                   owner_id:   0,
                   reminder:   false,
                   reason:     '', 
                   doctor_id:  0,
                   active:     true,
                   owner_name: '',
                   pet_name:   '',
                   doc_name:   '',
                   owner_options: [ { value: 'one', label: 'One' },  { value: 'two', label: 'Two' }]  
             }
  }
/**
  * Loads default data
  **/
  componentDidMount() {
    let action = ApposActionCreators.getAppo(this.props.routeParams.id);
    this.props.dispatch(action);
  }
  
  componentWillReceiveProps(nextProps) {
    if ( nextProps.oneAppo.owner_id  !=  this.state.owner_id ) {
      console.log('WWWW  NOT THE SAME nextPros  >>' + JSON.stringify(nextProps.oneAppo));
      console.log('WWWW  NOT THE SAME thisProps  >>' + JSON.stringify(this.props.oneAppo));
      let action = ApposActionCreators.getAppo(this.props.routeParams.id);
      this.props.dispatch(action);  // thunk middleware dispatch
      this.setState({
                   id:        this.props.oneAppo.id,
                   date:      this.props.oneAppo.date, 
                   pet_id:    this.props.oneAppo.pet_id, 
                   owner_id:  this.props.oneAppo.owner_id, 
                   reminder:  this.props.oneAppo.reminder,
                   reason:    this.props.oneAppo.reason, 
                   doctor_id: this.props.oneAppo.doctor_id,
                   active:    this.props.oneAppo.active,
                   owner_name:this.props.oneAppo.owner_name,
                   pet_name:  this.props.oneAppo.pet_name,
                   doc_name:  this.props.oneAppo.doc_name
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
    let action = ApposActionCreators.updateAppo(fields);
    this.props.dispatch(action);  // thunk middlew

    browserHistory.push('/appointments')
    // this.props.dispatch(createAppo);
    console.log( ">>>>>> Sending data >>>>>>> " + JSON.stringify(fields));
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
             <Select name="owners" value="one" options={this.state.owner_options} onChange={console.log('owner_id')} />
             <label htmlFor="pet_name">Kosename (haustier):</label>
             <input className="form-control" name="pet_name" value={this.state.pet_name} onChange={this.handleChange.bind(this, 'pet_name')} />
             <label htmlFor="doc_name">Doc:</label>
             <input className="form-control" name="doc_name" value={this.state.doc_name} onChange={this.handleChange.bind(this, 'doc_name')} />
             <label htmlFor="reason">Vernunft:</label>
             <input className="form-control" name="reason" value={this.state.reason} onChange={this.handleChange.bind(this, 'reason')} />
             <label htmlFor="date">Datum:</label>
             <input className="form-control" id="date" name="date" value={this.state.date} onChange={this.handleChange.bind(this, 'date')} />
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

AppoModalComponent.propTypes = {
    oneAppo: PropTypes.any,
    dispatch: PropTypes.func.isRequired
};

AppoModalComponent.defaultProps = {
    oneAppo: {}
};

function mapStateToProps(state) {
  // console.log('state.rootReducer.appointments_rdcer.inhaber >>' +  state.rootReducer.appointments_rdcer.inhaber);
  return {
      oneAppo: state.rootReducer.appo_rdcer.oneAppo
  }
};

// binding React-Redux
export default connect(mapStateToProps)(AppoModalComponent);

