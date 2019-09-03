import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { breakpoints } from '@edx/paragon';

import { MainContent, Sidebar } from '../../common/layout';
import { Hero } from '../../common/hero';
import { DashboardMainContent } from './main-content';
import { DashboardSidebar } from './sidebar';

const DashboardPage = (props) => {
  const { pageContext } = props;
  const { enterpriseName } = pageContext;
  return (
    <>
      <Hero title={enterpriseName} />
      <div className="container py-5">
        <div className="row">
          <MainContent>
            <DashboardMainContent />
          </MainContent>
          <MediaQuery minWidth={breakpoints.large.minWidth}>
            {matches => matches && (
              <Sidebar>
                <DashboardSidebar />
              </Sidebar>
            )}
          </MediaQuery>
        </div>
      </div>
    </>
  );
};

DashboardPage.propTypes = {
  pageContext: PropTypes.shape({
    enterpriseName: PropTypes.string,
  }).isRequired,
};

export default DashboardPage;
