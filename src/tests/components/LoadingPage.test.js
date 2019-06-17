import React from 'react';
import { shallow } from 'enzyme';

import LoadingPage from '../../components/LoadingPage';

it('LoadingPage should render correctly', () => {
  const wrapper = shallow(<LoadingPage />);
  expect(wrapper).toMatchSnapshot();
});