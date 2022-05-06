import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getNotices } from './api';
/**
 * This component uses the platform-plugin-notices plugin to function.
 * If the user has an unacknowledged notice, they will be rerouted off
 * programs dashboard and onto a full-screen notice page. If the plugin is not
 * installed, or there are no notices, we just passthrough this component.
 */
function NoticesProvider({ children }) {
  useEffect(() => {
    async function getData() {
      if (process.env.ENABLE_NOTICES) {
        const data = await getNotices();
        if (data && data.results && data.results.length > 0) {
          const { results } = data;
          window.location.replace(`${results[0]}?next=${window.location.href}`);
        }
      }
    }
    getData();
  }, []);

  return (
    <div>
      {children}
    </div>
  );
}

NoticesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoticesProvider;
