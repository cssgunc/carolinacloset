import { useHistory } from 'react-router-dom';
import AdminOptions from './AdminOptions';
import React from 'react';

const onyen = 'jackg';
const isAdmin = true;

export default function Home() {
  const history = useHistory();

  return (
    <div className="container">
      <p>Hi {onyen}. Welcome to Carolina Closet!</p>

      {isAdmin && <AdminOptions />}
      
      <h2>Your Account</h2>
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <button className="card-link" onClick={() => history.push('/items')}>
              <div className="card-body">
                <p className="card-title">View Catalog & Preorder</p>
                <p className="card-text">Check out Carolina Closet's current inventory</p>
              </div>
            </button>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <button className="card-link" onClick={() => history.push('/history')}>
              <div className="card-body">
                <p className="card-title">Your Orders</p>
                <p className="card-text">View your preorders and order history</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}