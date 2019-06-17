import React from 'react';
import { shallow } from 'enzyme';

import DeleteComment from '../../components/DeleteComment';

let handleSubmit, wrapper;

beforeEach(() => {
  handleSubmit = jest.fn();
  wrapper = shallow(<DeleteComment handleSubmit={handleSubmit}/>)
});

it('DeleteComment should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('DeleteComment should handleSubmit correctly', () => {
  wrapper.find('.confirm_btn').simulate('click');
  expect(handleSubmit).toHaveBeenCalled();
});