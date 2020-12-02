import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TransactionHistory from './admin/TransactionHistory';
import BackupDeleteData from './admin/BackupDeleteData';
import HeaderContainer from './header/HeaderContainer';
import AdminDatabase from './admin/AdminDatabase';
import ManageUsers from './admin/ManageUsers';
import ManualEntry from './entry/ManualEntry';
import SearchEntry from './entry/SearchEntry';
import ImportItems from './entry/ImportItems';
import ImportUsers from './admin/ImportUsers';
import UpdateAccount from './UpdateAccount';
import OrderHistory from './OrderHistory';
import { Helmet } from 'react-helmet';
import Preorders from './Preorders';
import ViewItems from './ViewItems';
import Admin from './admin/Admin';
import Entry from './entry/Entry';
import Cart from './Cart';
import Home from './Home';
import React from 'react';

export default function App() {
    return (
        <React.Fragment>
          <Helmet>
            <title>Carolina Closet</title>
            <link rel="icon" href="/static/favicon.png" />
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <link
              rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossorigin="anonymous"
            />
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
              integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
              crossorigin="anonymous"
            />
            <link
              href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Merriweather|Open+Sans"
              rel="stylesheet"
            />
            <link
              href="/static/css/main.css"
              rel="stylesheet"
            />
            <link
              href="/static/css/index.css"
              rel="stylesheet"
            />
          </Helmet>
          <BrowserRouter>
            <HeaderContainer />
            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/account/update'>
                <UpdateAccount />
              </Route>
              <Route path='/admin/backup'>
                <BackupDeleteData />
              </Route>
              <Route path='/admin/database'>
                <AdminDatabase />
              </Route>
              <Route path='/admin/history'>
                <TransactionHistory />
              </Route>
              <Route path='/admin/users/import'>
                <ImportUsers />
              </Route>
              <Route path='/admin/users'>
                <ManageUsers />
              </Route>
              <Route path='/admin'>
                <Admin />
              </Route>
              <Route path='/cart'>
                <Cart />
              </Route>
              <Route path='/entry/import'>
                <ImportItems />
              </Route>
              <Route path='/entry/manual'>
                <ManualEntry />
              </Route>
              <Route path='/entry/search'>
                <SearchEntry />
              </Route>
              <Route path='/entry'>
                <Entry />
              </Route>
              <Route path='/history'>
                <OrderHistory />
              </Route>
              <Route path='/items'>
                <ViewItems />
              </Route>
              <Route path='/preorders'>
                <Preorders />
              </Route>
              <Route>
                <p>Page not found.</p>
              </Route>
            </Switch>
          </BrowserRouter>
        </React.Fragment>
    ); // TODO add scripts
}