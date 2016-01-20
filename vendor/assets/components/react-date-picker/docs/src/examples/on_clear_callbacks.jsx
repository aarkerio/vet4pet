import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export default React.createClass({
  displayName: "ClearCallbacks",

  getInitialState() {
    return {
      startDate: null
    };
  },

  handleChange: function (date) {
    this.setState({
      startDate: date
    });
  },

  handleOnClear: function () {
    console.log("Date has been cleared");
  },

  render() {
    return <div className="row">
      <pre className="column example__code">
        <code className="js">
          {"handleOnClear: function (date) {"}<br />
            {"console.log('Date has been cleared');"}<br />
          {"};"}
        </code>
        <br />
        <code className="jsx">
          {"<DatePicker"}<br />
              {"key='example9'"}<br />
              {"selected={this.state.startDate}"}<br />
              {"onChange={this.handleChange}"}<br />
          <strong>    {"onClear={this.handleOnClear}"}</strong><br />
              {"isClearable={true}"}<br />
              {"placeholderText=\"View clear callbacks in console\" />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          key="example9"
          selected={this.state.startDate}
          onChange={this.handleChange}
          onClear={this.handleOnClear}
          isClearable={true}
          placeholderText="View clear callbacks in console" />
      </div>
    </div>;
  }
});
