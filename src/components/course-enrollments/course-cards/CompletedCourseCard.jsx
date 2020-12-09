import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BaseCourseCard from './BaseCourseCard';

import CertificateImg from './images/edx-verified-mini-cert.png';

const CompletedCourseCard = props => (
  <BaseCourseCard type="completed" hasViewCertificateLink={false} {...props}>
    {props.linkToCertificate ? (
      <div className="d-flex mb-3">
        <div className="mr-3">
          <img src={CertificateImg} alt="verified certificate preview" />
        </div>
        <div className="d-flex align-items-center">
          <p className="mb-0 lead">
            View your certificate on
            {' '}
            <a className="text-underline" href={`${process.env.LMS_BASE_URL}/u/${props.username}`}>your profile →</a>
          </p>
        </div>
      </div>
    ) : (
      <p className="lead mb-3">
        To earn a certificate,
        {' '}
        <a className="text-underline" href={props.linkToCourse}>retake this course →</a>
      </p>
    )}
  </BaseCourseCard>
);

CompletedCourseCard.propTypes = {
  linkToCourse: PropTypes.string.isRequired,
  courseRunId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  linkToCertificate: PropTypes.string,
};

CompletedCourseCard.defaultProps = {
  linkToCertificate: null,
};

const mapStateToProps = state => ({
  username: state.userAccount.username,
});

export default connect(mapStateToProps)(CompletedCourseCard);
