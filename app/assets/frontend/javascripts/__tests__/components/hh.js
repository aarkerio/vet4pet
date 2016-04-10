
jest.unmock('../../components/HeaderComponent');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import HeaderComponent from '../../components/HeaderComponent';

describe('HeaderComponent', () => {

 let props ={
    labelText : "hoge",
    onClick : jest.fn()
  }

 function setup(){
    const instance = TestUtils.renderIntoDocument(
      <Button {...props} />
    )
    const buttonNode = ReactDOM.findDOMNode(instance)
    return {
      instance,
      buttonNode
    }
  }
  
 describe('click', () =>{
    it('calls onClick props', () => {
      const {buttonNode} = setup()

      TestUtils.Simulate.click(buttonNode)
      expect(props.onClick).toBeCalled()
    })
  })

  describe('value', () =>{
    it ('should be equal to label props', ()=>{
      props.labelText = "foo"
      const {buttonNode} = setup()

      expect(buttonNode.value).toEqual("foo")
    })
  });

  describe('disabled', () =>{
    it ('shoudl be false by default', ()=>{
      const {buttonNode} = setup()
      expect(buttonNode.disabled).toBeFalsy()
    })

    it ('should be equal to disabled props', ()=>{
      props.disabled = true
      const {buttonNode} = setup()

      expect(buttonNode.disabled).toBeTruthy()
    })
  });

  it('changes the text after click', () => {
    // Render a checkbox with label in the document
    const header = TestUtils.renderIntoDocument(
      <HeaderComponent />
    );

    const checkboxNode = ReactDOM.findDOMNode(checkbox);

    // Verify that it's Off by default
    expect(checkboxNode.textContent).toEqual('Off');

    // ...
  });
});
