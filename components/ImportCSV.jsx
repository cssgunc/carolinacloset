import React from 'react';

export default function ImportCSV() {
  return (
    <React.Fragment>
      <div class="container">
        <h1>Import Items</h1>
        <div class="row">
          <div class="col-sm-12">
            <div class="alert alert-secondary">
              <p>Expected formats:</p>
              <ul>
                <li>item name, barcode, quantity, item description</li>
                <li>item id, item name, barcode, count, item description, createdAt, updatedAt (export format)</li>
              </ul>
              <p>The following fields are required:</p>
              <ul>
                <li>item name</li>
                <li>count</li>
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
    </React.Fragment>
  );
}