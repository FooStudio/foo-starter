/**
 * Created by mendieta on 1/14/16.
 */

import React from "react";
import {render} from "react-dom";
import View from "foo/core/View";

export default class Home extends View {
    static displayName = "Home";
    static path = "";
    static title = "Home";

    render() {
        return (<div className="Home">
            <img src="assets/img/logo.gif" alt="logo"/>
            <h1>Home Foo App</h1>
        </div>)
    }
}
