this.AppointmentForm = React.createClass({
  getInitialState: function() {
    return {
      date: '',  // form input element
      pet_id: '',
      owner_id: '',
      doctor_id: '',
      reminder: ''
    };
  },
  valid: function() {
    return this.state.pet_id && this.state.date && this.state.owner_id;
  },
  handleChange: function(e) {
    var name, obj;
    name = e.target.name;
    console.log(name);
    return this.setState((
      obj = {},
      obj["" + name] = e.target.value,
      obj
    ));
  },
  handleSubmit: function(e) {
    e.preventDefault();
    return $.post('', {
      record: this.state
    }, (function(_this) {
      return function(data) {
        _this.props.handleNewRecord(data);
        return _this.setState(_this.getInitialState());
      };
    })(this), 'JSON');
  },
  render: function() {
    return React.DOM.form({
      className: 'form-inline',
      onSubmit: this.handleSubmit
    },
      <MyList />,
      React.DOM.input({
        type: 'text',
        className: 'form-control',
        placeholder: 'Date',
        name: 'datetimepicker',
        id: 'datetimepicker',
        value: this.state.date,
        onChange: this.handleChange
      }),
      React.DOM.input({
        type: 'text',
        className: 'form-control',
        placeholder: 'Pet name',
        name: 'pet_id',
        value: this.state.pet_id,
        onChange: this.handleChange
      }),
      React.DOM.input({
        type: 'text',
        className: 'form-control',
        placeholder: 'Doctor',
        name: 'doctor_id',
        value: this.state.doctor_id,
        onChange: this.handleChange
      }),
      React.DOM.span(null, "Reminder: "), React.DOM.input({
        type: 'checkbox',
        className: 'form-control',
        placeholder: 'Reminder',
        name: 'reminder',
        value: this.state.reminder,
        onChange: this.handleChange
      }),
      React.DOM.button({
        type: 'submit',
        className: 'btn btn-primary',
        //disabled: !this.valid()
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
    changeHandler: function(e) {
        console.log('In changeHandler');
        var tmp = this.getData(e);
        this.forceUpdate();
    },
    getData: function(e) {
      e.preventDefault();
      ovalue = e.target.value
      console.log(ovalue);
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
    render: function() {
        return (
          <span>
            <input type="text" className="form-control" onChange={this.changeHandler} placeholder="Owner" list="slist" name="owner" id="asdfdsfds" />
            <datalist id="slist">{this.state.options}</datalist>
          </span>
        )
    }
});
