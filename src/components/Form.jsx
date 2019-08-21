import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import ExampleList from './profiles/ExampleList';

const Form = ({ userName, failedToFind, dispatch }, props) => {
  const handleSubmit = async (name, event) => {
    const apiCall = `https://api.github.com/users/${name}`;
    if (event) {
      event.preventDefault();
    }
    let data;
    await axios.get(apiCall)
      .then((resp) => {
        data = resp.data;
      })
      .catch((error) => {
      });
    if (data) {
      data.addedAt = moment().toDate();
      dispatch({ type: 'addProfile', profileData: data });
    } else {
      // props.dispatch({ type: 'setItem', name: 'failedToFind', payload: true });
      setTimeout(() => {
        // props.dispatch({ type: 'setItem', name: 'failedToFind', payload: false });
      }, 3000);
    }
    // props.dispatch({ type: 'setItem', name: 'userName', payload: '' });
  };
  return (
    <>
      <div className={`${failedToFind ? 'no-user-found' : ''} form-container`}>
        {failedToFind ? <div className="failed-to-find-text">Failed to Find User</div> : ''}
        <form onSubmit={(event) => handleSubmit(userName, event)}>
          <input
            type="text"
            value={userName}
            onChange={(event) => dispatch({ type: 'setItem', name: 'userName', payload: event.target.value })}
            placeholder="GitHub username"
            required
          />
          <button type="submit">Fetch GitHub Account by Username</button>
        </form>
      </div>
      <ExampleList clickAction={async (name, event) => {
        await dispatch({ type: 'setItem', name: 'userName', payload: name });
        handleSubmit(name);
      }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  failedToFind: state.failedToFind,
  userName: state.userName
});

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
  failedToFind: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Form);
