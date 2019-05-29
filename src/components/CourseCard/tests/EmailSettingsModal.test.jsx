import React from 'react';
import { mount } from 'enzyme';

import EmailSettingsModal from '../EmailSettingsModal';

jest.useFakeTimers();

describe('<EmailSettingsModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount((
      <EmailSettingsModal
        title="Example Title"
        onClose={() => {}}
        hasEmailsEnabled
      />
    ));
  });

  it('handles the disabling of the submit button properly', () => {
    expect(wrapper.state('isFormChanged')).toBeFalsy();
    expect(wrapper.find('.modal-footer .save-email-settings-btn').first().prop('disabled')).toBeTruthy();
    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: false } });
    expect(wrapper.state('isFormChanged')).toBeTruthy();
    expect(wrapper.find('.modal-footer .save-email-settings-btn').first().prop('disabled')).toBeFalsy();

    expect(wrapper.state('isSubmitting')).toBeFalsy();
    wrapper.find('.modal-footer .save-email-settings-btn').first().simulate('click');
    expect(wrapper.state('isSubmitting')).toBeTruthy();
  });
});
