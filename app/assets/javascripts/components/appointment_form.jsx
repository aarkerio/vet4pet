
var DateTimePicker = ReactWidgets.DateTimePicker;
//var DateTimePicker = require('./react-widgets/lib/date-time-picker');
//import DateTimePicker from './react-widgets/lib/DateTimePicker';
var AppointmentForm = React.createClass({
  getInitialState: function() {
    return {
      date: '',  // form input element
      pet: '',
      owner: '',
      doctor: '',
      reason: '',
      reminder: '',
      url: '/appointments'
    };
  },
  _validate: function () {
    var errors = {}
    if(this.state.username == "") {
      errors.username = "Username is required";
    }
    if(this.state.email == "") {
      errors.email = "Email is required";
    }
    if(this.state.password == "") {
      errors.password = "Password is required";
    }
    return errors;
  },
  valid: function() {
    return this.state.pet_id && this.state.owner_id;
  },
  handlePetChange: function(e) {
    this.setState({pet: e.target.value});
  },
  handleOwnerChange: function(e) {
    this.setState({owner: e});
  },
  handleDateChange: function(e) {
    this.setState({date: e});
  },
  handleDoctorChange: function(e) {
    this.setState({doctor: e.target.value});
  },
  handleReasonChange: function(e) {
    this.setState({reason: e.target.value});
  },

  handleReminderChange: function(e) {
    this.setState({reminder: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    cdate     = this.state.date;
    cpet      = this.state.pet;
    cowner    = this.refs.fieldDate.state.owner;
    cdoctor   = this.state.doctor;
    creminder = this.state.reminder;
    creason   = this.state.reason;
    data_r    = { date: cdate, reminder: creminder, owner: cowner, pet: cpet, doctor: cdoctor, reason: creason };
    console.log( ">>>>>> Sending data >>>>>>> " + JSON.stringify(data_r));
    $.ajax({
      url: this.state.url,
      dataType: 'json',
      type: 'POST',
      headers: {'X-CSRFToken': Cookies.get('csrf-token')},
      cache: false,
      data: data_r,
      success: function(data) {
        console.log( ">>>>>> getting data >>>>>>> " + JSON.stringify(data));
        this.setState({data: data});
        // this.refs.fieldDate.clearInput();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return React.DOM.form({
        onSubmit: this.handleSubmit
      },
      <MyList ref="fieldDate" />,
      // <DateTimePicker onChange={this.handleDateChange} />,
      React.DOM.input({
        type: 'text',
        className: 'rw-datetimepicker rw-widget rw-has-both',
        placeholder: 'Pet name',
        name: 'pet_id',
        onChange: this.handlePetChange
      }),
      React.DOM.input({
        type: 'text',
        className: 'rw-datetimepicker rw-widget rw-has-both',
        placeholder: 'Doctor',
        name: 'doctor_id',
        onChange: this.handleDoctorChange
      }),
      React.DOM.input({
        type: 'text',
        className: 'rw-datetimepicker rw-widget rw-has-both',
        placeholder: 'Reason',
        name: 'reason',
        onChange: this.handleReasonChange
      }),

      React.DOM.span(null, "Reminder: "), React.DOM.input({
        type: 'checkbox',
        className: 'rw-datetimepicker rw-widget rw-has-both',
        placeholder: 'Reminder',
        name: 'reminder',
        // value: this.state.reminder,
        onChange: this.handleReminderChange
      }),
      React.DOM.button({
        type: 'submit',
        className: 'btn btn-primary',
        // disabled: !this.valid()
    }, 'Create appointment'));
  }
});

var MyList = React.createClass({
    getInitialState: function() {
      return {
          childSelectValue: undefined,
          getOptions: [],
          url: '/appointments/get_data',
          owner: '',
          options: [<option key={'taste'} value={'zeitwert'}>{'Name'}</option>]
      }
    },
    propTypes: {
      value:      React.PropTypes.string,
      onChange:   React.PropTypes.func
    },
    changeList: function(e) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>In changeList');
      var tmp = this.getData(e);
      this.forceUpdate();
    },
    getData: function(e) {
      e.preventDefault();
      ovalue = e.target.value
      this.setState({owner: ovalue});
      link = {url: this.state.url, ovalue: ovalue};
      $.ajax({
        type: 'POST',
        data: link,
        url: this.state.url,
        headers: {'X-CSRFToken': Cookies.get('csrf-token')},
        cache: false,
        dataType: 'json',
        success: function(data) {
          if (data != undefined) {
            console.log( ">>>>>> 154 data >>>>>>>"+JSON.stringify(data));
            this.setOptions(data);
          }
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.state.url, status, err.toString());
        }.bind(this)
      });
    },
    setOptions: function(data) {
      var tempo = [];
      for (var i = 0; i < data.length; i++) {
        var option = data[i];
        var tmp = <option key={i} value={option.name} id={option.value}>{option.name}</option>;
        tempo.push(tmp);
     }
     console.log( ">>>>>> 170 TEMPO data >>>>>>>"+JSON.stringify(tempo.props));
     this.setState({options: tempo});
    },
    getDefaultProps: function() {
        return {
            value: ''
        };
    },
    changeHandler: function(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value);
        }
    },
    render: function() {
        return (
          <span>
            <input type="text" onChange={this.changeList} list="slist" id="owner_id" name="owner_id" />
            <datalist id="slist">{this.state.options}</datalist>
          </span>
        )
    }
});

