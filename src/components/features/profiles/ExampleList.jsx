import React from 'react';
import PropTypes from 'prop-types';
import ExampleListItem from './ExampleListItem';

const ExampleList = ({ clickAction }) => {
  // create an array that contains all of the gitHub accounts to be used in the examples
  const exampleUserAccounts = ['BlakeGeist', 'Reddit', 'Facebook', 'Google', 'GitHub'];
  // create a var that is the rendered template of an example list item
  const renderExampleListContainer = (account, index) => {
    return (
      <ExampleListItem
        key={index}
        clickAction={clickAction}
        userName={account}
      />
    );
  };
  return (
    <div className="examples-container">
      <div className="examples">
        <div className="examples-heading">Example Github Profiles</div>
        <div className="examples-body">
          {
            /*
              loop all of the items within the exampleUserAccounts
              array and display each rendered template
            */
          }
          {exampleUserAccounts.map((account, i) => renderExampleListContainer(account, i))}
        </div>
      </div>
    </div>
  );
};

ExampleList.propTypes = {
  clickAction: PropTypes.func.isRequired,
};

export default ExampleList;
