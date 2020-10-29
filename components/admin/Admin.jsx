import { useHistory } from 'react-router-dom';
import React from 'react';

export default function Admin() {
  const history = useHistory();

  return (
    <React.Fragment>
      <div class="container">
        <h1>Select Method</h1>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <button class="card-link" onCLick={history.push('/admin/users')}>
                <div class="card-body">
                  <p class="card-title">Manage Users</p>
                  <p class="card-text">Add, edit, and delete users</p>
                </div>
              </button>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <button class="card-link" onClick={() => history.push('/admin/history')}>
                <div class="card-body">
                  <p class="card-title">Transaction History</p>
                  <p class="card-text">See log of inventory transactions</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}