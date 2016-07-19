/**
 * Created by mendieta on 1/1/16.
 */

import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux"
import configureStore from "app/store"

// Foo Router
import Router from "foo/core/react/Router"
import routes from "app/Routes"

import AbstractApp from "foo/core/AbstractApp"
import Root from "app/views/Root"

export default class App extends AbstractApp {

    constructor ( config, environment, data = {} ) {
        const store = configureStore();
        super( config, environment, data, store );
    }

    // Called just after inital data is loaded (locale/sdks/etc).
    init () {
        super.init();
    }

    // Asset loading method only if "asset_loading" in config is set to true.
    loadAssets () {
        //CALL START METHOD AFTER LOADING ASSETS
        this.start();
    }

    // Called just before the render method.
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
