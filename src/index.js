import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import Login from './components/login';
import Register from './components/register';
import HomePage from './components/homepage';

ReactDOM.render(
    <div>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={HomePage} />
                <Route component={Login} />
            </Switch>
        </BrowserRouter>

    </div>,
    document.getElementById('login')
);
