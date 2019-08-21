import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

const Header = ({ title }) => {
  return (
    <section>
      <h1 className="heading">{title}</h1>
      <Form />
    </section>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
