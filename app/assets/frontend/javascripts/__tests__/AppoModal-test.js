// __tests__/AppoModal-test.js

'use strict';

jest.unmock('../components/AppoModalComponent');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import AppoModalComponent from '../components/AppoModalComponent';

describe('AppoModalComponent', () => {

  it('changes pets if owner changes', () => {
    // Render a checkbox with label in the document
    const checkbox = TestUtils.renderIntoDocument(
      <AppoModalComponent labelOn="On" labelOff="Off" />
    );

    const ownersNode = ReactDOM.findDOMNode(owners);

    // Verify that it's Off by default
    expect(checkboxNode.textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    TestUtils.Simulate.change(
      TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
    );
    expect(checkboxNode.textContent).toEqual('On');
  });

});
