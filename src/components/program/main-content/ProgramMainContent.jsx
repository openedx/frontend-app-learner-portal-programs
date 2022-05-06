import React from 'react';
import { CourseEnrollments } from '../../course-enrollments';

import { ProgramSidebar } from '../sidebar';

function ProgramMainContent() {
  return <CourseEnrollments sidebarComponent={<ProgramSidebar />} />;
}

export default ProgramMainContent;
