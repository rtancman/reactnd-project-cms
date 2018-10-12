import React from 'react';
import PropTypes from 'prop-types';

const NotFoundPage = () => {
  return (
    <div className="content" style={{textAlign: 'center'}}>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  )
}

NotFoundPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default NotFoundPage;