import React, { Component } from 'react';
import classNames from 'classnames';
import { navigate } from 'gatsby';

class MastersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masters: [{
        university: 'Georgia Tech',
        url: '/',
        programName: 'Analytics Program',
      },
      {
        university: 'Georgia Tech',
        url: '/',
        programName: 'Computer Science Program',
      }],
    };
  }

  componentDidMount() {
    if (this.state.masters.length < 2) navigate(`${this.state.masters[0].url}`);
  }

  render() {
    return (
      <div>
        <MastersTableItems masters={this.state.masters} />
      </div>
    );
  }
}

export default MastersTable;

const MastersTableItems = props => (
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
  </div>

);
