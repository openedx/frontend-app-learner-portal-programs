import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@edx/paragon';

function Links(props) {
  const { title, links, className } = props;

  const linkItems = links.map(link => (
    <li key={link.href}>
      <Icon className={['fa', 'fa-file', 'mr-2', 'text-primary']} />
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
