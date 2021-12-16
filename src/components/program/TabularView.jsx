import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Tabs, Tab } from '@edx/paragon';
import * as ProgramTabs from './tab-components';
// i18n
import messages from './TabularView.messages';

function TabularView({ programDiscussions, intl }) {
  const { configured, iframe } = programDiscussions;
  const courseTabs = [
    {
      key: 'JourneyTab',
      label: intl.formatMessage(messages['tab.name.journey']),
      isHidden: false,
      component: <ProgramTabs.JourneyTab />,
    },
    {
      key: 'CommunityTab',
      label: intl.formatMessage(messages['tab.name.community']),
      isHidden: !configured,
      component: <ProgramTabs.CommunityTab iframeComponent={iframe} />,
    },
    {
      key: 'LiveTab',
      label: intl.formatMessage(messages['tab.name.live']),
      isHidden: true,
      component: <ProgramTabs.LiveTab />,
    },
  ];

  const [activeTab, setActiveTab] = useState(courseTabs[0].key);

  return (
    <Tabs activeKey={activeTab.key} id="controlled-tab-example" onSelect={tab => setActiveTab(tab)}>
      {courseTabs.map(tab =>
          !tab.isHidden &&
          <Tab eventKey={tab.key} title={tab.label} key={tab.key}>
            {tab.component}
          </Tab>)
      }
    </Tabs>
  );
}

TabularView.propTypes = {
  intl: intlShape.isRequired,
  programDiscussions: PropTypes.shape({
    configured: PropTypes.bool,
    iframe: PropTypes.string,
  }).isRequired,
};

export default injectIntl(TabularView);

