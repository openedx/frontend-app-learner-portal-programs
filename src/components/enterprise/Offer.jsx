import React from 'react';
import moment from 'moment';

import './styles/Offer.scss';

const Offer = ({ title, expires, link }) => (
  <a href={link} className="offer card mb-3 d-block">
    <div className="card-body">
      <h5 className="card-title font-weight-bold h6">{title}</h5>
      <p className="card-text">
        Expires
        {' '}
        {moment(expires).format('MMMM D, YYYY')}
        {' '}
        {`(${moment(expires).diff(moment(), 'week')} weeks)`}
      </p>
    </div>
  </a>
);

export default Offer;
