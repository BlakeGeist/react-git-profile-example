import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Form = ({ userName, failedToFind, dispatch, handleSubmit }, props) => {
  return (
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
