import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Tabs, Tab } from '@openedx/paragon';
import * as ProgramTabs from './tab-components';
// i18n
import messages from './TabularView.messages';

function TabularView({ programDiscussions, liveSettings, intl }) {
  const { configured, iframe } = programDiscussions;
  const { configured: liveConfigured, iframe: liveIframe } = liveSettings;
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
      isHidden: !liveConfigured,
      component: <ProgramTabs.CommunityTab iframeComponent={liveIframe} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(courseTabs[0].key);

  return (
    <div className="px-5">
      <Tabs activeKey={activeTab.key} id="controlled-tab-example" onSelect={tab => setActiveTab(tab)}>
        {courseTabs.map(tab => !tab.isHidden
          && (
          <Tab eventKey={tab.key} title={tab.label} key={tab.key}>
            {tab.component}
          </Tab>
          ))}
      </Tabs>
    </div>
  );
}

TabularView.propTypes = {
  intl: intlShape.isRequired,
  programDiscussions: PropTypes.shape({
    configured: PropTypes.bool,
    iframe: PropTypes.string,
  }).isRequired,
  liveSettings: PropTypes.shape({
    configured: PropTypes.bool,
    iframe: PropTypes.string,
  }).isRequired,
};

export default injectIntl(TabularView);
