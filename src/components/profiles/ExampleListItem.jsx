import React from 'react';
import PropTypes from 'prop-types';

const ExampleListItem = ({ clickAction, userName }) => {
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

ExampleListItem.propTypes = {
  clickAction: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
};

export default ExampleListItem;
