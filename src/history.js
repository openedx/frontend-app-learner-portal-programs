import { createBrowserHistory, createMemoryHistory } from 'history';

const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const history = isServer ? createMemoryHistory({}) : createBrowserHistory();

export default history;
