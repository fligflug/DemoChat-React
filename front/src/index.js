import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {Home} from './pages/home/Home';
import {Chat} from './pages/chat/Chat';
import {NotFound} from './pages/notfound/NotFound';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';

export const history = createBrowserHistory({forceRefresh:true});

const routing = (
    <Router history={history}>
        <Switch>
            <Route exact path="/">
                { window.localStorage.getItem('nickname') ? <Redirect to="/chat" /> : <Home />}
            </Route>
            <Route path="/chat">
                { window.localStorage.getItem('nickname') ? <Chat /> : <Redirect to="/" />}
            </Route>
            <Route component={NotFound} />
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
