import * as React from "react";
import { Route } from 'react-router-dom';
import { AboutPage } from './Resources/About'
import { Map } from "./Resources/Map";
import { TourList } from "./Resources/Tour";

export default [
    <Route exact path="/tour" component={TourList} />,
    <Route exact path="/about" component={AboutPage} />,
    <Route exact path="/map" component={Map} />
];