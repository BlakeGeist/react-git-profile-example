import React from 'react';
import ExampleListItem from './ExampleListItem';

class ExampleList extends React.Component {
	render() {
    //create an array that contains all of the gitHub accounts to be used in the examples
    const exampleUserAccounts = ['BlakeGeist', 'Reddit', 'Facebook', 'Google', 'GitHub'];
    //create a var that is the rendered template of an example list item
    const renderExampleListItem = (account, index) => {
      return (
        <ExampleListItem
          key={index}
          clickAction={this.props.clickAction}
          userName={account}
          />
      )
    }
  	return (
      <div className="examples-container">
        <div className="examples">
          <div className="examples-heading">Example Github Profiles</div>
          <div className="examples-body">
            {/*loop all of the items within the exampleUserAccounts array and display each rendered template*/}
            {exampleUserAccounts.map((account, i) => renderExampleListItem(account, i))}
          </div>
        </div>
      </div>
    );
  }
}

export default ExampleList;
