import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import "./assets/scss/base.scss";
import "./assets/main.css"

import Community from "./view/community/Community";
import Tos from "./view/Tos";
import About from "./view/About";
import Communities from "./view/community/Communities";
import history from "./api/History";
import User from "./view/account/User";
import Login from "./view/account/Login";
import Home from "./view/Home";
import Logout from "./view/account/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Unsubscribed from "./view/Unsubscribed";
import Support from "./view/Support";
import ForgotPassword from "./view/settings/Forgot";
import NotFound from "./view/NotFound";

import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "./redux/actions/alert.actions";
import { message } from "antd";
import { isAutoDark } from "./api/Util";
import Settings from "./view/settings/Settings";
import Unverified from "./view/Unverified";
import Verify from "./view/settings/Verify";
import Beta from "./view/beta/Beta";
import BetaVerify from "./view/beta/BetaVerify"
import Durrburger from "./view/Durrburger";
import Privacy from "./view/Privacy";

export default function App() {
    const alert = useSelector((state) => state.alert);
    const theme = useSelector((state) => state.theme);
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

    let clazz = ""
    let use = ""

    switch (theme.theme) {
        case "light": {
            clazz = "page-container-light"
            use = "https://cdnjs.cloudflare.com/ajax/libs/antd/4.4.1/antd.css";
            break;
        }

        case "dark": {
            clazz = "page-container-dark"
            use = "https://cdnjs.cloudflare.com/ajax/libs/antd/4.4.1/antd.dark.css";
            break;
        }

        case "auto": {
            if (isAutoDark()) {
                clazz = "page-container-dark";
                use = "https://cdnjs.cloudflare.com/ajax/libs/antd/4.4.1/antd.dark.css";
            } else {
                clazz = "page-container-light";
                use = "https://cdnjs.cloudflare.com/ajax/libs/antd/4.4.1/antd.css";
            }

            break;
        }

        default: 
            break;
    }

    return (
        <Router history={history}>
            <link rel="stylesheet" type="text/css" href={use} />
            <div className={clazz}>
                <Header />
                <div className="content-container px-8 lg:px-0">
                    <Switch>
                        <Route path="/durrburger" exact component={Durrburger}/>
                        <Route path="/u/:name/:post" exact component={User} />
                        <Route
                            path="/c/:community/:post"
                            component={Community}
                            exact
                        />
                        <Route path="/u/:name" exact component={User} />
                        <Route path="/c/:community" exact component={Community} />

                        <Route exact path="/tos" component={Tos} />
                        <Route
                            exact
                            path="/unsubscribed"
                            component={Unsubscribed}
                        />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/support" component={Support} />
                        <Route
                            exact
                            path="/unverified"
                            component={Unverified}
                        />

                        <Route exact path="/settings" component={Settings} />

                        <Route
                            exact
                            path="/settings/forgot"
                            component={ForgotPassword}
                        />

                        <Route
                            exact
                            path="/settings/verify"
                            component={Verify}
                        />

                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/communities"
                            component={Communities}
                        />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />

                        <Route exact path="/beta" component={Beta} />
                        <Route
                            exact
                            path="/beta/verify"
                            component={BetaVerify}
                        />

                        <Route exact path="/privacy" component={Privacy} />

                        <Route component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    );
}
