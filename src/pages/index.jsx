import React from 'react';
import { IntlProvider } from 'react-intl';

import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero/Hero';

const IndexPage = () => (
  <IntlProvider locale="en">
    <Layout>
      <Hero
        courseTitle="Master's Degree in Analytics"
        organizationLogo={{
            url: 'https://www.edx.org/sites/default/files/school/image/logo/gtx-logo-200x101.png',
            alt: 'Organization Logo',
          }}
        textureImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt-cyber-title_bg_img_440x400.jpg"
        coverImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt_cyber_campus_image_1000x400.jpg"
      />
    </Layout>
  </IntlProvider>
);

export default IndexPage;
