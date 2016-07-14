import "styles/views/Test"
import React from "react"
import {render} from "react-dom"
import View from "foo/core/react/View"

export default class Test extends View {

    componentWillEnter ( callback ) {
        TweenMax.fromTo( this.refs[ "self" ], 0.75, { alpha: 0 },
            { alpha: 1, ease: Power4.easeOut, onComplete: callback } );
    }

    componentWillLeave ( callback ) {
        TweenMax.to( this.refs[ "self" ], 0.75, { alpha: 0, ease: Power4.easeOut, onComplete: callback } );
    }

    render () {
        return (<div ref="self" className="Test">
            <h2>{locale.t( "test.title" )}</h2>
            <h3>ssss</h3>
        </div>)
    }
}
