import React, { useState, useCallback } from 'react'
import Profile from './Profile'
import update from 'immutability-helper'
import {connect} from "react-redux";
import ProfilesControls from './ProfilesControls'

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const ProfilesList = (props) => {
  const [profiles, setCards] = useState(props.profiles)
  if(profiles.length !== props.profiles.length){
    setCards(props.profiles.filter( onlyUnique ))
  }
  {
    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = profiles[dragIndex]
        const sortedCards = update(profiles, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        })
        setCards(
          sortedCards,
        )
        props.dispatch({ type: "setItem", name: 'profiles', payload: sortedCards})
      },
      [profiles, props],
    )

    const removeCard = (index) => {
      props.dispatch({ type: "removeProfile", index: index})
    }

    const renderProfile = (profile, index) => {
      return (
        <Profile
          key={profile.id}
          index={index}
          moveCard={moveCard}
          {...profile}
          profilesCount={profiles.length}
          removeCard={removeCard}
        />
      )
    }
    return (
      <>
      <ProfilesControls
        profiles={profiles}
        update={update}
        setCards={setCards}
        />
      <div className="profiles">
        {profiles.map((profile, i) => renderProfile(profile, i))}
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  rawProfiles: state.rawProfiles,
  hasSearched: state.hasSearched
})
export default connect(mapStateToProps)(ProfilesList);
