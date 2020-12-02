import { useHistory } from 'react-router-dom';
import React from 'react';

export default function AdminOptions() {
  const history = useHistory();

  return (
    <React.Fragment>
      <h1>Admin</h1>
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <button className="card-link" onClick={() => history.push('/admin/users')}>
              <div className="card-body">
                <p className="card-title">Manage Users</p>
                <p className="card-text">Add, delete, and edit volunteers and admins</p>
              </div>
            </button>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <button className="card-link" onClick={() => history.push('/admin/history')}>
              <div className="card-body">
                <p className="card-title">Transaction History</p>
                <p className="card-text">See the history of transactions</p>
              </div>
            </button>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <button className="card-link" onClick={() => history.push('/admin/backup')}>
              <div className="card-body">
                <p className="card-title">Backup & Delete Data</p>
                <p className="card-text">Backup and delete items and transactions</p>
              </div>
            </button>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <button className="card-link" onClick={() => history.push('/entry')}>
              <div className="card-body">
                <p className="card-title">Add & Remove Items</p>
                <p className="card-text">Update item counts in the inventory</p>
              </div>
            </button>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <button className="card-link" onClick={() => history.push('/preorders')}>
              <div className="card-body">
                <p className="card-title">Manage Preorders</p>
                <p className="card-text">Confirm and mark off completed preorders</p>
              </div>
            </button>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <button className="card-link" onClick={() => history.push('/entry/import')}>
              <div className="card-body">
                <p className="card-title">Import Items</p>
                <p className="card-text">Mass import items by uploading a CSV file</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}