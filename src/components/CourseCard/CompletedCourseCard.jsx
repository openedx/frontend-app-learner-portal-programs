import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatefulButton } from '@edx/paragon';

import BaseCourseCard from './BaseCourseCard';

import './CompletedCourseCard.scss';

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

  renderButtonLink = () => (
    <a href={this.props.linkToCourse} className="btn btn-outline-dark">
      View Course
    </a>
  );

  render() {
    return (
      <BaseCourseCard
        buttonLink={this.renderButtonLink()}
        hasEmailSettings={false}
        {...this.props}
      >
        <div className="completed row no-gutters">
          <div className="col-6">
            <p className="card-text font-weight-bold">
              Final Grade: {this.getFinalGrade()}
            </p>
            <StatefulButton
              state={this.state.downloadCertificateState}
              labels={{
                default: 'Download Certificate',
                pending: 'Downloading...',
                complete: 'Download complete!',
              }}
              icons={{
                default: <FontAwesomeIcon className="mr-2" icon="file" />,
                pending: <FontAwesomeIcon className="mr-2" icon="spinner" spin />,
                complete: <FontAwesomeIcon className="mr-2" icon="check" />,
              }}
              disabledStates={['pending']}
              className="btn-sm btn-block btn-light text-muted px-2 py-2 border"
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
