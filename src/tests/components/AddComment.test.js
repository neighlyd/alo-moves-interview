import React from 'react';
import { shallow } from 'enzyme';

import { AddComment } from '../../components/AddComment';

let handleAddComment, wrapper;

beforeEach(() => {
  handleAddComment = jest.fn();
  wrapper = shallow(<AddComment handleAddComment={handleAddComment}/>);
});

it('AddComment should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('AddComment should handlSubmit correctly', () => {
  const newComment = 'New Comment';
  const input = wrapper.find('.add-comment__input');
  input.simulate('change', {target: {value: newComment}});

  wrapper.find('.add-comment__btn').simulate('click', {preventDefault: () => null});
  expect(handleAddComment).toHaveBeenCalled();
  expect(handleAddComment).toHaveBeenCalledWith(newComment);
})