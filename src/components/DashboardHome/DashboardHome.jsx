import React from 'react';

import Hero from '../Hero/Hero';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

import './DashboardHome.scss';

const DashboardHome = () => (
  <>
    <Hero
      programTitle="Master's Degree in Analytics"
      organizationLogo={{
        url: 'https://www.edx.org/sites/default/files/school/image/logo/gtx-logo-200x101.png',
        alt: 'Georgia Tech Institute of Technology logo',
      }}
      textureImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt-cyber-title_bg_img_440x400.jpg"
      coverImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt_cyber_campus_image_1000x400.jpg"
    />
    <div className="container py-5">
      <div className="row">
        <div className="col-xs-12 col-lg-8">
          <MainContent />
        </div>
        <div className="col">
          <Sidebar />
        </div>
      </div>
    </div>
  </>
);

export default DashboardHome;
