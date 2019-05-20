import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faFile, faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
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
      <li key={link.href} className="mb-1">
        <FontAwesomeIcon className="mr-2 text-primary" icon={faFile} />
        <a href={link.href} target="_blank" rel="noopener noreferrer">{link.title}</a>
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
    const {
      id,
      title,
      links,
      className,
    } = this.props;

    return (
      <section className={classNames('links', className)}>
        <h3 className="mb-3">{title}</h3>
        <nav>
          <ul id={id} className="list-unstyled mb-2">
            {this.getLinkItems()}
          </ul>
        </nav>
        {links.length > defaultNumLinksDisplayed && (
          <Button
            buttonType="link"
            className="toggle-show-all-btn px-0"
            onClick={this.handleToggleExpandedClick}
            aria-controls={id}
            aria-expanded={isExpanded}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={isExpanded ? faChevronCircleUp : faChevronCircleDown}
            />
            {isExpanded ? 'show less' : `show all ${links.length}`}
          </Button>
        )}
      </section>
    );
  }
}

Links.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string,
};

Links.defaultProps = {
  className: undefined,
};

export default Links;
