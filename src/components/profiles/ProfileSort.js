import React from 'react';

const ProfileSort = (props) => {
  return(
    <div className="profiles-sort">
      <select onChange={props.handleSort}>
        <option>SortBy</option>
        <option value="name">Name</option>
        <option value="public_repos">Repos</option>
        <option value="addedAt">Time Added</option>
        <option value="created_at">Account Created Date</option>
      </select>
    </div>
  )
}

export default ProfileSort;
