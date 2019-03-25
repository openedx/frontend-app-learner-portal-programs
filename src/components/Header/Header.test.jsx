import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './Header';

// An example unit test using jest + enzyme run this test with `npm run test`

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  test('Component renders', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });
});
