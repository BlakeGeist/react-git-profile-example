import React from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import ExampleList from './profiles/ExampleList';
import moment from 'moment';

class Form extends React.Component {

	handleSubmit = async (event) => {
    if(event){
      event.preventDefault();
    }
    let data;
    await axios.get(`https://api.github.com/users/${this.props.userName}`)
      .then(function(resp) {
        data = resp.data;
      })
      .catch(function (error) {
        return
      });
    if(data){
			data.addedAt = moment().toDate();
      this.props.dispatch({ type: "addProfile", profileData: data})
    } else {
			this.props.dispatch({ type: "setItem", name: 'failedToFind', payload: true})
      setTimeout(() => {
				this.props.dispatch({ type: "setItem", name: 'failedToFind', payload: false})
      }, 3000)
    }
		this.props.dispatch({ type: "setItem", name: 'userName', payload: ''})
  };
	render() {
    let failedToFind = this.props.failedToFind;
  	return (
      <>
      <div className={`${failedToFind ? 'no-user-found' : ''} form-container`}>
        {failedToFind ? <div className="failed-to-find-text">Failed to Find User</div> : ''}
      	<form onSubmit={this.handleSubmit}>
      	  <input
            type="text"
            value={this.props.userName}
            onChange={event => this.props.dispatch({ type: "setItem", name: 'userName', payload: event.target.value})}
            placeholder="GitHub username"
            required
          />
          <button>Fetch GitHub Account by Username</button>
      	</form>
      </div>
      <ExampleList clickAction={async (userName) => {
        await this.props.dispatch({ type: "setItem", name: 'userName', payload: userName})
        this.handleSubmit()
        }}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  failedToFind: state.failedToFind,
  userName: state.userName
})
export default connect(mapStateToProps)(Form);
