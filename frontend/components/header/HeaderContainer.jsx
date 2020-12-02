import Header from './Header';
import React from 'react';

const successAlert = '';
const errorAlert = '';

export default function HeaderContainer() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {successAlert && (
          <div className="alert alert-success" role="alert">
            <p>{successAlert}</p>
          </div>
        )}
        {errorAlert && (
          <div className="alert alert-danger" role="alert">
            <p>{errorAlert}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}