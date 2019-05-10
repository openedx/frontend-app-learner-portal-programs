import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Links(props) {
  const { title, links, className } = props;

  const linkItems = links.map(link => (
    <li key={link.href}>
      <FontAwesomeIcon className="mr-2 text-primary" icon={faFile} />
      <a href={link.href} target="_blank" rel="noopener noreferrer">{link.title}</a>
    </li>
  ));

  return (
    <section className={classNames('links', className)}>
      <h3 className="mb-3">{title}</h3>
      <nav>
        <ul className="list-unstyled">
          {linkItems}
        </ul>
      </nav>
    </section>
  );
}

Links.propTypes = {
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
