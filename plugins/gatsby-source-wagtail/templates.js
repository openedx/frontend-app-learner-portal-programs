const path = require('path');

const templates = {
  programListPage: path.resolve('./src/components/masters/programs-list/ProgramListPage.jsx'),
  programPage: path.resolve('./src/components/masters/program/ProgramPage.jsx'),
  enterpriseDashboardPage: path.resolve('./src/components/enterprise/dashboard/DashboardPage.jsx'),
};

exports.templates = templates;
