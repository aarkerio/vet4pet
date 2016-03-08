'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { Button, Modal } from 'react-bootstrap';

class AppoModal extends Component {
  constructor(props) {
      super(props);
      this.closeModal = this.closeModal.bind(this);
      this.state = { showModal: true };
      console.log('MO22222 222222E!!!!!!!' + JSON.stringify(this.state));
  }
  statics() {
        console.log('I am static');
  }
  closeModal() {
    this.setState({showModal: false});
    console.log('closeModal function state:'+ JSON.stringify(this.state));
  }

  handleChange(evt) {
    return;
    this.props.onChange(evt.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.onRequestHide;
    return;
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
            // onHide={this.closeModal}
            // onRequestHide={this.closeModal}
          >
          <Modal.Header>
             <Modal.Title>Modal Überschrift Rot</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <label htmlFor="for_owner">Owner:</label>
              <input className="form-control" id="for_owner" />
                <label htmlFor="for_petname">Pet Name:</label>
                <input className="form-control" id="for_petname" />
                <label htmlFor="for_date">Date:</label>
                <input className="form-control" id="for_date" />
            </form>
          </Modal.Body>

          <Modal.Footer>
             <Button onClick={this.closeModal}>Close</Button>
             <Button bsStyle="primary">Änderungen speichern</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

AppoModal.propTypes = {
    id: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
      id: ownProps.params.id,
      showModal: ownProps.showModal
  }
}

export default connect(mapStateToProps)(AppoModal)
