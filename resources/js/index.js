import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import EditTask from './components/EditTask';

if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/:id/edit" component={EditTask} />
                    <App />
                </Switch>
            </div>
        </BrowserRouter>,

        document.getElementById('root')
    );
}
