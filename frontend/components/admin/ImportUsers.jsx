import { useHistory } from 'react-router-dom';
import React from 'react';

export default function ImportUsers() {
  const history = useHistory();

  return (
    <div className="container">
      <div className="row">
        <button role="button" className="btn btn-primary float-left" onClick={() => history.push('/admin/users')}>
          Back to Users
        </button>
      </div>
      <div className="row">
        <h1>Import Users</h1>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="alert alert-secondary">
            <p>Expected formats:</p>
            <ul>
              <li>onyen, role [admin, volunteer, user, disabled], pid, email</li>
              <li>A file exported by this app will also work for import</li>
            </ul>
            <p>The following fields are required:</p>
            <ul>
              <li>onyen</li>
              <li>role</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form method="POST" encType="multipart/form-data">
            <label for="file">Upload a CSV file</label>
            <div className="form-group">
              <input type="file" className="form-control-file" id="file" name="file" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}