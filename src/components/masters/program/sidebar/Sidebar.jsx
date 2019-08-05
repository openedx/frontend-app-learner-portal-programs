import React from 'react';
import PropTypes from 'prop-types';
import { sendTrackEvent } from '@edx/frontend-analytics';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Links from './Links';
import SidebarBlock from './SidebarBlock';

const Sidebar = ({ programDocuments, programHomepage }) => (
  <>
    {programDocuments && programDocuments.display &&
      <SidebarBlock title={programDocuments.header} className="mb-5">
        <Links
          id={programDocuments.header.toLowerCase().split(' ').join('-')}
          links={programDocuments.documents}
          label="program documents"
        />
      </SidebarBlock>
    }
    {programHomepage && programHomepage.display &&
      <SidebarBlock title={programHomepage.header} className="mb-5">
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: programHomepage.description }} />
        <p>
          <a
            href={programHomepage.link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              sendTrackEvent('edx.learner_portal.school_portal_link.clicked');
            }}
          >
            {programHomepage.link.display_text}
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
    }
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
  programHomepage: null,
};

Sidebar.propTypes = {
  programDocuments: PropTypes.shape({
    display: PropTypes.bool,
    header: PropTypes.string,
    documents: PropTypes.arrayOf(PropTypes.shape({
      display_text: PropTypes.string,
      document: PropTypes.string,
    })),
  }),
  programHomepage: PropTypes.shape({
    header: PropTypes.string,
    link: PropTypes.shape({
      display_text: PropTypes.string,
      url: PropTypes.string,
    }),
    display: PropTypes.bool,
    description: PropTypes.string,
  }),
};

export default Sidebar;
