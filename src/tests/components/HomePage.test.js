import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../../components/HomePage';

it('renders without crashing', () => {
  const wrapper = shallow(<HomePage />);
  expect(wrapper).toMatchSnapshot();
});
