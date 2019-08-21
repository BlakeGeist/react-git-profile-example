import React from 'react';

const ProfilesSearch = (props) => {
  return(
    <div>
      <input onChange={props.handleSearch} type="text" placeholder="Search..." />
    </div>
  )
}

export default ProfilesSearch;
