import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StatusAlert } from '@edx/paragon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Layout from '../Layout/Layout';

import { fetchUserProgramEnrollments } from '../user-program-enrollments';

class ProgramsTable extends Component {
  constructor(props) {
    super(props);
    const { programQueryData: programData } = this.props;
    this.programData = programData
      .filter(program => program.node.context && program.node.context.programUUID !== null)
      .map(program => ({
        uuid: program.node.context.programUUID,
        slug: program.node.context.programSlug,
        name: program.node.context.programName,
      }));
  }

  state = {
    validPrograms: [],
  };

  componentDidMount() {
    this.props.fetchUserProgramEnrollments();
  }

  componentDidUpdate(prevProps) {
    const { enrolledPrograms } = this.props;

    if (enrolledPrograms && enrolledPrograms !== prevProps.enrolledPrograms) {
      const validEnrolledPrograms = this.validateUserEnrolledPrograms(enrolledPrograms);

      if (validEnrolledPrograms.length === 1) {
        const program = this.programData.find(p => p.uuid === validEnrolledPrograms[0]);
        // TODO: combine with hostname here
        window.location.replace(`${program.hostname}/${program.slug}`);
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
    const programsList = this.programData.map(program => program.uuid);
    // list of program uuids that the user is enrolled in
    const enrolledProgramsList = enrolledPrograms
      .filter(program => programsList.includes(program.uuid))
      .map(program => ({
        ...program,
        name: this.programData.find(p => p.uuid === program.uuid).name,
        hostname: this.programData.find(p => p.uuid === program.uuid).hostname,
      }));

    console.log(enrolledProgramsList);

    return enrolledProgramsList;
  }

  renderError = ({ message }) => (
    <StatusAlert
      alertType="danger"
      dialog={
        <div className="d-flex">
          <div>
            <FontAwesomeIcon className="mr-2" icon={faExclamationTriangle} />
          </div>
          <div>{message}</div>
        </div>
      }
      dismissible={false}
      open
    />
  );

  render() {
    const { isLoading, error } = this.props;
    const { validPrograms } = this.state;

    return (
      <Layout>
        <div className="container my-4">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: 200 }}>
              <div className="spinner-border text-primary" role="status">
                <div className="sr-only">Loading program enrollments...</div>
              </div>
            </div>
          ) : (
            <>
              {error ? (
                this.renderError({
                  message: 'An error occurred while fetching your program enrollments. Please try again later.',
                })
              ) : (
                <>
                  {!validPrograms.length ? (
                    this.renderError({
                      message: (
                        <>
                          You are not authorized to view this page.
                          This page is reserved for Masters students only.
                          You may access public edX courses on <a href="https://www.edx.org">edx.org</a>.
                          If you are a Masters student and believe you should have access,
                          please contact your advisor at the university for further assistance.
                        </>
                      ),
                    })
                  ) : (
                    <>
                      <h1>My Programs</h1>
                      <div className="table-responsive mt-3">
                        <table className="table table-sm table-striped">
                          <thead>
                            <tr>
                              <th>Program</th>
                            </tr>
                          </thead>
                          <tbody>
                            {validPrograms.map(program => (
                              <tr key={program.uuid}>
                                <td><a href={`${program.slug}`}>{program.name}</a></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </Layout>
    );
  }
}

ProgramsTable.propTypes = {
  programQueryData: PropTypes.arrayOf(PropTypes.shape({
    node: PropTypes.shape({
      context: PropTypes.shape({
        programUUID: PropTypes.string,
        programName: PropTypes.string,
        programSlug: PropTypes.string,
        programHostname: PropTypes.string,
      }),
    }),
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchUserProgramEnrollments: PropTypes.func.isRequired,
  enrolledPrograms: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  })),
  error: PropTypes.instanceOf(Error),
};

ProgramsTable.defaultProps = {
  enrolledPrograms: null,
  error: null,
};

const mapStateToProps = state => ({
  isLoading: state.enrolledPrograms.loading,
  enrolledPrograms: state.enrolledPrograms.data,
  error: state.enrolledPrograms.error,
});

const mapDispatchToProps = dispatch => ({
  fetchUserProgramEnrollments: () => dispatch(fetchUserProgramEnrollments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsTable);
