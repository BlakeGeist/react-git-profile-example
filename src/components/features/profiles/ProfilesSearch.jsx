import React from 'react';
import PropTypes from 'prop-types';

const ProfilesSearch = ({ handleSearch }) => {
  return (
    <div>
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search..."
        />
    </div>
  );
};

ProfilesSearch.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default ProfilesSearch;
