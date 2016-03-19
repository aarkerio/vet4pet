'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ApposActionCreators from '../actions/appos';
import { Button, Modal } from 'react-bootstrap';

import AppoFormComponent from './AppoFormComponent';

class AppoModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state   = { showModal: true,
                     ffid: this.props.routeParams.id,
                     ffowner:   '',
                     ffdate:    '',
                     ffpetname: '',
                     ffreason:  '',
                     ffdocname: '',
                     ffreminder: false };
   console.log(JSON.stringify(this.props.routeParams));
  }
  
/**
  * Loads default data
  **/
  componentDidMount() {
    let action = ApposActionCreators.getAppo(this.props.routeParams.id);
    this.props.dispatch(action);
  }
  
  componentWillReceiveProps(nextProps) {
    if ( nextProps.oneAppo.owner  !=  this.state.ffowner ) {
      // console.log('WWWW  NOT THE SAME nextPros  >>' + JSON.stringify(nextProps.oneAppo));
      // console.log('WWWW  NOT THE SAME thisProps  >>' + JSON.stringify(this.props.oneAppo));
      let action = ApposActionCreators.getAppo(this.props.routeParams.id);
      this.props.dispatch(action);  // thunk middleware dispatch
      let appo = this.props.oneAppo;
      this.setState({ffowner: appo.owner,ffdate: appo.date,ffpetname: appo.petname,ffreason: appo.reason,ffreminder: appo.reminder,ffdocname: appo.docname});
    }
  }

/**
 * Send data to new appointment
 **/
  handleSubmit(e) {
    e.preventDefault();
    let action = ApposActionCreators.createAppo(this.state);
    this.props.dispatch(action);
    browserHistory.push('/appointments');
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
              <AppFormComponent oneAppo={oneAppo} />
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

AppoModalComponent.propTypes = {
    oneAppo: PropTypes.any.isRequired,
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

