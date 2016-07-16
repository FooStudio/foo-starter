import "styles/views/Test"
import React from "react"
import {connect} from "react-redux"
import {render} from "react-dom"
import View from "foo/core/react/View"
import ctg from "foo/core/redux/redux-transition"

class Test extends View {

    componentWillEnter ( callback ) {
        TweenMax.fromTo( this.refs[ "self" ], 0.75, { alpha: 0 },
            { alpha: 1, ease: Power4.easeOut, onComplete: callback } );
    }

    componentWillLeave ( callback ) {
        TweenMax.to( this.refs[ "self" ], 0.75, { alpha: 0, ease: Power4.easeOut, onComplete: callback } );
    }

    render () {
        const { test } = this.props.locale;
        return (<div ref="self" className="Test">
            <h2>{test.title}</h2>
            <h3>{test.subtitle}</h3>
        </div>)
    }
}

const mapStateToProps = ( state )=> {
    return { locale: state.app.locale_data }
}

export default connect(mapStateToProps)( Test )
