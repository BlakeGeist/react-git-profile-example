import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import ExampleList from '../profiles/ExampleList';
import Form from '../features/Form';

const FormContainer = ({ userName, failedToFind, dispatch }, props) => {
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
      dispatch({ type: 'setItem', name: 'failedToFind', payload: true });
      setTimeout(() => {
        dispatch({ type: 'setItem', name: 'failedToFind', payload: false });
      }, 3000);
    }
    dispatch({ type: 'setItem', name: 'userName', payload: '' });
  };
  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        dispatch={dispatch}
      />
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

FormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  failedToFind: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(FormContainer);
