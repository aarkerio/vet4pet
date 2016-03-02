import React, { PropTypes, Component } from 'react'
import Modal from 'react-modal';

class AppoModal extends Component {
  constructor(props) {
    super(props)
  }

  handleChange(evt) {
    this.props.onChange(evt.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();

    var title = this.refs.title.getValue().trim().toUpperCase();
    var rank = this.refs.rank.getValue().trim().toUpperCase();
    var year = this.refs.year.getValue().trim().toUpperCase();

    var title_json= JSON.stringify({title: title});
    var rank_json= JSON.stringify({rank: rank});
    var year_json= JSON.stringify({year: year});
    //alert(title_json);
    //alert(rank_json);
    //alert(year_json);
    this.props.onCommentSubmit(title_json,rank_json,year_json);
    this.props.onRequestHide;

    return;
  }

  validationTest() {

        var length = this.state.test.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) {
          return 'error';
        }

  }

  render() {
    return (
      <Modal {...this.props} className="testModal" bsStyle="primary" title='Edit Details' animation={false}>
        <form className="testModal" onSubmit={this.handleSubmit} >
          <div className="modal-body">
            <p><Input type="text" defaultValue={this.state.title} ref="title" className="form-control" required/></p>
            <p><Input type="text" defaultValue={this.state.rank} ref="rank" className="form-control" required/></p>
            <p><Input type="text" defaultValue={this.state.year} ref="year" className="form-control" required/></p>
          </div>
          <div className="modal-footer">
            <ButtonGroup>
              <Button className="btn btn-default" onClick={this.props.onRequestHide} data-dismiss="modal" active>Close</Button>
              <Button bsStyle="primary" className="btn btn-default" type="submit" disabled={this.state.isSubmitting}>Save</Button>
            </ButtonGroup>
          </div>
        </form>
     </Modal>
    );

  }
}

AppoModal.propTypes = {
    // data: PropTypes.string.isRequired,
    // Will be called with the new value for the cell
    // onChange: React.PropTypes.func.isRequired
}

export default AppoModal
