import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import HeaderContainer from './HeaderContainer';
import History from './History';

export default function App() {
    return (
        <React.Fragment>
          <Helmet>
            <title>Carolina Closet</title>
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
              <Route path='/history'>
                <History />
              </Route>
            </Switch>
          </BrowserRouter>
        </React.Fragment>
    ); // TODO add scripts
}