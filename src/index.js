/**
 * Created by mendieta on 1/1/16.
 */
import "sanitize.css/sanitize.css"
import "styles/fonts.css";
import "application.styl";
import "babel-polyfill";

import FastClick from "fastclick";
import Breakpoint from "foo/utils/Breakpoint"
import Requester from "foo/net/Requester";
import {config, environment} from "app/config/config";


function startApp(data = null) {
    FastClick.attach(document.body);
    Breakpoint.setup();
    require.ensure([], ()=> {
        //IMPORT TWEENMAX / CREATE / ETC
        require("gsap/src/uncompressed/TweenMax");

        //IMPORT APP
        let App = require("app/App").default;
        //Third parameter is data object
        const app = new App(config, environment, data);
    }, "app");
}

function loadData() {
    //DO INITIAL DATA/ASSET LOADING
    //Requester.getJSON("assets/data/data.json", (error, data)=> { startApp(data.body); });
    startApp();
}

loadData();
