/**
 * Created by mendieta on 1/2/16.
 */

import React from "react"
import {render} from "react-dom"

export default class Component extends React.Component {
    static displayName = "Component";

    constructor(props) {
        super(props);
        this._bind("onRender", "animIn", "animOut", "didEnter", "dispose");
        this.init();
    }

    _bind(...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    init() {

    }

    componentDidMount() {
        this.onRender();
    }

    onRender() {
    }

    componentWillEnter(callback) {
        this.animIn(callback);
    }

    animIn(callback) {
        callback();
    }

    componentDidEnter() {
        this.didEnter();
    }

    didEnter() {
    }

    componentWillLeave(callback) {
        this.animOut(callback);
    }

    animOut(callback) {
        callback();
    }

    componentWillUnmount() {
        this.dispose();
    }

    dispose() {
    }
}
