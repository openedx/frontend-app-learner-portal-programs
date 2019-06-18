import React from 'react';
import classNames from 'classnames';
import { graphql, StaticQuery } from 'gatsby';

const MastersQuery = graphql`
  query {
    site {
      siteMetadata {
        masters {
            university
            url
            programName
        }
      }
    }
  }
`;

const MastersTable = ({ children }) => (
  <StaticQuery
    query={MastersQuery}
    render={data => (
      <div>
        <MastersTableItems masters={data.site.siteMetadata.masters} />
      </div>

      )}
  />
);

export default MastersTable;

const MastersTableItems = props => (
  <>
    <h1> Master Degree List </h1>
    <div className="table-responsive">
      <table className={classNames('table', 'table-sm', 'table-striped')}>
        <thead>
          <tr>
            <th>University</th>
            <th>Program Name</th>
          </tr>
        </thead>
        <tbody>
          {
              props.masters.map(program => (
                <tr key={program.programName}>
                  <td>{program.university}</td>
                  <td><a href={`${program.url}`}>{program.programName}</a></td>
                </tr>
                  ))
          }
        </tbody>
      </table>
    </div>
  </>

);
