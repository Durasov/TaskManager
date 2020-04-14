import React, { Component } from "react";
import {Home} from './pages/Home'
import {Schoolkid} from './pages/Schoolkid'
import {Subject} from './pages/Subject'
import {Teacher} from './pages/Teacher'
import {Mark} from './pages/Mark'
import {Task} from './pages/Task'
import {CompletedTask} from './pages/CompletedTask'
import './App.css';
import {Navbar} from  "./components/Navbar";
import Helmet from "react-helmet"
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {auth: true};
    };

    render() {
        return (
            <Router>
                <Helmet>
                    <title>TaskManager</title>
                    <link rel="logo" href="logo.svg" type="image/svg"/>
                </Helmet>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/tasks' component={Task} />
                    <Route path='/completedTasks' component={CompletedTask} />
                </Switch>
            </Router>
        );
    }
}

export default App;

