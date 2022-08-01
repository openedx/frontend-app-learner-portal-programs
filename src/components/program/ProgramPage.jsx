/* eslint-disable react/jsx-no-useless-fragment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import MediaQuery from 'react-responsive';
import { breakpoints, StatusAlert } from '@edx/paragon';
import { sendPageEvent } from '@edx/frontend-platform/analytics';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Layout, MainContent, Sidebar } from '../layout';
import { LoadingSpinner } from '../loading-spinner';
import { MastersPage } from '../masters-page';
import { ProgramMainContent } from './main-content';
import { ProgramSidebar } from './sidebar';
import { Hero } from './hero';
import { fetchUserProgramEnrollments } from '../user-program-enrollments';
import { fetchProgramDiscussions, fetchProgramLiveSettings } from './data/actions';
import TabularView from './TabularView';

import './styles/ProgramPage.scss';

const headerLogo = process.env.LOGO_URL;
const footerLogo = process.env.LOGO_TRADEMARK_URL;

class ProgramPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasProgramAccess: false,
      showLegacyView: true,
    };
  }

  componentDidMount() {
    sendPageEvent();
    const { programUUID } = this.props.pageContext;
    this.props.fetchUserProgramEnrollments();
    this.props.fetchProgramDiscussions(programUUID);
    this.props.fetchProgramLiveSettings(programUUID);
  }

  componentDidUpdate(prevProps) {
    const {
      enrolledPrograms,
      tabViewEnabled,
      programDiscussions,
      liveSettings,
    } = this.props;

    if (enrolledPrograms && enrolledPrograms !== prevProps.enrolledPrograms) {
      this.validateProgramAccess(enrolledPrograms);
    }
    if ((tabViewEnabled && tabViewEnabled !== prevProps.tabViewEnabled)
      || programDiscussions.configured !== prevProps.programDiscussions.configured
      || liveSettings.configured !== prevProps.liveSettings.configured) {
      const switchTabView = tabViewEnabled
        && (programDiscussions.configured || liveSettings.configured);
      this.switchView(switchTabView);
    }
  }

  validateProgramAccess = (programs) => {
    const { programUUID } = this.props.pageContext;
    if (programs.map(program => program.uuid).includes(programUUID)) {
      this.setState({
        hasProgramAccess: true,
      });
    }
  };

  switchView = (tabViewEnabled) => {
    this.setState({
      showLegacyView: !tabViewEnabled,
    });
  };

  renderError = () => (
    <div className="container my-4">
      <StatusAlert
        alertType="danger"
        dialog={(
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
        )}
        dismissible={false}
        open
      />
    </div>
  );

  render() {
    const { hasProgramAccess, showLegacyView } = this.state;
    const {
      pageContext, isLoading, programDiscussions, liveSettings,
    } = this.props;
    const { programName } = pageContext;

    return (
      <MastersPage pageContext={pageContext}>
        <Layout headerLogo={headerLogo} footerLogo={footerLogo}>
          {isLoading ? (
            <div className="container py-5">
              <div className="col">
                <LoadingSpinner screenReaderText="loading program enrollments" />
              </div>
            </div>
          ) : (
            <>
              {hasProgramAccess ? (
                <>
                  <Helmet title={programName} />
                  <Hero title={programName} />
                  {showLegacyView
                    ? (
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
                    )
                    : (
                      <TabularView
                        programDiscussions={programDiscussions}
                        liveSettings={liveSettings}
                      />
                    )}
                </>
              ) : (
                this.renderError()
              )}
            </>
          )}
        </Layout>
      </MastersPage>
    );
  }
}

ProgramPage.propTypes = {
  pageContext: PropTypes.shape({
    programName: PropTypes.string.isRequired,
    programSlug: PropTypes.string.isRequired,
    programUUID: PropTypes.string.isRequired,
    programBranding: PropTypes.shape({
      cover_image: PropTypes.string,
      banner_border_color: PropTypes.string,
      texture_image: PropTypes.string,
      organization_logo: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      }),
    }),
    programDocuments: PropTypes.shape({
      display: PropTypes.bool,
      header: PropTypes.string,
      documents: PropTypes.arrayOf(PropTypes.shape({
        display_text: PropTypes.string,
        document: PropTypes.string,
        url: PropTypes.string,
      })),
    }),
    externalProgramWebsite: PropTypes.shape({
      header: PropTypes.string,
      link: PropTypes.shape({
        display_text: PropTypes.string,
        url: PropTypes.string,
      }),
      display: PropTypes.bool,
      description: PropTypes.string,
    }),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchUserProgramEnrollments: PropTypes.func.isRequired,
  fetchProgramDiscussions: PropTypes.func.isRequired,
  fetchProgramLiveSettings: PropTypes.func.isRequired,
  tabViewEnabled: PropTypes.bool,
  programDiscussions: PropTypes.shape({
    configured: PropTypes.bool,
    iframe: PropTypes.string,
  }),
  liveSettings: PropTypes.shape({
    configured: PropTypes.bool,
    iframe: PropTypes.string,
  }),
  enrolledPrograms: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })),
};

ProgramPage.defaultProps = {
  tabViewEnabled: false,
  enrolledPrograms: null,
  programDiscussions: { },
  liveSettings: { },
};

const mapStateToProps = state => ({
  isLoading: state.enrolledPrograms.loading || state.programSettings.loading > 0,
  enrolledPrograms: state.enrolledPrograms.data,
  programDiscussions: state.programSettings.discussionData.discussion,
  liveSettings: state.programSettings.liveData.live,
  tabViewEnabled: state.programSettings.discussionData.tabViewEnabled,
  error: state.enrolledPrograms.error,
});

const mapDispatchToProps = dispatch => ({
  fetchUserProgramEnrollments: () => dispatch(fetchUserProgramEnrollments()),
  fetchProgramDiscussions: programUUID => dispatch(fetchProgramDiscussions(programUUID)),
  fetchProgramLiveSettings: programUUID => dispatch(fetchProgramLiveSettings(programUUID)),
});

const ConnectedProgramPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgramPage);

export default ConnectedProgramPage;
