import React from "react"
import { Route, Router, Switch } from "react-router-dom"

import "./assets/scss/base.scss"
import "./assets/main.css"

import Community from "./view/community/community/Community"
import Tos from "./view/Tos"
import About from "./view/about/About"
import Communities from "./view/community/communities/Communities"
import history from "./api/History"
import User from "./view/user/User"
import Login from "./view/account/Login"
import Home from "./view/home/Home"
import Logout from "./view/account/Logout"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Unsubscribed from "./view/Unsubscribed"
import Support from "./view/Support"
import ForgotPassword from "./view/settings/forgot/Forgot"
import NotFound from "./view/NotFound"

import { useDispatch, useSelector } from "react-redux"
import Settings from "./view/settings/settings/Settings"
import Unverified from "./view/Unverified"
import Verify from "./view/settings/verify/Verify"
import Privacy from "./view/Privacy"
import ModerateCommunity from "./view/community/community/moderate/ModerateCommunity"
import { isExpired } from "./api/user/User"
import { logOut } from "./redux/actions/auth.actions"
import useTheme from "./components/useTheme"

export default function App() {
    const dispatch = useDispatch()

    if (isExpired()) dispatch(logOut())

    const [clazz, file] = useTheme()

    return (
        <Router history={history}>
            <link rel="stylesheet" type="text/css" href={`/${file}`} />
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
    )
}
