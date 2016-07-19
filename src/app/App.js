/**
 * Created by mendieta on 1/1/16.
 */

import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux"
import configureStore from "app/store"

//FOO ROUTER
import Router from "foo/core/react/Router"
import routes from "app/Routes"

import AbstractApp from "foo/core/AbstractApp"
import Root from "app/views/Root"

export default class App extends AbstractApp {

    constructor ( config, environment, data = {} ) {
        const store = configureStore();
        super( config, environment, data, store );
    }

    /**
     * CALLED JUST AFTER INITAL DATA IS LOADED (LOCALE/SDKS/ETC)
     */
    init () {
        super.init();
    }

    /**
     * ASSET LOADING METHOD
     * JUST IN CASE "ASSET_LOADING" IN CONFIG IS SET TO TRUE
     */
    loadAssets () {
        //CALL START METHOD AFTER LOADING ASSETS
        this.start();
    }

    /**
     * CALLED JUST BEFORE THE RENDER METHODS
     */
    start () {
        super.start();
        //this.router = new Router( this.environment.vars.route );
        //this.routes = new Routes();
    }

    renderApp () {
        render(
            <Provider store={this.store}>
                <Root>
                    <Router routes={routes} base={this.environment.vars.route}/>
                </Root>
            </Provider>, document.getElementById( "root" )
        )
    }
}
