import React from 'react';

export default function AdminDatabase() {
  return (
    <div className="container">
      <h1>Factory Reset</h1>
      <p>Warning this will delete all data in your database and reset it to a clean slate. Please backup any data you want
        to keep before doing this.</p>
      <div className="row">
        <div className="col-sm-12">
          <button type="button" className="btn btn-danger btn-lg" data-toggle="modal" data-target="#delDataModal">Delete All
            Data</button>
        </div>
      </div>
      <div className="modal fade" id="delDataModal" tabindex="-1" role="dialog" aria-labelledby="delDataModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title" id="delDataModalLabel">Request a hold</p>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p><b>Please backup data before you delete them.</b> Once deleted, the data will not be recoverable.</p>
              <p>Are you sure you want to delete all data?</p>
              <button type="button" className="btn btn-secondary float-left" data-dismiss="modal">Cancel</button>
              <form method="POST" action="/admin/database">
                <div className="form-group">
                  <button className="btn btn-danger float-right" type="submit">Delete All Data</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}