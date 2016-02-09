// import AppointmentForm from './appointment_form.jsx';

class Appointments extends React.Component {
  constructor(props) {
     super(props);
    //this.state = {  appointments: {}, message: 'No message' };
  }

  /*
   *  Sen data to get the autofill field
   */
  sendDataToRails(url) {
    link = {url: '/appointments/get_data'};

    $.ajax({
      type: 'GET',
      url: '/appointments/get_data/',
      data: link,
      headers: {'X-CSRFToken': $.cookie('csrftoken')},
      success: function(data) {
        var data = this.state.data;
        //I do this so the new added link will be on top of the array
        var newLinks = [data].concat(links);
        // this.setState({data: newLinks});
        this.setState({owners: newLinks});
      }.bind(this)
    });
  }
  addAppointment(record) {
    var records;
    records = React.addons.update(this.state.records, {
      $push: [record]
    });
    return this.setState({
      records: records
    });
  }
  render() {
      var todos = [];
      var trNodes = this.props.data.map(function (appointment) {
        var row = <tr key={appointment.id}>
          <td>{appointment.date}</td>
          <td>{appointment.petname}</td>
          <td>{appointment.owner}</td>
          <td>{appointment.reason}</td>
          <td>{appointment.docname}</td>
          <td>Delete {appointment.id}</td>
          <td>Edit {appointment.id}</td>
          </tr>
        ;
        todos.push(row);
      });
      // console.log(todos);
      var appoNodes = <table className="myTable" key="myta"><thead><tr key="myt1">
      <td key="myt1.1"> Scheduled date </td>
      <td>Pet</td>
      <td>Owner</td>
      <td>Reason</td>
      <td>Doctor</td>
      <td>Delete</td>
      <td>Edit</td></tr>
      </thead>
      <tbody>
        { todos }
      </tbody>
      </table>
      ;
    //var form = React.createElement(AppointmentForm, {handleNewAppointment: this.addAppointment } );
    return (
      <div className="appoList" key="dfdsf">
         <div className="appoDivForm"></div><br />
        {appoNodes}
      </div>
    );
  }
}

Appointments.propTypes = {
    aStringProp:       React.PropTypes.string.isRequired,
    ownerStringProp:   React.PropTypes.string,
    petnameStringProp: React.PropTypes.string,
    docnameStringProp: React.PropTypes.string,
    reasonStringProp:  React.PropTypes.string,
    dateStringProp:    React.PropTypes.string,
    ownersArrayProp:   React.PropTypes.array,
    data:              React.PropTypes.array.isRequired
};

Appointments.defaultProps = {
    aStringProp:       '',
    ownerStringProp:   '',
    petnameStringProp: '',
    docnameStringProp: '',
    dateDateProp:      '',
    reasonStringProp:  '',
    ownersArrayProp:   [],
    data:              []
 };

 export default Appointments;
