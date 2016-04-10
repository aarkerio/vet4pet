
// file: __tests__/components/appoModalComponent.js

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

var expect = require('chai').expect;

import AppoModalComponent from "../../components/AppoModalComponent";

describe('appoModalComponent', function() {
  before('render and locate element', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <AppoModalComponent />
    );

    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );

    this.inputElement = inputComponent.getDOMNode();
  });

  it('<input> should be of type "checkbox"', function() {
    assert(this.inputElement.getAttribute('type') === 'checkbox');
  });

  it('<input> should not be checked', function() {
    assert(this.inputElement.checked === false);
  });
});

