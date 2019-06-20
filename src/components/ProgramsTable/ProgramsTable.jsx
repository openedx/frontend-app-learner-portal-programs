import React from 'react';
import classNames from 'classnames';
import { navigate, StaticQuery, graphql } from 'gatsby';


const ProgramQuery = graphql`
query {
  site {
    siteMetadata {
      programs {
        uuid,
        name,
        slug
      }
    }
  }
}
`;

const ProgramsTable = () => (
  <StaticQuery
    query={ProgramQuery}
    render={data => (data.site.siteMetadata.programs.length > 1
          ? <ProgramsTable.Table programs={data.site.siteMetadata.programs} />
          : navigate(`${data.site.siteMetadata.programs[0].slug}`))}
  />
);

export default ProgramsTable;

ProgramsTable.Table = props => (
  <div className="container">
    <h1>Program List</h1>
    <div className="table-responsive">
      <table className={classNames('table', 'table-sm', 'table-striped')}>
        <thead>
          <tr>
            <th>Program Name</th>
          </tr>
        </thead>
        <tbody>
          {
            props.programs.map(program => (
              <tr key={program.uuid}>
                <td><a href={`${program.slug}`}>{program.name}</a></td>
              </tr>
                ))
        }
        </tbody>
      </table>
    </div>
  </div>
);
