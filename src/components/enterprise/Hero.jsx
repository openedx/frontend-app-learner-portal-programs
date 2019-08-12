import React from 'react';
import PropTypes from 'prop-types';

import { LayoutConsumer } from '../common';

import './styles/Hero.scss';

const Hero = () => (
  <LayoutConsumer>
    {({ pageContext }) => (
      <div className="hero">
        <div className="background d-flex">
          <div
            className="hero-texture d-none d-lg-block"
            style={{
            borderColor: `${pageContext.enterpriseBranding.banner_border_color}`,
            backgroundImage: `url(${pageContext.enterpriseBranding.texture_image})`,
          }}
          />
          <div
            className="hero-img"
            style={{
            borderColor: `${pageContext.enterpriseBranding.banner_border_color}`,
            backgroundImage: `url(${pageContext.enterpriseBranding.cover_image})`,
          }}
          />
        </div>
        <div className="container py-3">
          <div className="row">
            <div className="col-xs-9 col-lg-6">
              <div className="hero-box bg-white p-4 d-inline-block" style={{ borderColor: `${pageContext.enterpriseBranding.banner_border_color}` }}>
                <h1 className="hero-heading m-0">{pageContext.enterpriseName}</h1>
              </div>
            </div>
          </div>
          <div className="row hero-logo-wrapper">
            <div className="col-12 col-lg-4 offset-lg-8 text-lg-right">
              <div
                className="hero-logo bg-white pl-3 pr-5 d-sm-inline-block text-left"
                style={{
                borderColor: `${pageContext.enterpriseBranding.banner_border_color}`,
              }}
              >
                <img
                  src={pageContext.enterpriseBranding.organization_logo.url}
                  alt={pageContext.enterpriseBranding.organization_logo.alt}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  )}
  </LayoutConsumer>
);

export default Hero;
