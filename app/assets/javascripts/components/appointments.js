this.Appointments = React.createClass({
  getInitialState: function() {
    return {
      appointments: this.props.data
    };
  },
  getDefaultProps: function() {
    return {
      appointments: []
    };
  },
  render: function() {
    var appointment;
    return React.DOM.div ( {className: 'appointments'},
    React.DOM.h2( { className: 'title' }, 'appointments'),
    React.DOM.div({ className: 'row'},
      React.createElement('div', {  // AmountBox
                          // type: 'success',
                          amount: '0.0',
                          text: 'Credit'
                         }),
      React.createElement('div', {  // AmountBox
                          // type: 'danger',
                          amount: 'dfgfd',
                          text: 'Debit'
                          }),
      React.createElement('div', { // AmountBox
                          //  type: 'info',
                          amount: 'amkiunt',
                          text: 'Balance'
                          })
    ),
    // )
    // React.createElement(AppointmentForm, {
    //  handleNewappointment: this.addappointment
    // }),
    React.DOM.hr(null),
    React.DOM.table( { className: 'table table-bordered' },
      React.DOM.thead(null, React.DOM.tr(null, React.DOM.th(null, 'Date'), React.DOM.th(null, 'Title'), React.DOM.th(null, 'Amount'), React.DOM.th(null, 'Actions'))),
      React.DOM.tbody(null, (function()
      {
        var i, len, ref, results;
        ref     = this.state.appointments;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          appointment = ref[i];
          results.push(React.createElement(appointment, {
            key: appointment.id,
            appointment: appointment
          //     handleDeleteappointment: this.deleteappointment,
          //     handleEditappointment: this.updateappointment
        })); // push(React
      }
      return results;
      }).call(this)
    )
    )
    )
  }

});
