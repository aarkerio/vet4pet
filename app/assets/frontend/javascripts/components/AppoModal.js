'use strict';

import React, { PropTypes, Component } from 'react';
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
    console.log('MODALLEEEEE!!!!!!!!!!!!' + JSON.stringify(this.props));
    this.state = {
      isHovering: false,
      isExecuting: false,
      textValues: ["Delete", "Are you sure?", "Deleting..."],
      modalIsOpen: false
    };
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

    // var title_json= JSON.stringify({title: title});
    // var rank_json= JSON.stringify({rank: rank});
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
    } else if (length > 0) {
      return 'error';
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
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
     //    <form className="testModal" onSubmit={this.handleSubmit} >
     //      <div className="modal-body">
     //        <p><Input type="text" defaultValue={this.state.title} ref="title" className="form-control" required/></p>
     //        <p><Input type="text" defaultValue={this.state.rank} ref="rank" className="form-control" required/></p>
     //        <p><Input type="text" defaultValue={this.state.year} ref="year" className="form-control" required/></p>
     //      </div>
     //      <div className="modal-footer">
     //        <ButtonGroup>
     //          <Button className="btn btn-default" onClick={this.props.onRequestHide} data-dismiss="modal" active>Close</Button>
     //          <Button bsStyle="primary" className="btn btn-default" type="submit" disabled={this.state.isSubmitting}>Save</Button>
     //        </ButtonGroup>
     //      </div>
     //    </form>
     // </Modal>
    );

  }
}

AppoModal.propTypes = {
    appoId: PropTypes.number
    // Will be called with the new value for the cell
    // onChange: React.PropTypes.func.isRequired
}


function mapStateToProps(state, ownProps) {
  return {
    appoId: ownProps.params.appoId
    // filter: ownProps.location.query.filter
  };
}

export default connect(mapStateToProps)(AppoModal)
