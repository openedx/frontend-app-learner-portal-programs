import React from 'react';
import PropTypes from 'prop-types';

import { withAuthentication } from '../common/with-authentication';
import { Layout, MainContent, Sidebar } from '../common/layout';
import { Hero } from '../common/hero';

const EnterprisePage = (props) => {
  const { pageContext } = props;
  const { enterpriseName } = pageContext;
  return (
    <Layout pageContext={props.pageContext}>
      <Hero title={enterpriseName} />
      <div className="container py-5">
        <div className="row">
          <MainContent>
            <p>Main Content</p>
          </MainContent>
          <Sidebar>
            <p>Sidebar</p>
          </Sidebar>
        </div>
      </div>
    </Layout>
  );
};

EnterprisePage.propTypes = {
  pageContext: PropTypes.shape({}).isRequired,
};

export default withAuthentication(EnterprisePage);
