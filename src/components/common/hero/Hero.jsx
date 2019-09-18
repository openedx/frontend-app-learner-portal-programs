import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from '../app-context';

import './styles/Hero.scss';

const Hero = (props) => {
  const {
    pageContext: {
      pageBranding,
    },
  } = useContext(AppContext);
  const { title } = props;

  return (
    <div className="hero">
      <div className="background d-flex">
        <div
          className="hero-texture d-none d-lg-block"
          style={{
            borderColor: `${pageBranding.banner_border_color}`,
            backgroundImage: `url(${pageBranding.texture_image})`,
          }}
        />
        <div
          className="hero-img"
          style={{
            borderColor: `${pageBranding.banner_border_color}`,
            backgroundImage: `url(${pageBranding.cover_image})`,
          }}
        />
      </div>
      <div className="container py-3">
        <div className="row">
          <div className="col-xs-9 col-lg-6">
            <div className="hero-box bg-white p-4 d-sm-inline-block" style={{ borderColor: `${pageBranding.banner_border_color}` }}>
              <h1 className="hero-heading m-0">{title}</h1>
            </div>
          </div>
        </div>
        <div className="row hero-logo-wrapper">
          <div className="col-12 col-lg-4 offset-lg-8 text-lg-right">
            <div
              className="hero-logo bg-white pl-3 pr-5 d-sm-inline-block text-left"
              style={{
                borderColor: `${pageBranding.banner_border_color}`,
              }}
            >
              <img
                src={pageBranding.organization_logo.url}
                alt={pageBranding.organization_logo.alt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Hero;
