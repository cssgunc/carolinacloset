import { useHistory } from 'react-router-dom';
import React from 'react';

export default function ImportUsers() {
  const history = useHistory();

  return (
    <div class="container">
      <div class="row">
        <button role="button" class="btn btn-primary float-left" onClick={() => history.push('/admin/users')}>
          Back to Users
        </button>
      </div>
      <div class="row">
        <h1>Import Users</h1>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="alert alert-secondary">
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
      <div class="row">
        <div class="col-sm-12">
          <form method="POST" encType="multipart/form-data">
            <label for="file">Upload a CSV file</label>
            <div class="form-group">
              <input type="file" class="form-control-file" id="file" name="file" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}