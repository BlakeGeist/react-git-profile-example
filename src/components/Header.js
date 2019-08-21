import React from 'react';
import Form from './Form';

class Header extends React.Component {
	render() {
  	return (
      <section>
         <h1 className="heading">{this.props.title}</h1>
         <Form />
      </section>
    );
  }
}

export default Header;
