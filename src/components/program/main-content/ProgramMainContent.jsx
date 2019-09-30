import React from 'react';
import { CourseEnrollments } from '@edx/frontend-learner-portal-base/src/components/course-enrollments';

import { ProgramSidebar } from '../sidebar';

const ProgramMainContent = () => (
  <CourseEnrollments sidebarComponent={<ProgramSidebar />} />
);

export default ProgramMainContent;
