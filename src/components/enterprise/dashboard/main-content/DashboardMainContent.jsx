import React, { useContext } from 'react';

import { AppContext } from '../../../common/app-context';
import { CourseEnrollments } from '../../../common/course-enrollments';
import { DashboardSidebar } from '../sidebar';

const DashboardMainContent = () => {
  const { pageContext: { enterpriseName } } = useContext(AppContext);
  return (
    <CourseEnrollments sidebarComponent={<DashboardSidebar />}>
      <h3>Browse courses</h3>
      <p>
        You are not enrolled in any courses sponsored by {enterpriseName}.
        To start taking a course, browse the catalog below.
      </p>
      <p>
        <a href={process.env.ENTERPRISE_CATALOG_MFE_URL} className="btn btn-primary">
          Browse full catalog
        </a>
      </p>
    </CourseEnrollments>
  );
};

export default DashboardMainContent;
