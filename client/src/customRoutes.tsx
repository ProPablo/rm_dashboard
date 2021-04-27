import * as React from "react";
import { Route } from 'react-router-dom';
import { AboutPage } from './Resources/About'

export default [
    <Route exact path="/About" component={AboutPage} />,
];