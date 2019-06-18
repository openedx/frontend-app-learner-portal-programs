import React, { Component } from 'react';
import classNames from 'classnames';

class MastersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someinfo: 0,
    };
  }
  render() {
    const masters = [{
      university: 'Georgia Tech',
      url: 'https://www.edx.org/',
      programName: 'Computer Science Program',
    }, {
      university: 'Georgia Tech',
      url: 'https://www.edx.org/',
      programName: 'Analytics Program',
    }];

    return (
      <div>
        <MastersTableItems masters={masters} />
      </div>
    );
  }
}

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
