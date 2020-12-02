import { useHistory } from 'react-router-dom';
import React from 'react';

export default function Entry() {
  const history = useHistory();

  return (
    <div className="container">
      <h1>Select Method</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <button className="card-link" onClick={() => history.push('/entry/search')}>
              <div className="card-body">
                <p className="card-title">Search Catalog</p>
                <p className="card-text">Add existing item by name</p>
              </div>
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <button className="card-link" onClick={() => history.push('/entry/manual')}>
              <div className="card-body">
                <p className="card-title">Manual Entry</p>
                <p className="card-text">Add a new item manually</p>
              </div>
            </button>
          </div>
        </div>
        <div className="col-md-4">
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
    </div>
  );
}