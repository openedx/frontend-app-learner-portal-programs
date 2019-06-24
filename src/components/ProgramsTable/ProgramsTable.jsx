import React, { Component } from 'react';
import classNames from 'classnames';
import { navigate } from 'gatsby';

class ProgramsTable extends Component {
  constructor(props) {
    super(props);
    this.programData = this.props.programQueryData
      .filter(program => program.node.context.programUUID !== null)
      .map(program => (
        {
          uuid: program.node.context.programUUID,
          slug: program.node.context.programSlug,
          name: program.node.context.programName,
        }
      ));
  }

  componentDidMount() {
    // if user does not have correct program for the portal
    // they're trying to access, go to an unauthorized page

    // api call here
    // this tells us what programs the user is enrolled in so we
    // can compare it to what programs the deployed application
    // knows about
    const enrolledPrograms = [
      {
        slug: 'exampleprogram',
        uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
      },
      {
        uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
        slug: 'another-program',
      },
      {
        slug: 'missingprogram',
        uuid: '11111111-bbbb-cccc-dddd-eeeeeeeeeeee',
      },
      {
        slug: 'missingprogram2',
        uuid: '22222222-bbbb-cccc-dddd-eeeeeeeeeeee',
      },
    ];

    if (!this.userHasValidPrograms(enrolledPrograms)) {
      // render the 403 page
      console.log('Page to be put here');
    }
    if (this.programData.length < 2) navigate(`${this.programData[0].slug}`);
  }

  userHasValidPrograms(enrolledPrograms) {
    // list of program uuids that are part of this site
    const programsList = this.programData.map(program => program.uuid);
    // list of program uuids that the user is enrolled in
    const enrolledProgramsList = enrolledPrograms.map(program => program.uuid);
    // check if the user has program uuid matching the site's program uuids
    const found = programsList.some(r => enrolledProgramsList.indexOf(r) >= 0);
    return found;
  }

  render() {
    return (
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
              this.programData.map(program => (
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
  }
}

export default ProgramsTable;
