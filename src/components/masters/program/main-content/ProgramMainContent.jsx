import React from 'react';

import { CourseEnrollments } from '../../../common/course-enrollments';
import { ProgramSidebar } from '../sidebar';

const ProgramMainContent = () => (
  <CourseEnrollments sidebarComponent={<ProgramSidebar />} />
);

export default ProgramMainContent;
