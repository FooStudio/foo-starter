import "styles/components/_Header"
import React from "react"
import {render} from "react-dom"
import Component from "foo/core/react/Component"

export default class Header extends Component {
    static displayName = "Header";

    render() {
        return (<div className="Header">
            <img src="assets/img/logo.gif" alt="logo"/>
            <h1>Header</h1>
            <nav>
                <a href="/">Home</a>
                <a href="/test">Test</a>
            </nav>
        </div>)
    }
}
