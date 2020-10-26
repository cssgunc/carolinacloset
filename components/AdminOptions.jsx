import React from 'react';

export default function AdminOptions() {
  return (
    <React.Fragment>
      <h1>Admin</h1>
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <a class="card-link" href="/admin/history">
              <div class="card-body">
                <p class="card-title">Transaction History</p>
                <p class="card-text">See the history of transactions</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <a class="card-link" href="/admin/backup">
              <div class="card-body">
                <p class="card-title">Backup & Delete Data</p>
                <p class="card-text">Backupd and delete items and transactions</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <a class="card-link" href="/entry">
              <div class="card-body">
                <p class="card-title">Add & Remove Items</p>
                <p class="card-text">Update item counts in the inventory</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <a class="card-link" href="/preorders">
              <div class="card-body">
                <p class="card-title">Manage Preorders</p>
                <p class="card-text">Confirm and mark off completed preorders</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <a class="card-link" href="/entry/import">
              <div class="card-body">
                <p class="card-title">Import Items</p>
                <p class="card-text">Mass import items by uploading a CSV file</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}