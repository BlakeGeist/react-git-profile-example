import React from 'react';

class Increment extends React.Component {
	render() {
  	return (
    	<div>
    	  <button
          onClick={this.props.handleClick}
          value={this.props.increment}
          >
            {unescape(this.props.text)}
          </button>
    	</div>
    );
  }
}

export default Increment;
