import { useHistory } from 'react-router-dom';
import React from 'react';

export default function Admin() {
  const history = useHistory();

  return (
    <React.Fragment>
      <div className="container">
        <h1>Select Method</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <button className="card-link" onCLick={history.push('/admin/users')}>
                <div className="card-body">
                  <p className="card-title">Manage Users</p>
                  <p className="card-text">Add, edit, and delete users</p>
                </div>
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <button className="card-link" onClick={() => history.push('/admin/history')}>
                <div className="card-body">
                  <p className="card-title">Transaction History</p>
                  <p className="card-text">See log of inventory transactions</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}