import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

import { fetchUserProgramEnrollments } from '../user-program-enrollments';

import './styles/ProgramPage.scss';

class ProgramPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasProgramAccess: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserProgramEnrollments();
  }

  componentDidUpdate(prevProps) {
    const { enrolledPrograms } = this.props;

    if (enrolledPrograms && enrolledPrograms !== prevProps.enrolledPrograms) {
      this.validateProgramAccess(enrolledPrograms);
    }
  }

  validateProgramAccess = (programs) => {
    const { programUUID } = this.props.pageContext;
    if (programs.map(program => program.uuid).includes(programUUID)) {
      this.setState({
        hasProgramAccess: true,
      });
    }
  }

  renderError = () => (
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
              This page is reserved for Masters students only.
              You may access public edX courses on
              {' '}
              <a className="alert-link" href="https://edx.org">edX.org</a>.
              If you are a Masters student and believe you should have access,
              please contact your advisor at the university for further assistance.
            </div>
          </div>
          }
        dismissible={false}
        open
      />
    </div>
  );

  render() {
    const { hasProgramAccess } = this.state;
    const { pageContext, isLoading } = this.props;
    const { programUUID, programName } = pageContext;

    return (
      <IntlProvider locale="en">
        <Layout>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: 200 }}>
              <div className="spinner-border text-primary" role="status">
                <div className="sr-only">Loading program enrollments...</div>
              </div>
            </div>
          ) : (
            <>
              {hasProgramAccess ? (
                <>
                  <Helmet title={programName} />
                  <main id="content">
                    <Hero
                      programTitle={programName}
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
                          <MainContent programUUID={programUUID} />
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
              ) : (
                this.renderError()
              )}
            </>
          )}
        </Layout>
      </IntlProvider>
    );
  }
}

ProgramPage.propTypes = {
  pageContext: PropTypes.shape({
    programName: PropTypes.string.isRequired,
    programSlug: PropTypes.string.isRequired,
    programUUID: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchUserProgramEnrollments: PropTypes.func.isRequired,
  enrolledPrograms: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })),
};

ProgramPage.defaultProps = {
  enrolledPrograms: null,
};

const mapStateToProps = state => ({
  isLoading: state.enrolledPrograms.loading,
  enrolledPrograms: state.enrolledPrograms.data,
  error: state.enrolledPrograms.error,
});

const mapDispatchToProps = dispatch => ({
  fetchUserProgramEnrollments: () => dispatch(fetchUserProgramEnrollments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(ProgramPage));
