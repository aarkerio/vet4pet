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
      return (
            <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
              <Modal.Title>Modal Überschrift</Modal.Title>
      </Modal.Header>

      <Modal.Body>
              <form>
              <input />
              </form>
      </Modal.Body>

      <Modal.Footer>
        <Button>Close</Button>
        <Button bsStyle="primary">Änderungen speichern</Button>
      </Modal.Footer>

    </Modal.Dialog>
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
