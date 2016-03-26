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
    this.state = { showModal:      true, 
                   id:             0,
                   date:           '', 
                   pet_id:         0, 
                   owner_id:       0,
                   reminder:       false,
                   reason:         '', 
                   doctor_id:      0,
                   active:         true,
                   owner_name:     '',
                   pet_name:       '',
                   doc_name:       '',
                   owners_options: [],
                   pets_options:   [],
                   docs_options:   []
             }
  }

/**
  * Loads default data
  **/
  componentDidMount() {
    let action = ApposActionCreators.updateForm(this.props.routeParams.id);
    this.props.dispatch(action);
  }
  
  componentWillReceiveProps(nextProps) {
    if ( nextProps.oneAppo.owner_id  !=  this.state.owner_id ) {
      let action1 = ApposActionCreators.getAppo(this.props.routeParams.id);
      this.props.dispatch(action1);  // thunk middleware dispatch

      console.log('WWWW  NOT THE SAME nextPros  >>' + JSON.stringify(nextProps.oneAppo));
      console.log('WWWW  NOT THE SAME thisProps  >>' + JSON.stringify(this.props.oneAppo));
      console.log('##### NO THE SAME NEXT owners_options  >>' + JSON.stringify(nextProps.owners_options));
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
                   doc_name:  this.props.oneAppo.doc_name,
                   owners_options: nextProps.owners_options
                 });
    }
    // console.log('##### NO THE SAME owners_options  >>' + JSON.stringify(nextProps));
    // if ( this.state.owners_options.length == 0 ) {
    //   console.log('##### NO THE SAME owners_options  >>' + JSON.stringify(nextProps.owners_options));
    //   let action2 = ApposActionCreators.updateForm(this.props.routeParams.id);
    //   this.props.dispatch(action2);
    //   this.setState({owners_options: this.props.owners_options});
    // }7
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

  handleChange(val) {
    let change = {};
    console.log(JSON.stringify(val));
    change[name] = event.target.value;
    this.setState(change);
  }

  handleClick(event) {
    let newvalue = this.state.ffreminder == true ? false : true;
    this.setState({ffreminder: newvalue});
  }

  getOptions(input, callback) {
    let self = this;
    setTimeout(function() {
        callback(null, {
            options: self.state.owners_options,
            // CAREFUL! Only set this to true when there are no more options,
            // or more specific queries will not be sent to the server.
            complete: true
        });
    }, 500);
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
             <Select.Async name="owners" loadOptions={this.getOptions.bind(this)} value={this.state.owner_id} onChange={this.handleChange} />
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
    oneAppo: PropTypes.any.isRequired,
    owners_options: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

AppoModalComponent.defaultProps = {
    oneAppo: {},
    owners_options: []
};

function mapStateToProps(state) {
  return {
      oneAppo: state.rootReducer.appo_rdcer.oneAppo,
      owners_options: state.rootReducer.appo_rdcer.owners_options
  }
};

// binding React-Redux
export default connect(mapStateToProps)(AppoModalComponent);

