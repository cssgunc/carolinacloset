import { useHistory } from 'react-router-dom';
import React from 'react';

export default function Entry() {
  const history = useHistory();

  return (
    <div class="container">
      <h1>Select Method</h1>
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <button class="card-link" onClick={() => history.push('/entry/search')}>
              <div class="card-body">
                <p class="card-title">Search Catalog</p>
                <p class="card-text">Add existing item by name</p>
              </div>
            </button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <button class="card-link" onClick={() => history.push('/entry/manual')}>
              <div class="card-body">
                <p class="card-title">Manual Entry</p>
                <p class="card-text">Add a new item manually</p>
              </div>
            </button>
          </div>
        </div>
        <div class="col-md-4">
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
    </div>
  );
}