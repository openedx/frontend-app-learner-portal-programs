import React from 'react';
import PropTypes from 'prop-types';

function MainContent(props) {
  return (
    <article className="col-xs-12 col-lg-7">
      {props.children}
    </article>
  );
}

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContent;
