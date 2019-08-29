import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import moment from 'moment';
import { sendTrackEvent } from '@edx/frontend-analytics';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from '@edx/paragon';

import { LayoutContext } from '../../layout';
import { EmailSettingsModal } from './email-settings';

import './styles/CourseCard.scss';

class BaseCourseCard extends Component {
  static contextType = LayoutContext;

  state = {
    modals: {
      emailSettings: {
        open: false,
        options: {},
      },
    },
    hasEmailsEnabled: this.props.hasEmailsEnabled,
  };

  getDropdownMenuItems = () => {
    const { hasEmailsEnabled, title } = this.props;
    const dropdownMenuItems = [];
    if (hasEmailsEnabled !== null) {
      dropdownMenuItems.push({
        key: 'email-settings',
        type: 'button',
        onClick: this.handleEmailSettingsButtonClick,
        children: (
          <>
            Email settings
            <span className="sr-only">for {title}</span>
          </>
        ),
      });
    }
    return dropdownMenuItems;
  };

  getDateMessage = () => {
    const { type, pacing, endDate } = this.props;
    const formattedEndDate = endDate ? moment(endDate).format('MMMM D, YYYY') : null;
    let message = '';
    if (formattedEndDate) {
      switch (type) {
        case 'in_progress': {
          if (pacing === 'self') {
            message += `Complete at your own speed before ${formattedEndDate}.`;
          } else {
            message += `Ends ${formattedEndDate}.`;
          }
          break;
        }
        case 'upcoming': {
          message += `Ends ${formattedEndDate}.`;
          break;
        }
        case 'completed': {
          message += `Ended ${formattedEndDate}.`;
          break;
        }
        default:
          break;
      }
    }
    return message;
  };

  getCourseMiscText = () => {
    const { pacing } = this.props;
    const isCourseEnded = this.isCourseEnded();
    const dateMessage = this.getDateMessage();
    let message = '';
    if (pacing) {
      message += 'This course ';
      message += isCourseEnded ? 'was ' : 'is ';
      message += `${pacing}-paced. `;
    }
    if (dateMessage) {
      message += dateMessage;
    }
    return message;
  };

  setModalState = ({ key, open = false, options = {} }) => {
    this.setState(state => ({
      modals: {
        ...state.modals,
        [key]: {
          open,
          options,
        },
      },
    }));
  };

  isCourseEnded = () => {
    const { endDate } = this.props;
    return moment(endDate) < moment();
  };

  handleEmailSettingsButtonClick = () => {
    const {
      title,
      courseRunId,
    } = this.props;

    const {
      hasEmailsEnabled,
    } = this.state;

    this.setModalState({
      key: 'emailSettings',
      open: true,
      options: {
        title,
        hasEmailsEnabled,
      },
    });
    sendTrackEvent('edx.learner_portal.email_settings_modal.opened', { course_run_id: courseRunId });
  };

  handleEmailSettingsModalOnClose = (hasEmailsEnabled) => {
    this.resetModals();
    if (hasEmailsEnabled !== undefined) {
      this.setState({
        hasEmailsEnabled,
      });
    }
  };

  resetModals = () => {
    this.setModalState({ key: 'emailSettings' });
  };

  renderSettingsDropdown = (menuItems) => {
    if (menuItems && menuItems.length > 0) {
      return (
        <div className="col text-right">
          <Dropdown>
            <Dropdown.Button className="btn-outline-secondary">
              <FontAwesomeIcon icon={faCog} />
            </Dropdown.Button>
            <Dropdown.Menu>
              {menuItems.map(menuItem => (
                <Dropdown.Item
                  key={menuItem.key}
                  type={menuItem.type}
                  onClick={menuItem.onClick}
                >
                  {menuItem.children}
                </Dropdown.Item>
            ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    }
    return null;
  };

  renderEmailSettingsModal = () => {
    const { hasEmailsEnabled, courseRunId } = this.props;
    const { modals } = this.state;
    if (hasEmailsEnabled !== null) {
      return (
        <EmailSettingsModal
          {...modals.emailSettings.options}
          courseRunId={courseRunId}
          onClose={this.handleEmailSettingsModalOnClose}
          open={modals.emailSettings.open}
        />
      );
    }
    return null;
  };

  renderSponsoredByEnterpriseMessage = () => {
    const { pageContext: { pageType, enterpriseName } } = this.context;
    if (pageType === 'pages.EnterprisePage') {
      return <small>Sponsored by {enterpriseName}.</small>;
    }
    return null;
  };

  renderMicroMastersTitle = () => {
    const { microMastersTitle } = this.props;
    if (microMastersTitle) {
      return (
        <p className="font-weight-bold w-75 mb-2">
          {microMastersTitle}
        </p>
      );
    }
    return null;
  };

  renderOrganizationName = () => {
    const { orgName } = this.props;
    if (orgName) {
      return <p className="mb-0">{orgName}</p>;
    }
    return null;
  };

  renderChidren = () => {
    const { children } = this.props;
    if (children) {
      return (
        <div className="row">
          <div className="col mb-3">
            {children}
          </div>
        </div>
      );
    }
    return null;
  };

  renderButtons = () => {
    const { buttons } = this.props;
    if (buttons) {
      return (
        <div className="row">
          <div className="col mb-3">
            {buttons}
          </div>
        </div>
      );
    }
    return null;
  };

  renderViewCertificateText = () => {
    const { linkToCertificate, username } = this.props;
    if (linkToCertificate) {
      return (
        <small className="mb-0">
          View your certificate on
          {' '}
          <a href={`${process.env.LMS_BASE_URL}/u/${username}`}>your profile →</a>
        </small>
      );
    }
    return null;
  };

  render() {
    const {
      title,
      microMastersTitle,
      linkToCourse,
      hasViewCertificateLink,
    } = this.props;
    const dropdownMenuItems = this.getDropdownMenuItems();
    const shouldDisplaySettingsDropdown = dropdownMenuItems.length > 0;
    return (
      <div
        className={classNames(
          'course py-4 border-bottom',
          { 'is-micromasters': !!microMastersTitle },
        )}
      >
        <div className="row no-gutters">
          <div
            className={classNames(
              'mb-3',
              {
                'col-6 col-lg-8': shouldDisplaySettingsDropdown,
                col: !shouldDisplaySettingsDropdown,
              },
            )}
          >
            {this.renderMicroMastersTitle()}
            <h4 className="course-title mb-1">
              <a href={linkToCourse}>{title}</a>
            </h4>
            {this.renderOrganizationName()}
          </div>
          {this.renderSettingsDropdown(dropdownMenuItems)}
        </div>
        {this.renderButtons()}
        {this.renderChidren()}
        <div className="course-misc-text row">
          <div className="col text-gray">
            <small className="mb-0">
              {this.getCourseMiscText()}
            </small>
            {this.renderSponsoredByEnterpriseMessage()}
            {hasViewCertificateLink && this.renderViewCertificateText()}
          </div>
        </div>
        {this.renderEmailSettingsModal()}
      </div>
    );
  }
}

BaseCourseCard.propTypes = {
  type: PropTypes.oneOf([
    'in_progress', 'upcoming', 'completed',
  ]).isRequired,
  title: PropTypes.string.isRequired,
  linkToCourse: PropTypes.string.isRequired,
  courseRunId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  hasViewCertificateLink: PropTypes.bool,
  buttons: PropTypes.element,
  children: PropTypes.node,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  hasEmailsEnabled: PropTypes.bool,
  microMastersTitle: PropTypes.string,
  orgName: PropTypes.string,
  pacing: PropTypes.oneOf(['instructor', 'self']),
  linkToCertificate: PropTypes.string,
};

BaseCourseCard.defaultProps = {
  children: null,
  startDate: null,
  endDate: null,
  hasEmailsEnabled: null,
  microMastersTitle: null,
  orgName: null,
  pacing: null,
  buttons: null,
  linkToCertificate: null,
  hasViewCertificateLink: true,
};

const mapStateToProps = state => ({
  username: state.userAccount.username,
});

export default connect(mapStateToProps)(BaseCourseCard);
