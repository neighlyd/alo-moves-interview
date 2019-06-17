import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../../components/HomePage';

it('HomePage should render correctly', () => {
  const wrapper = shallow(<HomePage />);
  expect(wrapper).toMatchSnapshot();
});
