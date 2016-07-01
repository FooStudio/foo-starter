/**
 * Created by mendieta on 1/14/16.
 */

import React from "react";
import {render} from "react-dom";
import Component from "foo/core/react/Component"
import AppDispatcher from "foo/core/AppDispatcher"
import TransitionGroupPlus from "react-transition-group-plus"
//import Pixi from "app/views/Pixi"

//IMPORT COMPONENTS
import Header from "app/components/Header"

export default class Main extends Component {
    static displayName = "App";

    init() {
    }

    onRender() {
        /*this.renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0xcccccc});
        this.refs.pixi.appendChild(this.renderer.view);
        this.stage = new Pixi();*/
        AppDispatcher.RENDERED.add(this.onEnterFrame, this);
        AppDispatcher.ROUTED.dispatch(this.props.location);
    }

    componentWillReceiveProps(nextProps) {
        AppDispatcher.ROUTED.dispatch(nextProps.location);
    }

    onEnterFrame() {
        //this.renderer.render(this.stage);
    }

    render() {
        return (<div className="App">
            <Header/>
            <TransitionGroupPlus className="TransitionGroup" component="div"  transitionMode="simultaneous" deferLeavingComponentRemoval={false}>
                {React.cloneElement(this.props.children, {
                    key: location.pathname
                })}
            </TransitionGroupPlus>
            <div ref="pixi"/>
        </div>)
    }
}
