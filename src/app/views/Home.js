import "styles/views/Home"
import React from "react";
import {render} from "react-dom";
import View from "foo/core/react/View";

export default class Home extends View {

    componentWillEnter(callback) {
        TweenMax.fromTo(this.refs["self"], 0.75, {alpha:0}, {alpha:1, ease:Power4.easeOut, onComplete:callback});
        //callback();
    }

    componentWillLeave(callback) {
        TweenMax.to(this.refs["self"], 0.75, {alpha:0, ease:Power4.easeOut, onComplete:callback});
        //callback();
    }

    render() {
        return (<div ref="self" className="Home">
            <h2>{locale.t("home.title")} Foo</h2>
            <h3>{locale.t("view")}</h3>
        </div>)
    }
}
