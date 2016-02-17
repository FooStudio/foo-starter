/**
 * Created by mendieta on 1/14/16.
 */

import React from "react";
import {render} from "react-dom";
import Component from "foo/core/react/Component"
import Router from "foo/core/router/Router"
import AppDispatcher from "foo/core/AppDispatcher"
import ReactTransitionGroup from "react-addons-transition-group"
//import Pixi from "app/views/Pixi"

//IMPORT COMPONENTS
import Header from "app/components/Header"
//IMPORT VIEWS
import Home from "app/views/Home"
import Test from "app/views/Test"

export default class Main extends Component {
    static displayName = "App";

    state = {
        currentView: null,
        currentRoute: "/"
    };

    init() {
        this.router = new Router("", true);
        window.Router = this.router;
    }

    onRender() {
        //this.renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x6495ed});
        //this.refs.pixi.appendChild(this.renderer.view);
        //this.stage = new Pixi();
        //AppDispatcher.RENDERED.add(this.onEnterFrame, this);
        this.createRoutes();
    }

    createRoutes() {
        this.router.notFound.add(this.on404, this);
        this.router.addRoute("/", this.onHome.bind(this));
        this.router.addRoute("/test", this.onAbout.bind(this));
        this.router.start();
    }

    onHome(context, next) {
        this.showReactView(<Home key="home" context={context}/>, context);
    }

    onAbout(context, next) {
        this.showReactView(<Test key="test" context={context}/>, context);
    }

    on404(context, next) {
        console.error("404");
    }

    showReactView(view, context) {
        this.setState({
            currentView: view,
            currentRoute: context.path
        })
    }

    onEnterFrame() {
        //this.renderer.render(this.stage);
    }

    render() {
        return (<div className="App">
            <Header/>
            <ReactTransitionGroup>
                {this.state.currentView}
            </ReactTransitionGroup>
            <div ref="pixi"/>
        </div>)
    }
}
