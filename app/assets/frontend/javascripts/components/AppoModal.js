'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { Button, Modal } from 'react-bootstrap';

class AppoModal extends Component {
  constructor(props) {
    super(props);
      console.log('MODALEEEE!!!!!!!!!!!!' + JSON.stringify(this.props));
  }

  openModal() {
     return;
    //dispatch(closeModal);    
    //this.setState({modalIsOpen: true});
  }

  closeModal() {
        return;
    //this.setState({modalIsOpen: false});
  }

  handleChange(evt) {
    return;
    this.props.onChange(evt.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    // var title = this.refs.title.getValue().trim().toUpperCase();
    // var rank = this.refs.rank.getValue().trim().toUpperCase();
    // var year = this.refs.year.getValue().trim().toUpperCase();

    // var year_json= JSON.stringify({year: year});
    // //alert(title_json);
    // //alert(rank_json);
    // //alert(year_json);
    // this.props.onCommentSubmit(title_json,rank_json,year_json);
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
        <div className='modal-example'>
          <Modal aria-labelledby='modal-label'
            style={modalStyle}
            backdropStyle={backdropStyle}
            show={true}
            onHide={this.handleChange}
          >
              <Modal.Header>
                <Modal.Title>Modal Überschrift</Modal.Title>
              </Modal.Header>

              <Modal.Body>
              <form>
              <label for="usr">Owner:</label>
              <input className="form-control" id="for_owner" />
              <label for="usr">Pet Name:</label>
              <input className="form-control" id="for_petname" />
              <label for="usr">Date:</label>
              <input className="form-control" id="for_petname" />
              </form>
              </Modal.Body>

              <Modal.Footer>
              <Button>Close</Button>
              <Button bsStyle="primary">Änderungen speichern</Button>
              </Modal.Footer>

          </Modal>
        </div>
      );
  }
}

AppoModal.propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    ModalIsOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.bool.isRequired 
    // Will be called with the new value for the cell
    // onChange: React.PropTypes.func.isRequired
}

AppoModal.defaultProps = {
    isOpen: true,
    ModalIsOpen: true,
    onRequestClose: true
 }

function mapStateToProps(state, ownProps) {
  return {
      id: ownProps.params.id
    // filter: ownProps.location.query.filter
  };
}

export default connect(mapStateToProps)(AppoModal)
