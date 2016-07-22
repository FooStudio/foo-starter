import "styles/components/Header"
import React, {Component} from "react"
import {Link} from "react-router"

export default class Header extends Component {
    changeLocale ( e ) {
        App.setLocale( e.currentTarget.getAttribute( "data-lang" ) );
    }

    render () {
        return (<div className="Header">
            <h1>Header</h1>
            <img src={require( "assets/img/logo.gif" )} alt="logo"/>
            <nav>
                <Link to={"/"}>Home</Link> / <Link to={"/test"}>Test</Link> / <Link to={"/404"}>404</Link>
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
