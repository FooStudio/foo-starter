/**
 * Created by mendieta on 1/1/16.
 */
import React from "react";
import {render} from "react-dom";
import {Router, Route, Link, IndexRoute} from "react-router"
import history from "app/utils/history"
import Component from "foo/core/Component";

import Main from "app/views/Main"
import Home from "app/views/Home"

export default class App extends Component {
    static displayName  = "App";

    init() {

    }

    onRender() {

    }

    render() {
        return (<Router history={history}>
            <Route path={Main.path} component={Main}>
                <IndexRoute path={Home.path} component={Home}/>
            </Route>
        </Router>);
    }
}
