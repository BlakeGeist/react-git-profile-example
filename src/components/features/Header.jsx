import React from 'react';
import PropTypes from 'prop-types';
import FormContainer from '../containers/FormContainer';

const Header = ({ title }) => {
  return (
    <section>
      <h1 className="heading">{title}</h1>
      <FormContainer />
    </section>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
