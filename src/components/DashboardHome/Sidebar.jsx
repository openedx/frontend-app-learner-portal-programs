import React from 'react';

import Links from '../Links/Links';
import linksData from './sampleLinks';

const Sidebar = () => (
  <>
    <Links title={linksData.title} links={linksData.links} />
  </>
);

export default Sidebar;
