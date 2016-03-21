'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ApposActionCreators from '../actions/appos';
import { Button, Modal } from 'react-bootstrap';

class AppoModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true, ffid: '', ffowner:    '',
                   ffdate:     '',  ffpetname:  '',
                   ffreason:   '',   ffdocname:  '',
                   ffreminder: '' };
  }
  
/**
  * Loads default data
  **/
  componentDidMount() {
    let action = ApposActionCreators.getAppo(this.props.routeParams.id);
    this.props.dispatch(action);
  }
  
  componentWillReceiveProps(nextProps) {
    if ( nextProps.oneAppo.owner  !=  this.state.localAppo.owner ) {
      console.log('WWWW  NOT THE SAME nextPros  >>' + JSON.stringify(nextProps.oneAppo));
      console.log('WWWW  NOT THE SAME thisProps  >>' + JSON.stringify(this.props.oneAppo));
      let action = ApposActionCreators.getAppo(this.props.routeParams.id);
      this.props.dispatch(action);  // thunk middleware dispatch
      this.setState = {
                   ffid:       this.props.oneAppo.id,
                   ffowner:    this.props.oneAppo.owner,
                   ffdate:     this.props.oneAppo.date,
                   ffpetname:  this.props.oneAppo.petname,
                   ffreason:   this.props.oneAppo.reason,
                   ffdocname:  this.props.oneAppo.docname,
                   ffreminder: this.props.oneAppo.reminder 
                 };
    }
  }
/**
 * Send data to new appointment
 **/
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
    let action = ApposActionCreators.getAppo(this.props.routeParams.id);
    this.props.dispatch(action);  // thunk middlew
    this.props.dispatch();

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

