/**
 * Created by mendieta on 1/1/16.
 */

import React from "react";
import {render} from "react-dom";
import AbstractApp from "foo/core/AbstractApp"

import Main from "app/views/Main"

export default class App extends AbstractApp {
    static displayName = "App";

    init() {
        super.init();
    }

    start() {
        super.start();
    }

    renderApp() {
        render(
            <Main config={this.config} environment={this.environment} locale={this.locale} data={this.data}/>,
            document.getElementById("root")
        );
    }
}
