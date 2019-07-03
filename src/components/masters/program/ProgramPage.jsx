import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import MediaQuery from 'react-responsive';
import { breakpoints, StatusAlert } from '@edx/paragon';
import { IntlProvider } from 'react-intl';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Hero from './Hero';
import { MainContent } from './main-content';
import { Sidebar } from './sidebar';
import { Layout, withAuthentication } from '../../common';

import './styles/ProgramPage.scss';

class ProgramPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validAccess: false,
    };
  }

  componentDidMount() {
    const enrolledPrograms = [
      {
        slug: 'exampleprogram',
        uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
      },
      {
        uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
        slug: 'another-program',
      },
      {
        slug: 'missingprogram',
        uuid: '11111111-bbbb-cccc-dddd-eeeeeeeeeeee',
      },
      {
        slug: 'missingprogram2',
        uuid: '22222222-bbbb-cccc-dddd-eeeeeeeeeeee',
      },
    ].map(program => program.uuid);
    this.validateAccess(enrolledPrograms);
  }

  validateAccess(programs) {
    const { programUUID } = this.props.pageContext;
    if (programs.includes(programUUID)) {
      this.setState({
        validAccess: true,
      });
    }
  }

  renderError() {
    return (
      <div className="container my-4">
        <StatusAlert
          alertType="danger"
          dialog={
            <div className="d-flex">
              <div>
                <FontAwesomeIcon className="mr-2" icon={faExclamationTriangle} />
              </div>
              <div>
                You are not authorized to view this page.
                This page is reserved for masters students only.
                You may access public edX courses on edx.org.
                If you are a masters student and believe you should have access,
                please contact your advisor at the university for further assistance.
              </div>
            </div>
            }
          dismissible={false}
          open
        />
      </div>
    );
  }

  render() {
    return (
      <IntlProvider locale="en">
        <Layout>
          {this.state.validAccess ? (
            <>
              <Helmet title="Master's Degree in Analytics" />
              <main id="content">
                <Hero
                  programTitle="Master's Degree in Analytics"
                  organizationLogo={{
                    url: 'https://www.edx.org/sites/default/files/school/image/logo/gtx-logo-200x101.png',
                    alt: 'Georgia Tech Institute of Technology logo',
                  }}
                  textureImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt-cyber-title_bg_img_440x400.jpg"
                  coverImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt_cyber_campus_image_1000x400.jpg"
                />
                <div className="container py-5">
                  <div className="row">
                    <div className="col-xs-12 col-lg-7">
                      <MainContent />
                    </div>
                    <MediaQuery minWidth={breakpoints.large.minWidth}>
                      {matches => matches && (
                        <aside className="col offset-lg-1">
                          <Sidebar />
                        </aside>
                      )}
                    </MediaQuery>
                  </div>
                </div>
              </main>
            </>
          ) : this.renderError()}
        </Layout>
      </IntlProvider>
    );
  }
}

ProgramPage.propTypes = {
  pageContext: PropTypes.shape({
    programName: PropTypes.string,
    programSlug: PropTypes.string,
    programUUID: PropTypes.string,
  }).isRequired,
};

export default withAuthentication(ProgramPage);
