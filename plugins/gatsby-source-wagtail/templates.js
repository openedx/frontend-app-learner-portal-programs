const path = require('path');

const templates = {
  programListPage: path.resolve('./src/components/masters/programs-list/ProgramListPage.jsx'),
  programPage: path.resolve('./src/components/masters/program/ProgramPage.jsx'),
  enterpriseApp: path.resolve('./src/components/enterprise/App.jsx'),
};

exports.templates = templates;
