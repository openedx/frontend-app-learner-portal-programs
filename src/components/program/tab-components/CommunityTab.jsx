import React from 'react';
import PropTypes from 'prop-types';

function CommunityTab({ iframeComponent }) {
  return (
    <div className="py-5">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: iframeComponent }} />
    </div>
  );
}

CommunityTab.propTypes = {
  iframeComponent: PropTypes.string.isRequired,
};

export default CommunityTab;
