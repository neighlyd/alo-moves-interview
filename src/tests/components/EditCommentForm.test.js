import React from 'react';
import { shallow } from 'enzyme';

import EditCommentForm from '../../components/EditCommentForm';
import comments from '../fixtures/comments';

let comment, handleSubmit, wrapper;

beforeEach(() => {
  comment = comments[0];
  handleSubmit = jest.fn();
  wrapper = shallow(<EditCommentForm comment={comment.text} handleSubmit={handleSubmit}/>);
});

it('EditCommentForm should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('EditCommentForm should handleSubmit correctly', () => {
  const newComment = 'New Comment';
  const input = wrapper.find('.edit-comment__input')
  input.simulate('change', {target: {value: newComment}});

  wrapper.find('.edit-comment').simulate('submit', {preventDefault: () => null});
  expect(handleSubmit).toHaveBeenCalledWith({text: newComment})
});