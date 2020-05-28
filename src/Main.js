import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './home/Home.js';
import Tos from './tos/Tos';

import Header from "./global/Header.js";
import Footer from "./global/Footer.js";

const Main = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/tos' component={Tos}/>
            </Switch>
            <Footer />
        </div>
    )
};

export default Main;
