import { useHistory } from 'react-router-dom';
import React from 'react';

const userType = 'admin';

export default function Header() {
  const history = useHistory();

  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a href="/"><img src="/static/logo.png" alt='Carolina Closet logo' /></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {userType && (
            <ul class="navbar-nav">
              {userType == 'admin' && (
                <React.Fragment>
                  <li class="nav-item rounded dropdown">
                    <a class="nav-link rounded dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Admin
                    </a>
                    <div class="dropdown-menu col-xs-12" aria-labelledby="navbarDropdown">
                      <a class="nav-link rounded" href="/preorders">Manage Preorders</a>
                      <a class="nav-link rounded" href="/entry">Manage Items</a>
                      <a class="nav-link rounded" href="/entry/import">Import Items</a>
                      <a class="nav-link rounded" href="/admin/users">Manage Users</a>
                      <a class="nav-link rounded" href="/admin/history">Transaction History</a>
                      <a class="nav-link rounded" href="/admin/backup">Backup & Delete Data</a>
                    </div>
                  </li>
                  <li class="nav-item rounded dropdown">
                    <a class="nav-link rounded dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Visitor
                    </a>
                    <div class="dropdown-menu col-xs-12" aria-labelledby="navbarDropdown">
                      <a class="nav-link rounded" href="/items">View Catalog & Preorder</a>
                      <a class="nav-link rounded" href="/history">Your Orders</a>
                    </div>
                  </li>
                </React.Fragment>
              )}
                  
              {userType == 'user' && (
                <React.Fragment>
                  <li class="nav-item rounded">
                    <a class="nav-link rounded" href="/items">View Catalog & Preorder</a>
                  </li>
                  <li class="nav-item rounded">
                    <a class="nav-link rounded" href="/history">Your Orders</a>
                  </li>
                </React.Fragment>
              )}
            </ul>
          )}

          <ul class="navbar-nav ml-auto">
            <li class="nav-item rounded">
              <button class="nav-link" onClick={() => history.push('/account/update')}>Update Account Info</button>
            </li>
            <li class="nav-item rounded float-right">
              <button class="nav-link" onClick={() => history.push('/cart')}><i class="fas fa-shopping-cart"></i>Cart</button>
            </li>
            <li class="nav-item rounded float-right">
              <button class="nav-link" onClick={() => window.location = 'https://sso.unc.edu/idp/logout.jsp'}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}