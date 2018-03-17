import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExpenseForm from '../components/expense/expense-form/index';
require('jest');

configure({adapter: new Adapter()});

describe('<ExpenseForm />', function() {
  describe('Shallow mounting', () => {
    beforeAll(() => this.wrapper = shallow(<ExpenseForm />));
    afterAll(() => this.wrapper.unmount());

    it('Should render a category form component', () => {
      expect(this.wrapper.length).toBe(1);
      expect(this.wrapper.find('.expense-form').length).toBe(1);
    });
    it('Should have a default state object with a name and property', () => {
      expect(this.wrapper.state().name).toEqual('');
    });
    it('Should change the state object according to form input provided', () => {
      this.wrapper.find('.expense-form input[type="text"]').simulate('change', {target: {name: 'name', value: 'tim'}});
      expect(this.wrapper.state().name).toEqual('tim');
    });
  });
  describe('Full Mounting', () => {
    beforeAll(() => {
      this.wrapper = mount(<ExpenseForm />);
      this.wrapper.setProps({onComplete: jest.fn()});
    });
    afterAll(() => this.wrapper.unmount());

    it('Should render a category form component', () => {
      expect(this.wrapper.length).toBe(1);
    });
    it('Should reset the state.name value to empty string on form submit', () => {
      this.wrapper.setState({name: 'bye'});
      this.wrapper.simulate('submit', {preventDefault: jest.fn()});
      expect(this.wrapper.state().name).toEqual('');
    });
    it('Should have called onComplete in the previous assertion', () => {
      expect(this.wrapper.props().onComplete).toHaveBeenCalled();
    });
  });
});