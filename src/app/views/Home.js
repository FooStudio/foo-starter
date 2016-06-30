import "styles/views/Home"
import React from "react";
import {render} from "react-dom";
import View from "foo/core/react/View";

export default class Home extends View {


    componentWillEnter(callback) {
        callback();
    }

    componentWillLeave(callback) {
        callback();
    }

    render() {
        return (<div className="Home">
            <h2>{locale.t("home.title")} Foo</h2>
            <h3>{locale.t("view")}</h3>
        </div>)
    }
}
