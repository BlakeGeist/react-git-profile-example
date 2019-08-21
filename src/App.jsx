import React from 'react';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Profiles from './components/profiles/Profiles';

const initialState = {
  failedToFind: false,
  userName: '',
  profiles: [],
  rawProfiles: [],
  hasSearched: false
};

function profileDataFunction(profileDoesNotExist, profiles, state) {
  if (profileDoesNotExist) {
    return {
      ...state,
      profiles,
      rawProfiles: profiles
    };
  } else {
    return state;
  }
}

function reducer(state = initialState, action) {
  function removeProfileByIndex(index) {
    return state.profiles.filter((ele) => {
      return ele !== state.profiles[index];
    });
  }
  switch (action.type) {
    case 'setItem': {
      return {
        ...state,
        [action.name]: action.payload
      };
    }
    case 'addProfile': {
      const profileDoesNotExist = state.profiles.filter(
        (x) => { return x.id === action.profileData.id; }
      ).length < 1;

      const theProfiles = [...state.profiles, action.profileData];
      return profileDataFunction(profileDoesNotExist, theProfiles, state);
    }
    case 'removeProfile': {
      const profiles = removeProfileByIndex(action.index);
      return {
        ...state,
        profiles,
        rawProfiles: profiles
      };
    }
    default:
      return state;
  }
}
const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <div className="body">
        <Header title="The GitHub Cards App" />
        <Profiles />
      </div>
    </Provider>
  );
};

export default App;