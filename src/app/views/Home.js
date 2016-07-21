import "styles/views/Home"
import React, {PropTypes} from "react"
import {render} from "react-dom"
import {connect} from "react-redux"
import ctg from "foo/core/redux/redux-transition"
import {increase, decrease} from "app/actions/count"

import {routeAppear, routeLeave} from 'app/animations/routes'
import gsap from 'react-gsap-enhancer'

@gsap()
class Home extends React.Component {
    static displayName = "Home";
    static propTypes   = {
        count     : PropTypes.number.isRequired,
        onIncrease: PropTypes.func.isRequired,
        onDecrease: PropTypes.func.isRequired
    }

    componentWillEnter ( callback ) {
        this.addAnimation( routeAppear, { callback } );
    }

    componentWillLeave ( callback ) {
        this.addAnimation( routeLeave, { callback } );
    }

    render () {
        const { count, onIncrease, onDecrease } = this.props;
        return (
            <div className="Home">
                <h2>{$t( "home.title" )} Foo</h2>
                <h3>{$t( "home.subtitle" )}</h3>
                <p>kjjk</p>
                <button onClick={onIncrease}>increase</button>
                <button onClick={onDecrease}>decrease</button>
                <div>Some state changes: {count}</div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return { count: state.count.number, locale: state.app.locale }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        onIncrease: () => {
            dispatch( increase( 1 ) )
        },
        onDecrease: () => {
            dispatch( decrease( 1 ) )
        }
    }
}

export default ctg( connect( mapStateToProps, mapDispatchToProps, null, { withRef: true } )( Home ) )
