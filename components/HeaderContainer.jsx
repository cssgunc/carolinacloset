import React from 'react';
import Header from './Header';

const successAlert = '';
const errorAlert = '';

export default function HeaderContainer() {
  return (
    <React.Fragment>
      <Header />
      <div class="container">
        {successAlert && (
          <div class="alert alert-success" role="alert">
            <p>{successAlert}</p>
          </div>
        )}
        {errorAlert && (
          <div class="alert alert-danger" role="alert">
            <p>{errorAlert}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}