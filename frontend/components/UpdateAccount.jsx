import React from 'react';

const firstTime = '';
const pid = '1';
const email = 'admin@admin.com';

export default function UpdateAccount() {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {firstTime ? (
              <React.Fragment>
                <h1>Welcome to Carolina Closet!</h1>
                <p>Before you enter, please fill out some information about yourself. As a student organization, we use this information to track our growth and progress.</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h1>Update your Account Information</h1>
                <p>Here's the information we have on record right now. Please keep your info up to date.</p>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form action="/account/update" method="POST">
              <div className="form-group">
                <label for="pid">PID:</label>
                <input type="number" className="pid form-control" id="pid" name="pid" value={pid} />
              </div>
              <div className="form-group">
                <label for="email">Email Address:</label>
                <input type="email" className="form-control" id="email" name="email" value={email} />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}