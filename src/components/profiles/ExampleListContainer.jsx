import React from 'react';
import PropTypes from 'prop-types';

const ExampleListContainer = ({ clickAction, userName }) => {
  return (
    <button
      onClick={() => {
        clickAction(userName);
      }}
      type="button"
    >
      {userName}
    </button>
  );
};

ExampleListContainer.propTypes = {
  clickAction: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
};

export default ExampleListContainer;
