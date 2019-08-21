import React from 'react';

class ExampleListItem extends React.Component {
	render() {
  	return (
      <button
        onClick={() => this.props.clickAction(this.props.userName)}
        >
          {this.props.userName}
      </button>
    );
  }
}

export default ExampleListItem;
