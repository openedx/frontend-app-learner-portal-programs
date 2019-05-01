import React from 'react';
import PropTypes from 'prop-types';

import './Hero.scss';

const Hero = props => (
  <div className="hero">
    <div className="background d-flex">
      <div
        className="hero-texture d-none d-lg-block"
        style={{
          borderColor: `#${props.bannerBorderColor}`,
          backgroundImage: `url(${props.textureImage})`,
        }}
      />
      <div
        className="hero-img"
        style={{
          borderColor: `#${props.bannerBorderColor}`,
          backgroundImage: `url(${props.coverImage})`,
        }}
      />
    </div>
    <div className="container py-3">
      <div className="row">
        <div className="col-xs-9 col-lg-6">
          <div className="hero-box bg-white p-4 d-inline-block" style={{ borderColor: `#${props.bannerBorderColor}` }}>
            <h1 className="hero-heading m-0">{props.courseTitle}</h1>
          </div>
        </div>
      </div>
      <div className="row hero-logo-wrapper">
        <div className="col-4 offset-lg-8 text-lg-right">
          <div
            className="hero-logo bg-white pl-3 pr-2 d-inline-block"
            style={{
              borderColor: `#${props.bannerBorderColor}`,
            }}
          >
            <img
              src={props.organizationLogo.url}
              alt={props.organizationLogo.alt}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// const Hero2 = props => (
//   <div className="hero-wrap">
//     <div className="hero-flex">
//       <div className="hero-texture" style={{ backgroundImage: `url(${props.textureImage})` }} />
//       <div className="hero-img" style={{ borderColor: `#${props.bannerBorderColor}`, backgroundImage: `url(${props.coverImage})` }} />
//     </div>
//     <div className="hero-lrg-display">
//       <div className="hero-box" style={{ borderColor: `#${props.bannerBorderColor}` }}>
//         <h1 className="hero-heading">{props.courseTitle}</h1>
//         <p className="hero-subheading">{props.organizationName}</p>
//         <p className="hero-rank">{props.overallRanking}</p>
//       </div>
//       <img
//         className="hero-logo"
//         src={props.organizationLogo.url}
//         alt={props.organizationLogo.alt}
//       />
//     </div>
//   </div>
// );

Hero.defaultProps = {
  bannerBorderColor: 'b2a369',
};

Hero.propTypes = {
  courseTitle: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  textureImage: PropTypes.string.isRequired,
  organizationLogo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }).isRequired,
  bannerBorderColor: PropTypes.string,
};

export default Hero;
