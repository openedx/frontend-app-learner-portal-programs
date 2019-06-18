import React, { Component } from 'react';
import classNames from 'classnames';
import { navigate } from 'gatsby';

class MastersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masters: [{
        university: 'Georgia Tech',
        url: '/analytics',
        programName: 'Analytics Program',
      },
      {
        university: 'Georgia Tech',
        url: '/analytics',
        programName: 'Computer Science',
      }],
    };
  }

  componentDidMount() {
    if (this.state.masters.length < 2) navigate(`${this.state.masters[0].url}`);
  }

  render() {
    return (
      <div className="container">
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
                this.state.masters.map(program => (
                  <tr key={program.university.concat(program.programName)}>
                    <td>{program.university}</td>
                    <td><a href={`${program.url}`}>{program.programName}</a></td>
                  </tr>
                    ))
            }
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

export default MastersTable;
