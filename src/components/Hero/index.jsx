import React from 'react';
import PropTypes from 'prop-types';

import './Hero.scss';

const Hero = props => (
  <div className="jumbotron jumbotron-fluid hero" style={{ backgroundImage: `url(${props.cover})` }}>
    <img className="logo" src={props.logo} alt="Enterprise logo" />
    <div className="offset-md-1">
      <p className="course-title">{props.courseTitle}</p>
      <p className="enterprise-name">by {props.name}</p>
    </div>
  </div>
);

Hero.propTypes = {
  courseTitle: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Hero;
