import React from 'react';
import { shallow } from 'enzyme';

import { CommentItem } from '../../components/CommentItem';
import comments from '../fixtures/comments';

it('CommentItem should render correctly', () => {
  const wrapper = shallow(<CommentItem {...comments[0]}/>);
  expect(wrapper).toMatchSnapshot();
});