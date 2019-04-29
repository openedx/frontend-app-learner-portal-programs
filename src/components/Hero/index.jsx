import React from 'react';
import PropTypes from 'prop-types';

import './Hero.scss';

const Hero = props => (
  <div className="hero-wrap">
    <div className="hero-flex">
      <div className="hero-texture" style={{ backgroundImage: `url(${props.textureImage})` }} />
      <div className="hero-img" style={{ borderColor: `#${props.bannerBorderColor}`, backgroundImage: `url(${props.coverImage})` }} />
    </div>
    <div className="hero-lrg-display">
      <div className="hero-box" style={{ borderColor: `#${props.bannerBorderColor}` }}>
        <h1 className="hero-heading">{props.courseTitle}</h1>
        <p className="hero-subheading">{props.organizationName}</p>
        <p className="hero-rank">{props.overallRanking}</p>
      </div>
      <img
        className="hero-logo"
        src={props.organizationLogo.url}
        alt={props.organizationLogo.alt}
      />
    </div>
  </div>
);

Hero.defaultProps = {
  bannerBorderColor: 'cc9900',
  overallRanking: null,
};

Hero.propTypes = {
  courseTitle: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  textureImage: PropTypes.string.isRequired,
  organizationLogo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }).isRequired,
  organizationName: PropTypes.string.isRequired,
  bannerBorderColor: PropTypes.string,
  overallRanking: PropTypes.string,
};

export default Hero;
