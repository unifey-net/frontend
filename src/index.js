import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter, Switch } from "react-router-dom";

import "./assets/scss/base.scss";
import Header from "./global/Header";
import UserPage from "./handle/UserPage";
import PageHandler from "./handle/PageHandler";
import Home from "./pages/home";
import Footer from "./global/Footer";

ReactDOM.render(
        <BrowserRouter>
            <Header />
            <div className="container">
                <Switch>
                    <Route path='/@:user' component={UserPage}/>
                    <Route path='/:page' component={PageHandler}/>
                    <Route path='/' component={Home}/>
                    <Route component={() => 404} />
                </Switch>
            </div>
            <Footer />
        </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
