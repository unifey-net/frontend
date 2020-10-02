import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import "./assets/scss/base.scss";
import "./assets/main.css";

import Community from "./view/community/community/Community";
import Tos from "./view/Tos";
import About from "./view/About";
import Communities from "./view/community/communities/Communities";
import history from "./api/History";
import User from "./view/settings/user/User";
import Login from "./view/account/Login";
import Home from "./view/home/Home";
import Logout from "./view/account/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Unsubscribed from "./view/Unsubscribed";
import Support from "./view/Support";
import ForgotPassword from "./view/settings/forgot/Forgot";
import NotFound from "./view/NotFound";

import { useSelector } from "react-redux";
import { isAutoDark } from "./api/Util";
import Settings from "./view/settings/settings/Settings";
import Unverified from "./view/Unverified";
import Verify from "./view/settings/verify/Verify";
import Privacy from "./view/Privacy";
import ModerateCommunity from "./view/community/community/moderate/ModerateCommunity";

export default function App() {
    const theme = useSelector((state) => state.theme);

    let clazz = "";
    let use = "";

    switch (theme.theme) {
        case "light": {
            clazz = "page-container-light";
            use = "https://cdnjs.cloudflare.com/ajax/libs/antd/4.4.1/antd.css";
            break;
        }

        case "dark": {
            clazz = "page-container-dark";
            use =
                "https://cdnjs.cloudflare.com/ajax/libs/antd/4.4.1/antd.dark.css";
            break;
        }

        case "auto": {
            if (isAutoDark()) {
                clazz = "page-container-dark";
                use =
                    "https://cdnjs.cloudflare.com/ajax/libs/antd/4.4.1/antd.dark.css";
            } else {
                clazz = "page-container-light";
                use =
                    "https://cdnjs.cloudflare.com/ajax/libs/antd/4.4.1/antd.css";
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
                        <Route
                            path="/c/:name/moderate"
                            component={ModerateCommunity}
                            exact
                        />

                        <Route path="/u/:name/:post" exact component={User} />
                        <Route
                            path="/c/:name/:post"
                            component={Community}
                            exact
                        />
                        <Route path="/u/:name" exact component={User} />
                        <Route path="/c/:name" exact component={Community} />

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

                        <Route exact path="/privacy" component={Privacy} />

                        <Route component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    );
}
