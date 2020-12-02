import React from 'react';

export default function ImportItems() {
  return (
    <React.Fragment>
      <div className="container">
        <h1>Import Items</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="alert alert-secondary">
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
    </React.Fragment>
  );
}