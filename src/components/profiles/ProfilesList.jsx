import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Profile from './Profile';
import ProfilesControls from './ProfilesControls';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const ProfilesList = (props) => {
  const [profiles, setCards] = useState(props.profiles);
  if (profiles.length !== props.profiles.length) {
    setCards(props.profiles.filter(onlyUnique));
  }
  {
    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = profiles[dragIndex];
        const sortedCards = update(profiles, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        });
        setCards(
          sortedCards,
        );
        props.dispatch({ type: 'setItem', name: 'profiles', payload: sortedCards });
      },
      [profiles, props],
    );

    const removeCard = (index) => {
      props.dispatch({ type: 'removeProfile', index });
    };

    const renderProfile = (profile, index) => {
      return (
        <Profile
          key={profile.id}
          id={profile.id}
          index={index}
          moveCard={moveCard}
          profilesCount={profiles.length}
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
        { profiles.length > 0
          && (
          <ProfilesControls
            profiles={profiles}
            update={update}
            setCards={setCards}
          />
          )}
        <div className="profiles">
          {profiles.map((profile, i) => renderProfile(profile, i))}
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  rawProfiles: state.rawProfiles,
  hasSearched: state.hasSearched
});
export default connect(mapStateToProps)(ProfilesList);
