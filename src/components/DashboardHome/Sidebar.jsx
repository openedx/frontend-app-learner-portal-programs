import React from 'react';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Links from '../Links/Links';
import linksData from './sampleLinks';
import SidebarBlock from './SidebarBlock';

const Sidebar = () => (
  <>
    <SidebarBlock title="Program Documents" className="mb-4">
      <Links id={linksData.id} links={linksData.links} />
    </SidebarBlock>
    <SidebarBlock title="Manage Your Degree" className="mb-4">
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
        <a href="https://www.edx.org/" target="_blank" rel="noopener noreferrer">
          Go to Georgia Tech portal
          <FontAwesomeIcon className="text-primary" icon={faExternalLinkAlt} />
        </a>
      </p>
    </SidebarBlock>
    <SidebarBlock title="Get Technical Support">
      <p>
        <a href="https://www.edx.org/" target="_blank" rel="noopener noreferrer">
          Go to edX help center
          <FontAwesomeIcon className="text-primary" icon={faExternalLinkAlt} />
        </a>
      </p>
    </SidebarBlock>
  </>
);

export default Sidebar;
