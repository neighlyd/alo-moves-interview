import React from 'react';
import { shallow } from 'enzyme';

import { CommentList } from '../../components/CommentList';
import comments from '../fixtures/comments';

it('should render CommentList correctly with comments', () => {
  const wrapper = shallow(<CommentList comments={comments}/>);
  expect(wrapper).toMatchSnapshot();
});

it('should render CommentList correctly with empty comments list', () => {
  const wrapper = shallow(<CommentList comments={[]}/>);
  expect(wrapper).toMatchSnapshot();
})