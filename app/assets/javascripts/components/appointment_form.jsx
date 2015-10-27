this.AppointmentForm = React.createClass({
  getInitialState: function() {
    return {
      date: '',
      pet_id: '',
      owner_id: '',
      doctor_id: '',
      reminder: '',
      owners: '',
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
  getData: function(prueba) {
    console.log(prueba);
    link = {url: this.state.url, iir: this.state.owner_id};
    $.ajax({
      type: 'POST',
      url: this.state.url,
      headers: {'X-CSRFToken': $.cookie('csrf-token')},
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.state.url, status, err.toString());
      }.bind(this)
    });
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
        value: this.state.owner_id,
        onChange: this.getData
      }), React.DOM.datalist({
        id: 'myOwners',
        value: this.state.owners
      }), React.DOM.input({
        type: 'text',
        className: 'form-control',
        placeholder: 'Date',
        name: 'date',
        value: this.state.date,
      onChange: this.handleChange
    }), React.DOM.input({
      type: 'text',
      className: 'form-control',
      placeholder: 'Pet name',
      name: 'pet_id',
      value: this.state.pet_id,
      onChange: this.handleChange
    }), React.DOM.input({
      type: 'text',
      className: 'form-control',
      placeholder: 'Doctor',
      name: 'doctor_id',
      value: this.state.doctor_id,
      onChange: this.handleChange
    }), React.DOM.span(null, "Reminder: "), React.DOM.input({
      type: 'checkbox',
      className: 'form-control',
      placeholder: 'Reminder',
      name: 'reminder',
      value: this.state.reminder,
      onChange: this.handleChange
    }), React.DOM.button({
      type: 'submit',
      className: 'btn btn-primary',
      disabled: !this.valid()
    }, 'Create appointment'));
  }
});
