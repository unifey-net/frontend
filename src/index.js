import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Route, Router, Switch } from "react-router-dom";

import "./assets/scss/base.scss";
import Community from "./view/Community";
import Tos from "./view/Tos"
import About from "./view/About";
import Communities from "./view/Communities";
import history from "./api/History"
import User from "./view/User";
import Login from "./view/Login";
import Home from "./view/Home";

import Header from "./components/Header"
import Footer from "./components/Footer"

ReactDOM.render(
    <Router history={history}>
        <Header />
        <div className="container">
            <Switch>
                <Route path="/u/:name" component={User} />
                <Route path="/c/:community" component={Community} />

                <Route exact path="/tos" component={Tos} />
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/communities" component={Communities} />
                <Route exact path="/login" component={Login} />

                <Route component={() => 404} />
            </Switch>
        </div>
        <Footer />
    </Router>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
