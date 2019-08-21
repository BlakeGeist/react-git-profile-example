import React from 'react';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ProfilesList from './ProfilesList';

class Profiles extends React.Component {
	render() {
  	return (
      <section className="profiles-container">
        <DndProvider backend={HTML5Backend}>
          <ProfilesList />
        </DndProvider>
      </section>
    );
  }
}

export default Profiles;
