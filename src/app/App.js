/**
 * Created by mendieta on 1/1/16.
 */

import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router"
import AbstractApp from "foo/core/AbstractApp"
import Main from "app/views/Main"

//IMPORT VIEWS
import Home from "app/views/Home"
import Test from "app/views/Test"

export default class App extends AbstractApp {
    static displayName = "App";

    init() {
        super.init();
        this.history = browserHistory;
    }

    start() {
        super.start();
    }

    renderApp() {
        render(<Router history={browserHistory}>
            <Route path="/" config={this.config} environment={this.environment} locale={this.locale} data={this.data} component={Main}>
                <IndexRoute component={Home}/>
                <Route path="/test" component={Test}/>
            </Route>
        </Router>, document.getElementById("root"));
    }
}
