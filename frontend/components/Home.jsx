import { useHistory } from 'react-router-dom';
import AdminOptions from './AdminOptions';
import React from 'react';

const onyen = 'jackg';
const isAdmin = true;

export default function Home() {
  const history = useHistory();

  return (
    <div class="container">
      <p>Hi {onyen}. Welcome to Carolina Closet!</p>

      {isAdmin && <AdminOptions />}
      
      <h2>Your Account</h2>
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <button class="card-link" onClick={() => history.push('/items')}>
              <div class="card-body">
                <p class="card-title">View Catalog & Preorder</p>
                <p class="card-text">Check out Carolina Closet's current inventory</p>
              </div>
            </button>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card">
            <button class="card-link" onClick={() => history.push('/history')}>
              <div class="card-body">
                <p class="card-title">Your Orders</p>
                <p class="card-text">View your preorders and order history</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}