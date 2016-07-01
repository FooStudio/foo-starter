import "styles/components/Header"
import React from "react"
import {render} from "react-dom"
import Component from "foo/core/react/Component"
import {Link} from "react-router"

export default class Header extends Component {
    changeLocale(e) {
        App.setLocale(e.currentTarget.getAttribute("data-lang"));
    }

    render() {
        return (<div className="Header">
            <img src={require("assets/img/logo.gif")} alt="logo"/>
            <h1>Header</h1>

            <div className="logo"></div>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/test">Test</Link>
            </nav>

            <ul>
                <li>
                    <button onClick={this.changeLocale} data-lang="es-MX">es</button>
                </li>
                <li>
                    <button onClick={this.changeLocale} data-lang="en-US">en</button>
                </li>
            </ul>
        </div>)
    }
}
