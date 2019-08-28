import React from 'react';
import PropTypes from 'prop-types';

const Increment = ({ handleClick, increment, text }) => {
  return (
    <div>
      <button
        onClick={handleClick}
        value={increment}
        type="button"
      >
        {unescape(text)}
      </button>
    </div>
  );
};

Increment.propTypes = {
  handleClick: PropTypes.func.isRequired,
  increment: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Increment;
