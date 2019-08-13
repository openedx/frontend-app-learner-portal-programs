import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { StatefulButton } from '@edx/paragon';

import EmailSettingsModal from '../EmailSettingsModal';

jest.useFakeTimers();

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('<EmailSettingsModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount((
      <EmailSettingsModal
        store={store}
        title="Example Title"
        onClose={() => {}}
        hasEmailsEnabled
        courseRunId="my+course+key"
      />
    ));
  });

  it('statefulbutton component state is initially set to default', () => {
    expect(wrapper.find('.modal-footer .save-email-settings-btn').first().prop('state')).toEqual('default');
    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: false } });
  });

  it('statefulbutton component state is set to pending after click event', () => {
    expect(wrapper.find('.modal-footer .save-email-settings-btn').first().prop('state')).toEqual('default');
    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: false } });
    wrapper.find(StatefulButton).simulate('click');
    expect(wrapper.find('.modal-footer .save-email-settings-btn').first().prop('state')).toEqual('pending');
  });
});
