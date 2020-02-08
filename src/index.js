import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history'

import App from './components/App.jsx';
import Header from './components/Header.jsx';

import './index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route exact path='/' render={() => <Header><App /></Header>}></Route>
        </Switch>
    </Router>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
