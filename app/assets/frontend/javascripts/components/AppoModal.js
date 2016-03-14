'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as ApposActionCreators from '../actions/appos';
import { Button, Modal } from 'react-bootstrap';

class AppoModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true };
    console.log('MO222#####33333 222222E!!!!!!!' + JSON.stringify(this.props));
  }
  
  /**
   * Load default appointment
   **/
  componentDidMount() {  
    console.log(' In componentDidMount ApposModal this.props.routeParams.id' + JSON.stringify(this.props.routeParams.id));
    let action = ApposActionCreators.fetchAppos(this.props.routeParams.id);
    this.props.dispatch(action);
  }

/**
  * Send data to new appointment
  **/
  handleSubmit(e) {
    e.preventDefault();
    let action = ApposActionCreators.sendAppo(this.props.routeParams.id);
    this.props.dispatch(action);
    browserHistory.push('/appointments');
  }

  validationTest() {
    var length = this.state.test.length;
    if (length > 10) {
      return 'success';
    } else if (length > 5) {
      return 'warning';
    } else if (length > 0)
      {
      return 'error';
    }
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
             <Modal.Title>Modal Überschrift Rot</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="for_owner">Eigentümer:</label>
              <input className="form-control" id="for_owner" name="owner" defaultValue={this.props.owner} />
              <label htmlFor="for_petname">Kosename (haustier):</label>
              <input className="form-control" id="for_petname" defaultValue={this.state.petname} />
              <label htmlFor="for_petname">Doc:</label>
              <input className="form-control" id="for_petname" defaultValue={this.state.docname} />
              <label htmlFor="for_petname">Vernunft:</label>
              <input className="form-control" id="for_petname" defaultValue={this.state.reason} />
              <label htmlFor="for_date">Datum:</label>
              <input className="form-control" id="for_date" name="date" defaultValue={this.state.date} />
              <label htmlFor="for_reminder">Erinner:</label>
              <input type="checkbox" name="reminder" checked={this.state.reminder} />
            </form>
          </Modal.Body>

          <Modal.Footer>
             <Button onClick={() => browserHistory.push('/appointments')}>Close</Button>
             <Button bsStyle="primary">Änderungen speichern</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
};

AppoModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    owner: PropTypes.string.isRequired
};

AppoModal.defaultProps = {
  owner:   'incorrect starting props owner',
  date:    'props date no real',
  petname: 'props petname no real',
  reason:  'props reason no real',
  docname: 'props docname no real',
  reminder: false
};

function mapStateToProps(state) {
    console.log('In mapStateToProps::::>>' + JSON.stringify(state));
    console.log('In mapStateToProps OWNER::::>>' + state.rootReducer.appointments_rdcer.owner);
  return {
      owner:     state.rootReducer.appointments_rdcer.owner
    // date:      state.rootReducer.appointments_rdcer.date,
    // petname:   state.rootReducer.appointments_rdcer.petname,
    // reason:    state.rootReducer.appointments_rdcer.reason,
    // docname:   state.rootReducer.appointments_rdcer.docname,
    // reminder:  state.rootReducer.appointments_rdcer.reminder
  }
}

// binding React-Redux
export default connect(mapStateToProps)(AppoModal)
