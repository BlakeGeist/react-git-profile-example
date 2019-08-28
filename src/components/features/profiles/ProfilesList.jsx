import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Profile from './Profile';
import ProfilesControls from './ProfilesControls';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const ProfilesContainer = ({ profiles, dispatch }) => {
  const [profilesArray, setProfiles] = useState(profiles);
  if (profilesArray.length !== profiles.length) {
    setProfiles(profiles.filter(onlyUnique));
  }
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = profilesArray[dragIndex];
      const sortedProfiles = update(profilesArray, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      });
      setProfiles(
        sortedProfiles,
      );
      dispatch({ type: 'setItem', name: 'profiles', payload: sortedProfiles });
    },
    [profilesArray, dispatch],
  );

  const removeCard = (index) => {
    dispatch({ type: 'removeProfile', index });
  };

  const renderProfile = (profile, index) => {
    return (
      <Profile
        key={profile.id}
        id={profile.id}
        index={index}
        moveCard={moveCard}
        profilesCount={profilesArray.length}
        removeCard={removeCard}
        avatarUrl={profile.avatar_url}
        createdAt={profile.created_at}
        htmlUrl={profile.html_url}
        publicRepos={profile.public_repos}
        reposUrl={profile.repos_url}
        name={profile.name}
        company={profile.company}
        location={profile.location}
      />
    );
  };

  return (
    <>
      <ProfilesControls
        profiles={profilesArray}
        update={update}
        setProfiles={setProfiles}
      />
      <div className="profiles">
        {profilesArray.map((profile, i) => renderProfile(profile, i))}
      </div>
    </>
  );
};

ProfilesContainer.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  rawProfiles: state.rawProfiles,
  hasSearched: state.hasSearched
});
export default connect(mapStateToProps)(ProfilesContainer);
