import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import "./assets/scss/base.scss";
import Community from "./view/Community";
import Tos from "./view/Tos";
import About from "./view/About";
import Communities from "./view/Communities";
import history from "./api/History";
import User from "./view/User";
import Login from "./view/Login";
import Home from "./view/Home";
import Logout from "./view/Logout"

import store from "./redux/store";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAlert, alertInfo } from "./redux/action";
import NotFound from "./view/NotFound";
import { Alert, Button, message } from "antd";

export default function App() {
    const alert = useSelector((state) => state.alert);
    let dispatch = useDispatch();

    if (alert.message) {
        switch (alert.type) {
            case "info":
                message.info(alert.message, 2);
                dispatch(clearAlert());
                break;

            case "success":
                message.success(alert.message, 2);
                dispatch(clearAlert());
                break;

            case "warning":
                message.warning(alert.message, 2);
                dispatch(clearAlert());
                break;

            case "error":
                message.error(alert.message, 2);
                dispatch(clearAlert());
                break;

            default:
                break;
        }
    }

    return (
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
                    <Route exact path="/logout" component={Logout} />

                    <Route component={NotFound} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}
