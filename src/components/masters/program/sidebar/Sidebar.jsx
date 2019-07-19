import React from 'react';
import PropTypes from 'prop-types';
import { sendTrackEvent } from '@edx/frontend-analytics';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Links from './Links';
import SidebarBlock from './SidebarBlock';

const Sidebar = ({ programDocuments }) => (
  <>
    {programDocuments && programDocuments.display &&
      <SidebarBlock title={programDocuments.header} className="mb-5">
        <Links
          id={programDocuments.header}
          links={programDocuments.documents}
          label="program documents"
        />
      </SidebarBlock>
    }
    <SidebarBlock title="Manage Your Degree" className="mb-5">
      <p>Go to Georgia Tech portal to</p>
      <ul>
        <li>Add or drop courses</li>
        <li>Finance department</li>
        <li>Contact an advisor</li>
        <li>Get your grade</li>
        <li>Program wide discussions</li>
        <li>and more</li>
      </ul>
      <p>
        <a
          href="https://www.edx.org/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            sendTrackEvent('edx.learner_portal.school_portal_link.clicked');
          }}
        >
          Go to Georgia Tech portal
          <FontAwesomeIcon
            className="ml-2 text-primary"
            icon={faExternalLinkAlt}
            size="sm"
            aria-hidden={false}
            aria-label="opens in a new window"
          />
        </a>
      </p>
    </SidebarBlock>
    <SidebarBlock title="Get Technical Support">
      <p>
        <a
          href="https://www.edx.org/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            sendTrackEvent('edx.learner_portal.support_link.clicked');
          }}
        >
          Go to edX help center
          <FontAwesomeIcon
            className="ml-2 text-primary"
            icon={faExternalLinkAlt}
            size="sm"
            aria-hidden={false}
            aria-label="opens in a new window"
          />
        </a>
      </p>
    </SidebarBlock>
  </>
);

Sidebar.defaultProps = {
  programDocuments: null,
};

Sidebar.propTypes = {
  programDocuments: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.bool,
    header: PropTypes.string,
    documents: PropTypes.arrayOf(PropTypes.shape({
      display_text: PropTypes.string,
      document: PropTypes.string,
    })),
  })),
};

export default Sidebar;
