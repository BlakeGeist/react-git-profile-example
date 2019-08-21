import React from 'react'
import {connect} from "react-redux"
import ProfilesSearch from './ProfilesSearch'
import ProfileSort from './ProfileSort'

const ProfilesControls = (props) => {
  const handleSort = (e) => {
    const profiles = props.profiles.sort((a, b) => {
      return (a[e.target.value] > b[e.target.value]) ? 1 : -1
    })
    const dish = profiles.slice(0)
    const sortedCards = props.update(props.cards, {
      $set: dish,
    })
    props.setCards(
      sortedCards,
    )
    props.dispatch({ type: "setItem", name: 'profiles', payload: sortedCards})
  };

  const handleSearch = (e) => {
    props.dispatch({ type: "setItem", name: 'hasSearched', payload: true})
    if(!e.target.value){
      const sortedCards = props.update(props.cards, {
        $set: props.rawProfiles,
      })
      props.setCards(
        sortedCards,
      )
      props.dispatch({ type: "setItem", name: 'profiles', payload: sortedCards})
      props.dispatch({ type: "setItem", name: 'hasSearched', payload: false})
      return
    }
    let filteredArray = props.rawProfiles.filter(function(itm){
      return itm.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
    });
    const sortedCards = props.update(props.cards, {
      $set: filteredArray,
    })
    props.setCards(
      sortedCards,
    )
    props.dispatch({ type: "setItem", name: 'profiles', payload: sortedCards})
  }

  return (
    <div className={props.profiles.length > 1 || props.hasSearched ? "profiles-controls" : ''}>
      {props.profiles.length > 1 || props.hasSearched ? <ProfilesSearch handleSearch={handleSearch} /> : ''}
      {props.profiles.length > 1 ? <ProfileSort handleSort={handleSort} /> : ''}
    </div>
  );

}

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  hasSearched: state.hasSearched,
  rawProfiles: state.rawProfiles
})
export default connect(mapStateToProps)(ProfilesControls);
