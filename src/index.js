/**
 * Created by mendieta on 1/1/16.
 */
import "babel-polyfill";

import "sanitize.css/sanitize.css"
import "application.styl";

import GoogleAnalytics from "foo/utils/tracking/GoogleAnalytics"

import Breakpoint from "foo/utils/Breakpoint"
import Requester from "foo/net/Requester";
import {config, environment} from "app/config";

const startApp = ( data = null )=> {
    require.ensure( [], ()=> {
        //IMPORT TWEENMAX / CREATE / ETC
        require( "gsap/src/uncompressed/TweenMax" );

        //IMPORT APP
        let App   = require( "app/App" ).default;
        //Third parameter is data object
        const app = new App( config, environment, data );
    }, "app" );
}

//LOADS THE INITAL APP DATA || STARTS THE APP
const loadData = ()=> {
    //SETUP BREAKPOINTS
    Breakpoint.setup();

    //DO INITIAL DATA/ASSET LOADING || START APP
    if ( config.data_loading ) {
        console.info( "Foo:", "Load App Data" );
        Requester.getJSON( "static/data/data.json", ( error, data )=> { startApp( data.body ); } );
    } else {
        startApp();
    }
}

/**
 * LOADS THE ANALYTICS ADAPTER BASED ON CONFIG
 */
const loadAnalyticsAdapter = ()=> {
    switch ( config.analytics ) {
        case "google":
            GoogleAnalytics( environment.properties.ga );
            break;
        default:
    }
    loadData();
}

if ( document.readyState !== "complete" ) {
    document.addEventListener( "DOMContentLoaded", loadAnalyticsAdapter );
} else {
    loadAnalyticsAdapter();
}
