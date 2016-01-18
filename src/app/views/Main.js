/**
 * Created by mendieta on 1/14/16.
 */

import React from "react";
import {render} from "react-dom";
import View from "foo/core/View";

export default class Main extends View {
    static displayName = "Main";
    static path = "/";
    static title = "Home";

    render() {
        return (<div className="App">
            {this.props.children}
        </div>)
    }
}
