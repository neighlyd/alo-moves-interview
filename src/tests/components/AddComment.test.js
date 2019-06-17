import React from 'react';
import { shallow } from 'enzyme';

import { AddComment } from '../../components/AddComment';
import comments from '../fixtures/comments';

let startAddComment, wrapper;

beforeEach(() => {
  startAddComment = jest.fn();
  wrapper = shallow(<AddComment startAddComment={startAddComment}/>);
});

it('AddComment should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('AddComment should handlSubmit correctly', () => {
  const newComment = 'New Comment';
  const input = wrapper.find('.add-comment__input');
  input.simulate('change', {target: {value: newComment}});

  wrapper.find('.add-comment__form').simulate('submit', {preventDefault: () => null});
  expect(startAddComment).toHaveBeenCalledWith(newComment);
})