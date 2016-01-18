/**
 * Created by mendieta on 1/1/16.
 */
import "normalize.css";
import "styles/fonts.css";
import "application.scss";

import React from "react";
import {render} from "react-dom";
import "gsap/src/uncompressed/TweenLite";
import App from "app/App";


function startApp() {
    render(
        <App/>,
        document.getElementById("root")
    );
}

function loadData() {
    //DO INITIAL DATA/ASSET LOADING
    startApp();
}

loadData();
