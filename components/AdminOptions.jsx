import React from 'react';
import { useHistory } from 'react-router-dom';
import BackupDeleteData from './BackupDeleteData';

export default function AdminOptions() {
  const history = useHistory();

  return (
    <React.Fragment>
      <h1>Admin</h1>
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <button class="card-link" onClick={() => history.push('/admin/users')}>
              <div class="card-body">
                <p class="card-title">Manage Users</p>
                <p class="card-text">Add, delete, and edit volunteers and admins</p>
              </div>
            </button>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <button class="card-link" onClick={() => history.push('/admin/history')}>
              <div class="card-body">
                <p class="card-title">Transaction History</p>
                <p class="card-text">See the history of transactions</p>
              </div>
            </button>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <button class="card-link" onClick={() => history.push('/admin/backup')}>
              <div class="card-body">
                <p class="card-title">Backup & Delete Data</p>
                <p class="card-text">Backup and delete items and transactions</p>
              </div>
            </button>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <button class="card-link" onClick={() => history.push('/entry')}>
              <div class="card-body">
                <p class="card-title">Add & Remove Items</p>
                <p class="card-text">Update item counts in the inventory</p>
              </div>
            </button>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <button class="card-link" onClick={() => history.push('/preorders')}>
              <div class="card-body">
                <p class="card-title">Manage Preorders</p>
                <p class="card-text">Confirm and mark off completed preorders</p>
              </div>
            </button>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <button class="card-link" onClick={() => history.push('/entry/import')}>
              <div class="card-body">
                <p class="card-title">Import Items</p>
                <p class="card-text">Mass import items by uploading a CSV file</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}