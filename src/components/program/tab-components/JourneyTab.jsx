import React from 'react';
import MediaQuery from 'react-responsive';
import { breakpoints } from '@edx/paragon';

import { MainContent, Sidebar } from '../../layout';
import { ProgramMainContent } from '../main-content';
import { ProgramSidebar } from '../sidebar';


function JourneyTab() {
  return (
    <div className="container py-5">
      <div className="row">
        <MainContent>
          <ProgramMainContent />
        </MainContent>
        <MediaQuery minWidth={breakpoints.large.minWidth}>
          {matches => matches && (
          <Sidebar>
            <ProgramSidebar />
          </Sidebar>
            )}
        </MediaQuery>
      </div>
    </div>
  );
}

export default JourneyTab;
