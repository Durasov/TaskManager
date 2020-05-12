import React, { Component } from "react";
import {Home} from './pages/Home'
import {Task} from './pages/Task'
import {CompletedTask} from './pages/CompletedTask'
import './App.css';
import {Navbar} from  "./components/Navbar";
import Helmet from "react-helmet"
import logo from './logo.svg';
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import {createBrowserHistory} from 'history'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {auth: true};
    };

    render() {
        const history = createBrowserHistory()
        return (
            <Router history={history}>
                <Helmet>
                    <title>TaskManager</title>
                    <link rel="icon" href={logo} type="image/svg"/>
                </Helmet>
                <Navbar />
                <Switch>
                    <Route history={history} exact path='/taskManager' component={Home} />
                    <Route history={history} path='/tasks' component={Task} />
                    <Route history={history} path='/completedTasks' component={CompletedTask} />
                </Switch>
            </Router>
        );
    }
}

export default App;

