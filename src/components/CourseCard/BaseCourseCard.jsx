import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CourseCard.scss';

const BaseCourseCard = (props) => {
  const {
    children,
    title,
    startDate,
    endDate,
    buttonLink,
    linkToCourse,
  } = props;
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row no-gutters mb-3">
          <div className="col-8">
            <h3 className="card-title mb-1 font-weight-normal">
              <a href={linkToCourse}>{title}</a>
            </h3>
            {startDate && (
              <p className="card-text">
                Course starts on {moment(startDate).format('MMMM D, YYYY')}
              </p>
            )}
            {endDate && (
              <p className="card-text">
                Course {moment(endDate) > moment() ? 'ends' : 'ended'} on {moment(endDate).format('MMMM D, YYYY')}
              </p>
            )}
          </div>
          <div className="col-4 text-right">
            {buttonLink}
          </div>
        </div>
        {children && children}
        <div className="row no-gutters">
          <button
            className="btn btn-link p-0"
            onClick={() => { /* open course settings modal here */ }}
          >
            <FontAwesomeIcon className="mr-2" icon={['fas', 'cog']} />
            Email settings
          </button>
        </div>
      </div>
    </div>
  );
};

BaseCourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLink: PropTypes.element.isRequired,
  linkToCourse: PropTypes.string.isRequired,
  children: PropTypes.node,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

BaseCourseCard.defaultProps = {
  children: null,
  startDate: null,
  endDate: null,
};

export default BaseCourseCard;
