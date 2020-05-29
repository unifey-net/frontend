import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'

import Header from "./global/Header.js";
import Footer from "./global/Footer.js";
import PageHandler from "./handle/PageHandler";
import Home from "./pages/home";
import ViewUser from "./handle/UserPage.js";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="container">
                    <Header />
                    <Switch>
                        <Route path='/@:user' component={ViewUser}/>
                        <Route path='/:page' component={PageHandler}/>
                        <Route path='/' component={Home}/>
                        <Route component={() => 404} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
