
// var DateTimePicker = ReactWidgets.DateTimePicker;
//var DateTimePicker = require('react-widgets/lib/DateTimePicker');

import DateTimePicker from 'DateTimePicker';

class AppoFormComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: true,
                   date: '',  // form input element
                  pet: '',
      owner: '',
      doctor: '',
      reason: '',
      reminder: '',
      url: '/appointments'
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    cdate     = this.state.date;
    cpet      = this.state.pet;
    cowner    = this.refs.fieldDate.state.owner;
    cdoctor   = this.state.doctor;
    creminder = this.state.reminder;
    creason   = this.state.reason;
    data_r    = { date: cdate, reminder: creminder, owner: cowner, pet: cpet, doctor: cdoctor, reason: creason };

    this.props.dispatch();
    console.log( ">>>>>> Sending data >>>>>>> " + JSON.stringify(data_r));
   
  }

  render() {
           <form onSubmit={this.handleSubmit}>
             <MyList ref="fieldDate" />,
             // <DateTimePicker onChange={this.handleDateChange} />
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
                <input type="checkbox" name="reminder" checked={this.state.ffreminder} onClick={this.handleClick.bind(this, 'ffreminder')} />
            </form>
      )
  }
}


