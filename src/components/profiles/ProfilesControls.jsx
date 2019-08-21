import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfilesSearch from './ProfilesSearch';
import ProfileSort from './ProfileSort';

const ProfilesControls = ({
  profiles, update, setCards, dispatch, rawProfiles, hasSearched
}) => {
  const handleSort = (e) => {

    const sortedProfiles = profiles.sort((a, b) => {
      return (a[e.target.value] > b[e.target.value]) ? 1 : -1;
    });


    const updatedProfiles = update(profiles, {
      $set: sortedProfiles.slice(0),
    });
    setCards(
      updatedProfiles,
    );

    dispatch({ type: 'setItem', name: 'profiles', payload: updatedProfiles });
  };

  const handleSearch = (e) => {
    dispatch({ type: 'setItem', name: 'hasSearched', payload: true });
    if (!e.target.value) {
      const updatedProfiles = update(profiles, {
        $set: rawProfiles,
      });
      setCards(
        updatedProfiles,
      );
      dispatch({ type: 'setItem', name: 'profiles', payload: updatedProfiles });
      dispatch({ type: 'setItem', name: 'hasSearched', payload: false });
      return;
    }
    const filteredArray = rawProfiles.filter((itm) => {
      return itm.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
    });
    const updatedProfiles = update(profiles, {
      $set: filteredArray,
    });
    setCards(
      updatedProfiles,
    );
    dispatch({ type: 'setItem', name: 'profiles', payload: updatedProfiles });
  };

  return (
    <div className={profiles.length > 1 || hasSearched ? 'profiles-controls' : ''}>
      {profiles.length > 1 || hasSearched ? <ProfilesSearch handleSearch={handleSearch} /> : ''}
      {profiles.length > 1 ? <ProfileSort handleSort={handleSort} /> : ''}
    </div>
  );

};

ProfilesControls.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  update: PropTypes.func.isRequired,
  setCards: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  rawProfiles: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  hasSearched: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  hasSearched: state.hasSearched,
  rawProfiles: state.rawProfiles
});
export default connect(mapStateToProps)(ProfilesControls);
