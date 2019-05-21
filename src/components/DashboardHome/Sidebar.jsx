import React from 'react';

import Links from '../Links/Links';
import linksData from './sampleLinks';

const Sidebar = () => (
  <>
    <Links id={linksData.id} title={linksData.title} links={linksData.links} />
  </>
);

export default Sidebar;
