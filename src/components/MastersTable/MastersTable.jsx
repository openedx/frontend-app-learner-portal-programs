import React, { Component } from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';

class MastersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someinfo: 0,
    };
  }
  render() {
    const master = ['hello'];
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
        {
                master.length < 2 ? <Redirect to="/" /> : 'Hello'
            }
      </div>

    //   master.length < 2 ? navigate('/') : null
    );
  }
}

export default MastersTable;

const MastersTableItems = () => (
  <>
    <h1> Master Degree List </h1>
    <div className="table-responsive">
      <table className={classNames('table', 'table-sm', 'table-striped')}>
        <tbody>
          <tr>
            <td>
                Hello
            </td>
          </tr>
          <tr>
            <td> GoodBye </td>
          </tr>
        </tbody>
      </table>
    </div>
  </>

);
