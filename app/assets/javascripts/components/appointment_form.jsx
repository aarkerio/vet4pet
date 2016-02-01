var DateTimePicker = ReactWidgets.DateTimePicker;

var AppointmentForm = React.createClass({
  getInitialState: function() {
    return {
      date: '',  // form input element
      pet: '',
      owner: '',
      doctor: '',
      reminder: '',
      url: '/appointments'
    };
  },
  valid: function() {
    return this.state.pet_id && this.state.owner_id;
  },
  handlePetChange: function(e) {
    pet = e.target.value;
    console.log("Changed name field >>>>>>>>>>>>>>>>>>>>>>>>>  " + name);
    this.setState({pet: e.target.value});
  },
  handleOwnerChange: function(e) {
    this.setState({owner: e});
  },
  handleDateChange: function(e) {
    console.log( ">>>>>> Sending date >>>>>>> " + e);
    this.setState({date: e});
  },
  handleDoctorChange: function(e) {
    this.setState({doctor: e});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    console.log( ">>>>>> Sending data >>>>>>> " + JSON.stringify(e));
    cpet      = this.state.pet;
    cdoctor   = this.state.doctor;
    cdate     = this.state.date;
    creminder = this.state.reminder;
    owid      = this.state.owner;
    data_r = {url: this.state.url, date: cdate, reminder: creminder, owner: owid, pet: cpet, doctor: cdoctor};
    $.ajax({
      url: this.state.url,
      dataType: 'json',
      type: 'POST',
      headers: {'X-CSRFToken': Cookies.get('csrf-token')},
      cache: false,
      data: data_r,
      success: function(data) {
        this.setState({data: data});
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
      <MyList value={this.state.owner} onChange={this.handleOwnerChange} />,
      <DateTimePicker onChange={this.handleDateChange} />,
      React.DOM.input({
        type: 'text',
        className: 'rw-datetimepicker rw-widget rw-has-both',
        placeholder: 'Pet name',
        name: 'pet_id',
        // value: this.state.pet_id,
        onChange: this.handlePetChange
      }),
      React.DOM.input({
        type: 'text',
        className: 'rw-datetimepicker rw-widget rw-has-both',
        placeholder: 'Doctor',
        name: 'doctor_id',
        onChange: this.handleDoctorChange
      }),
      React.DOM.span(null, "Reminder: "), React.DOM.input({
        type: 'checkbox',
        className: 'rw-datetimepicker rw-widget rw-has-both',
        placeholder: 'Reminder',
        name: 'reminder',
        // value: this.state.reminder,
        onChange: this.handleChange
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
            options: [<option key={'taste'} value={'zeitwert'}>{'Name'}</option>]
        }
    },
    propTypes: {
        value:      React.PropTypes.string,
        onChange:   React.PropTypes.func
    },
    changeHandler: function(e) {
        console.log('In changeHandler');
        var tmp = this.getData(e);
        this.forceUpdate();
    },
    getData: function(e) {
      e.preventDefault();
      ovalue = e.target.value
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
            console.log( ">>>>>> 108 data >>>>>>>"+JSON.stringify(data));
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
     console.log( ">>>>>> 127 data >>>>>>>"+JSON.stringify(tempo));
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
            <input className="rw-datetimepicker rw-widget rw-has-both" type="text" value={this.props.value} onChange={this.changeHandler} list="slist" name="owner" />
            <datalist id="slist">{this.state.options}</datalist>
          </span>
        )
    }
});

