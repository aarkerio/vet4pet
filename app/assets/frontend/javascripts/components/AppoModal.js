'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Modal from 'react-modal';
import { connect } from 'react-redux';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AppoModal extends Component {
  constructor(props) {
    super(props);
      console.log('MODALEEEE!!!!!!!!!!!!' + JSON.stringify(this.props));
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
          <div>
        <Modal
          isOpen={this.props.ModalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h2>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
         </Modal>
          </div>
    )
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
