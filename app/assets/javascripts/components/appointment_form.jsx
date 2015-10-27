this.AppointmentForm = React.createClass({
  getInitialState: function() {
    return {
      date: '',  // form input element
      pet_id: '',
      owner_id: '',
      doctor_id: '',
      reminder: '',
      owners: {key: 'type', value: 'type a name'}, //  options can be updated
      url: '/appointments/get_data'
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
          console.log( data.length);
          this.setOptions(data);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.state.url, status, err.toString());
      }.bind(this)
    });
  },
  setOptions: function(data) {
    // console.log(data);
    // assuming data is an array of {name: "foo", value: "bar"}
    // console.log( ">>>>>>>>>>>>>"+data.length);
    var tmp = []
    for (var i = 0; i < data.length; i++) {
      var option = data[i];
      tmp.push(
          <option key={i} value={option.value}>{option.name}</option>
      );
    }
    //console.log(this.state.owners);
    this.state.owners = tmp;
    console.log( ">>>>>>>>>>>>>"+JSON.stringify(tmp));
    //this.setState({owners: tmp})
    return (
      <datalist id={"myOwners"} key={'mexDataList'}>
        {tmp}
      </datalist>
    )
  },
  render: function() {
    return React.DOM.form({
      className: 'form-inline',
      onSubmit: this.handleSubmit
    },
      React.DOM.input({
        type: 'text',
        className: 'form-control',
        placeholder: 'Owner',
        name: 'owner_id',
        list: 'myOwners',
        onChange: this.getData
      }),
      React.createElement('datalist',{
          key: 'mexDataList',
          id: 'myOwners',
          //options: React.createElement('option', {key: 'apple', value: 'apple'}),
          //value: React.createElement('option', {key: 'apple', value: 'apple'})
        }, React.createElement('option', this.state.owners)),
      React.DOM.input({
        type: 'text',
        className: 'form-control',
        placeholder: 'Date',
        name: 'date',
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
