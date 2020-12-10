import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sendTrackEvent } from '@edx/frontend-analytics';
import { faFile, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@edx/paragon';

class Links extends Component {
  state = {
    defaultNumLinksDisplayed: 5,
    isExpanded: false,
  };

  getLinkItems = () => {
    const { defaultNumLinksDisplayed, isExpanded } = this.state;
    let { links } = this.props;
    if (!isExpanded) {
      links = links.slice(0, defaultNumLinksDisplayed);
    }

    return links.map(link => (
      <li key={link.document || link.url} className="mb-1">
        <FontAwesomeIcon className="mr-2 text-info" icon={faFile} />
        <a
          href={link.document || link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            sendTrackEvent('edx.learner_portal.program_link.clicked', {
              title: link.display_text,
            });
          }}
        >
          {link.display_text}
        </a>
      </li>
    ));
  };

  handleToggleExpandedClick = () => {
    this.setState(state => ({
      isExpanded: !state.isExpanded,
    }));
  };

  render() {
    const { isExpanded, defaultNumLinksDisplayed } = this.state;
    const { id, links, label } = this.props;

    return (
      <>
        <nav aria-label={label}>
          <ul id={id} className="list-unstyled mb-2">
            {this.getLinkItems()}
          </ul>
        </nav>
        {links.length > defaultNumLinksDisplayed && (
          <Button
            variant="link"
            className="toggle-show-all-btn px-0"
            onClick={this.handleToggleExpandedClick}
            aria-controls={id}
            aria-expanded={isExpanded}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={isExpanded ? faChevronUp : faChevronDown}
            />
            <span>{isExpanded ? 'show less' : `show all ${links.length}`}</span>
          </Button>
        )}
      </>
    );
  }
}

Links.propTypes = {
  id: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    display_text: PropTypes.string.isRequired,
    document: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  label: PropTypes.string.isRequired,
};

export default Links;
