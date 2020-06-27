import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Route, Router, Switch } from "react-router-dom";

import "./assets/scss/base.scss";
import Header from "./global/Header";
import UserPage from "./handle/UserPage";
import PageHandler from "./handle/PageHandler";
import Home from "./pages/home";
import Footer from "./global/Footer";
import CommunityPage from "./handle/CommunityPage";

import history from "./handle/History"

ReactDOM.render(
    <Router history={history}>
        <Header />
        <div className="container">
            <Switch>
                <Route path="/u/:name" component={UserPage} />
                <Route path="/c/:community" component={CommunityPage} />
                <Route path="/:page" component={PageHandler} />
                <Route exact path="/" component={Home} />
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
