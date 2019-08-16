const path = require('path');

const templates = {
  programListPage: path.resolve('./src/components/masters/programs-list/ProgramListPage.jsx'),
  programPage: path.resolve('./src/components/masters/program/ProgramPage.jsx'),
  enterprisePage: path.resolve('./src/components/enterprise/EnterprisePage.jsx'),
};

exports.templates = templates;
