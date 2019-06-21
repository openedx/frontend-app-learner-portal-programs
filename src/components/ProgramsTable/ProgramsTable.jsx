import React, { Component } from 'react';
import classNames from 'classnames';
import { navigate } from 'gatsby';

import Layout from '../Layout/Layout';

class ProgramsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [
        {
          uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
          name: 'Example Program',
          slug: 'exampleprogram',
        },
        {
          uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
          name: 'Another Program',
          slug: 'another-program',
        },
      ],
    };
  }

  componentDidMount() {
    if (this.state.programs.length < 2) navigate(`${this.state.programs[0].slug}`);
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <h1>Program List</h1>
          <div className="table-responsive">
            <table className={classNames('table', 'table-sm', 'table-striped')}>
              <thead>
                <tr>
                  <th>Program</th>
                </tr>
              </thead>
              <tbody>
                {
              this.state.programs.map(program => (
                <tr key={program.uuid}>
                  <td><a href={`${program.slug}`}>{program.name}</a></td>
                </tr>
                  ))
          }
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ProgramsTable;
