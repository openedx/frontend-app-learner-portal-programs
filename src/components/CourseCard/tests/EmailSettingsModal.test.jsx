import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

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

  it('handles the disabling of the submit button properly', () => {
    expect(wrapper.find('EmailSettingsModal').state('isFormChanged')).toBeFalsy();
    expect(wrapper.find('.modal-footer .save-email-settings-btn').first().prop('disabled')).toBeTruthy();
    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: false } });
    expect(wrapper.find('EmailSettingsModal').state('isFormChanged')).toBeTruthy();
    expect(wrapper.find('.modal-footer .save-email-settings-btn').first().prop('disabled')).toBeFalsy();

    expect(wrapper.find('EmailSettingsModal').state('isSubmitting')).toBeFalsy();
    wrapper.find('.modal-footer .save-email-settings-btn').first().simulate('click');
    expect(wrapper.find('EmailSettingsModal').state('isSubmitting')).toBeTruthy();
  });
});
