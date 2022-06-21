/* eslint-disable react/jsx-no-useless-fragment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendPageEvent } from '@edx/frontend-platform/analytics';
import { Alert } from '@edx/paragon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout } from '../layout';
import { LoadingSpinner } from '../loading-spinner';

import { MastersPage } from '../masters-page';

import { fetchUserProgramEnrollments } from '../user-program-enrollments';

import './styles/ProgramListPage.scss';

const headerLogo = process.env.LOGO_URL;
const footerLogo = process.env.LOGO_TRADEMARK_URL;

export class ProgramListPage extends Component {
  constructor(props) {
    super(props);
    const { programs } = this.props.pageContext;
    this.programData = programs
      .filter((program) => program.programUUID !== null)
      .map((program) => ({
        uuid: program.programUUID,
        slug: program.programSlug,
        name: program.programName,
        hostname: program.programHostname,
      }));
    this.state = {
      validPrograms: null,
    };
  }

  componentDidMount() {
    sendPageEvent();
    this.props.fetchUserProgramEnrollments();
  }

  componentDidUpdate(prevProps) {
    const { enrolledPrograms } = this.props;

    if (enrolledPrograms && enrolledPrograms !== prevProps.enrolledPrograms) {
      const validEnrolledPrograms = this.validateUserEnrolledPrograms(
        enrolledPrograms,
      );

      if (validEnrolledPrograms.length === 1) {
        const program = validEnrolledPrograms[0];
        window.location.replace(`/${program.hostname}/${program.slug}`);
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          validPrograms: validEnrolledPrograms,
        });
      }
    }
  }

  validateUserEnrolledPrograms = (enrolledPrograms) => {
    // list of program uuids that are part of this site
    const programsList = this.programData.map((program) => program.uuid);
    // list of program uuids that the user is enrolled in
    const enrolledProgramsList = enrolledPrograms
      .filter((program) => programsList.includes(program.uuid))
      .map((program) => {
        const programInDesigner = this.programData.find(
          (p) => p.uuid === program.uuid,
        );
        return {
          ...programInDesigner,
        };
      });

    return enrolledProgramsList;
  };

  errorIcon = () => <FontAwesomeIcon className="mr-2" icon={faExclamationTriangle} />;

  renderError = ({ message }) => (
    <Alert
      variant="danger"
      icon={this.errorIcon}
      dismissible={false}
      show
    >
      <div className="d-flex">
        {message}
      </div>
    </Alert>
  );

  render() {
    const { isLoading, error, pageContext } = this.props;
    const { validPrograms } = this.state;

    return (
      <MastersPage pageContext={pageContext}>
        {isLoading ? (
          <Layout headerLogo={headerLogo} footerLogo={footerLogo}>
            <div className="container my-4">
              <LoadingSpinner screenReaderText="loading program enrollments" />
            </div>
          </Layout>
        ) : (
          <>
            {error ? (
              <Layout headerLogo={headerLogo} footerLogo={footerLogo}>
                <div className="container my-4">
                  {this.renderError({
                    message:
                      'An error occurred while fetching your program enrollments. Please try again later.',
                  })}
                </div>
              </Layout>
            ) : (
              <>
                {validPrograms && (
                  <Layout headerLogo={headerLogo} footerLogo={footerLogo}>
                    {!validPrograms.length ? (
                      <div className="container my-3">
                        {this.renderError({
                          message: (
                            <>
                              You are not authorized to view this page. This
                              page is reserved for Masters students only. You
                              may access public edX courses on{' '}
                              <a
                                className="alert-link"
                                href="https://www.edx.org"
                              >
                                edX.org
                              </a>
                              . If you are a Masters student and believe you
                              should have access, please contact your advisor at
                              the university for further assistance.
                            </>
                          ),
                        })}
                      </div>
                    ) : (
                      <div className="container my-3">
                        <h1 className="title-override">My Programs</h1>
                        <div className="table-responsive mt-3">
                          <table className="table table-sm table-striped">
                            <thead>
                              <tr>
                                <th>Program</th>
                              </tr>
                            </thead>
                            <tbody>
                              {validPrograms.map((program) => (
                                <tr key={program.uuid}>
                                  <td>
                                    <a
                                      href={`/${program.hostname}/${
                                        program.slug
                                      }`}
                                    >
                                      {program.name}
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </Layout>
                )}
              </>
            )}
          </>
        )}
      </MastersPage>
    );
  }
}

ProgramListPage.propTypes = {
  pageContext: PropTypes.shape({
    programs: PropTypes.arrayOf(
      PropTypes.shape({
        programUUID: PropTypes.string,
        programName: PropTypes.string,
        programSlug: PropTypes.string,
        programHostname: PropTypes.string,
      }),
    ),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchUserProgramEnrollments: PropTypes.func.isRequired,
  enrolledPrograms: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    }),
  ),
  error: PropTypes.instanceOf(Error),
};

ProgramListPage.defaultProps = {
  enrolledPrograms: null,
  error: null,
};

const mapStateToProps = (state) => ({
  isLoading: state.enrolledPrograms.loading,
  enrolledPrograms: state.enrolledPrograms.data,
  error: state.enrolledPrograms.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProgramEnrollments: () => dispatch(fetchUserProgramEnrollments()),
});

const ConnectedProgramListPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgramListPage);

export default ConnectedProgramListPage;
