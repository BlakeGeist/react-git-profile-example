import React from 'react';
import PropTypes from 'prop-types';

const ProfileSort = ({ handleSort }) => {
  return (
    <div className="profiles-sort">
      <select onChange={handleSort}>
        <option>SortBy</option>
        <option value="name">Name</option>
        <option value="public_repos">Repos</option>
        <option value="addedAt">Time Added</option>
        <option value="created_at">Account Created Date</option>
      </select>
    </div>
  );
};

ProfileSort.propTypes = {
  handleSort: PropTypes.func.isRequired,
};

export default ProfileSort;
