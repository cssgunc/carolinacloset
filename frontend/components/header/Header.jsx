import { useHistory } from 'react-router-dom';
import React from 'react';

const userType = 'admin';

export default function Header() {
  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a href="/"><img src="/frontend/static/logo.png" alt='Carolina Closet logo' /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userType && (
            <ul className="navbar-nav">
              {userType == 'admin' && (
                <React.Fragment>
                  <li className="nav-item rounded dropdown">
                    <a className="nav-link rounded dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Admin
                    </a>
                    <div className="dropdown-menu col-xs-12" aria-labelledby="navbarDropdown">
                      <a className="nav-link rounded" href="/preorders">Manage Preorders</a>
                      <a className="nav-link rounded" href="/entry">Manage Items</a>
                      <a className="nav-link rounded" href="/entry/import">Import Items</a>
                      <a className="nav-link rounded" href="/admin/users">Manage Users</a>
                      <a className="nav-link rounded" href="/admin/history">Transaction History</a>
                      <a className="nav-link rounded" href="/admin/backup">Backup & Delete Data</a>
                    </div>
                  </li>
                  <li className="nav-item rounded dropdown">
                    <a className="nav-link rounded dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Visitor
                    </a>
                    <div className="dropdown-menu col-xs-12" aria-labelledby="navbarDropdown">
                      <a className="nav-link rounded" href="/items">View Catalog & Preorder</a>
                      <a className="nav-link rounded" href="/history">Your Orders</a>
                    </div>
                  </li>
                </React.Fragment>
              )}
                  
              {userType == 'user' && (
                <React.Fragment>
                  <li className="nav-item rounded">
                    <a className="nav-link rounded" href="/items">View Catalog & Preorder</a>
                  </li>
                  <li className="nav-item rounded">
                    <a className="nav-link rounded" href="/history">Your Orders</a>
                  </li>
                </React.Fragment>
              )}
            </ul>
          )}

          <ul className="navbar-nav ml-auto">
            <li className="nav-item rounded">
              <button className="nav-link" onClick={() => history.push('/account/update')}>Update Account Info</button>
            </li>
            <li className="nav-item rounded float-right">
              <button className="nav-link" onClick={() => history.push('/cart')}><i className="fas fa-shopping-cart"></i>Cart</button>
            </li>
            <li className="nav-item rounded float-right">
              <button className="nav-link" onClick={() => window.location = 'https://sso.unc.edu/idp/logout.jsp'}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}