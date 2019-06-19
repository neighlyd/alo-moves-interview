import React from 'react';
import { shallow } from 'enzyme';

import { List } from '../../components/List';
import comments from '../fixtures/comments';

it('should render List correctly with comments', () => {
  const wrapper = shallow(<List comments={comments} collection='comments'/>);
  expect(wrapper).toMatchSnapshot();
});

it('should render List correctly with empty comments list', () => {
  const wrapper = shallow(<List comments={[]} collection='comments'/>);
  expect(wrapper).toMatchSnapshot();
})