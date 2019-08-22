import React from 'react';

import { CourseEnrollments } from '../../../common/course-enrollments';
import { DashboardSidebar } from '../sidebar';

const DashboardMainContent = () => (
  <CourseEnrollments sidebarComponent={<DashboardSidebar />} />
);

export default DashboardMainContent;
