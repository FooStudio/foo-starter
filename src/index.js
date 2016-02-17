/**
 * Created by mendieta on 1/1/16.
 */
import "normalize.css";
import "styles/fonts.css";
import "application.scss";

import React from "react";
import {render} from "react-dom";
import {config, environment} from "app/config/config"
import App from "app/App";

//IMPORT TWEENMAX / CREATE
import "gsap/src/uncompressed/TweenMax";

function startApp() {
    //Third parameter is data object
    const app = new App(config, environment);
}

function loadData() {
    //DO INITIAL DATA/ASSET LOADING
    startApp();
}

loadData();
