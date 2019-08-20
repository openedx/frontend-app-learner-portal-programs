import React, { useContext } from 'react';
import { sendTrackEvent } from '@edx/frontend-analytics';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LayoutContext } from '../../../common/layout';
import Links from './Links';
import SidebarBlock from './SidebarBlock';

const ProgramSidebar = () => {
  const {
    pageContext: {
      programDocuments, externalProgramWebsite,
    },
  } = useContext(LayoutContext);

  return (
    <>
      {programDocuments && programDocuments.display && (
        <SidebarBlock title={programDocuments.header} className="mb-5">
          <Links
            id={programDocuments.header.toLowerCase().split(' ').join('-')}
            links={programDocuments.documents}
            label="program documents"
          />
        </SidebarBlock>
      )}
      {externalProgramWebsite && externalProgramWebsite.display && (
        <SidebarBlock title={externalProgramWebsite.header} className="mb-5">
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: externalProgramWebsite.description }} />
          <p>
            <a
              href={externalProgramWebsite.link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                sendTrackEvent('edx.learner_portal.school_portal_link.clicked');
              }}
            >
              {externalProgramWebsite.link.display_text}
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
      )}
      <SidebarBlock title="Get Technical Support">
        <p>
          <a
            href="https://support.edx.org/hc/en-us"
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
};

export default ProgramSidebar;
