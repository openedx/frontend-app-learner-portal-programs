import React from 'react';
import { IntlProvider } from 'react-intl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero/Hero';
import InProgressCourseCard from '../components/CourseCard/InProgressCourseCard';
import UpcomingCourseCard from '../components/CourseCard/UpcomingCourseCard';
import CompletedCourseCard from '../components/CourseCard/CompletedCourseCard';

// Add icons to font-awesome library
library.add(fas);

const IndexPage = () => (
  <IntlProvider locale="en">
    <Layout>
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
            <div className="mb-5">
              <h2 className="mb-4">My Courses In Progress</h2>
              <InProgressCourseCard
                title="Advanced Analytics Thinking"
                endDate="2019-11-03"
                linkToCourse="https://edx.org"
              />
              <InProgressCourseCard
                title="Statistics for Analyics"
                endDate="2019-07-23"
                linkToCourse="https://edx.org"
                microMastersTitle="MicroMasters&reg; Program in Analytics: Essential Tools and Methods"
              />
            </div>
            <div className="mb-5">
              <h2 className="mb-4">Upcoming Courses</h2>
              <UpcomingCourseCard
                title="Predictive Analytics with Spark"
                startDate="2019-04-29"
                linkToCourse="https://edx.org"
              />
            </div>
            <div>
              <h2 className="mb-4">Completed Courses</h2>
              <CompletedCourseCard
                title="Big Data and How To Use It"
                endDate="2019-03-08"
                linkToCourse="https://edx.org"
                grade={{ hasPassed: true, numericGrade: 0.97 }}
              />
            </div>
          </div>
          <div className="col">
            Sidebar Content
          </div>
        </div>
      </div>
    </Layout>
  </IntlProvider>
);

export default IndexPage;
