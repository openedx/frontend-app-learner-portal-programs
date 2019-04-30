import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatefulButton } from '@edx/paragon';

import BaseCourseCard from './BaseCourseCard';

class CompletedCourseCard extends Component {
  state = {
    downloadCertificateState: 'default',
  };

  getFinalGrade = () => {
    const { grade: { hasPassed, numericGrade } } = this.props;
    const percentGrade = Math.round(numericGrade * 100);
    return (
      <span>
        {percentGrade}%
        {hasPassed && ' - Passed'}
      </span>
    );
  };

  render() {
    return (
      <BaseCourseCard hasEmailSettings={false} {...this.props}>
        <div className="completed row no-gutters">
          <div className="col-12">
            <p className="card-text font-weight-bold">
              Final Grade: {this.getFinalGrade()}
            </p>
            <StatefulButton
              state={this.state.downloadCertificateState}
              labels={{
                default: 'Download Certificate',
                pending: 'Downloading...',
                complete: 'Downloaded',
              }}
              icons={{
                default: <FontAwesomeIcon className="mr-2" icon="download" />,
                pending: <FontAwesomeIcon className="mr-2" icon="spinner" spin />,
                complete: <FontAwesomeIcon className="mr-2" icon="check-circle" />,
              }}
              disabledStates={['pending']}
              className="btn-primary"
              onClick={() => {
                this.setState({ downloadCertificateState: 'pending' });
                setTimeout(() => {
                  this.setState({ downloadCertificateState: 'complete' });
                  setTimeout(() => {
                    this.setState({ downloadCertificateState: 'default' });
                  }, 2000);
                }, 2000);
              }}
            />
            <a className="btn btn-outline-primary ml-2" href="/">View Course</a>
          </div>
        </div>
      </BaseCourseCard>
    );
  }
}

CompletedCourseCard.propTypes = {
  linkToCourse: PropTypes.string.isRequired,
  grade: PropTypes.shape({
    numericGrade: PropTypes.number.isRequired,
    hasPassed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CompletedCourseCard;
