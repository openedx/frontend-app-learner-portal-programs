import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    hasEmailSettings,
    microMastersTitle,
  } = props;

  return (
    <div className={classNames('card mb-4', { 'is-micromasters': !!microMastersTitle })}>
      <div className="card-body">
        <div className="row no-gutters mb-3">
          <div className="col-xs-12 col-md-8">
            {microMastersTitle && (
              <p className="font-weight-bold w-75 mb-2">
                {microMastersTitle}
              </p>
            )}
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
          {buttonLink && (
            <div className="col-xs-12 col-md-4 text-md-right mt-3 mt-md-0">
              {buttonLink}
            </div>
          )}
        </div>
        {children && children}
        {hasEmailSettings && (
          <div className="row no-gutters">
            <button
              className="btn btn-link p-0"
              onClick={() => { /* open course settings modal here */ }}
            >
              <FontAwesomeIcon className="mr-2" icon={['fas', 'cog']} />
              Email settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

BaseCourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  linkToCourse: PropTypes.string.isRequired,
  buttonLink: PropTypes.element,
  children: PropTypes.node,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  hasEmailSettings: PropTypes.bool,
  microMastersTitle: PropTypes.string,
};

BaseCourseCard.defaultProps = {
  buttonLink: null,
  children: null,
  startDate: null,
  endDate: null,
  hasEmailSettings: true,
  microMastersTitle: null,
};

export default BaseCourseCard;
