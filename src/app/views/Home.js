import "styles/views/Home"
import React, {PropTypes} from "react";
import {render} from "react-dom";
import {connect} from "react-redux"
import ctg from "foo/core/redux/redux-transition"
import {increase, decrease} from "app/actions/count"
import View from "foo/core/react/View";

class Home extends View {

    static propTypes = {
        count     : PropTypes.number.isRequired,
        data     : PropTypes.object.isRequired,
        onIncrease: PropTypes.func.isRequired,
        onDecrease: PropTypes.func.isRequired
    }



    componentWillEnter ( callback ) {
        TweenMax.fromTo( this.refs[ "self" ], 0.75, { alpha: 0 }, { alpha: 1, ease: Power4.easeOut, onComplete: callback } );
    }

    componentWillLeave ( callback ) {
        TweenMax.to( this.refs[ "self" ], 0.75, { alpha: 0, ease: Power4.easeOut, onComplete: callback } );
    }

    render () {
        const {data} = this.props;
        return (<div ref="self" className="Home">
            <h2>{data.home.title} Foo</h2>
            <h3>{data.view}</h3>

            <p>dsfsdd</p>

            <button onClick={this.props.onIncrease}>increase</button>
            <button onClick={this.props.onDecrease}>decrease</button>

            <div>
                Some state changes: {this.props.count}
            </div>
        </div>)
    }
}

const mapStateToProps = ( state )=> {
    return { count: state.count.number, data: state.app.data }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        onIncrease: ()=> {
            dispatch( increase( 1 ) )
        },
        onDecrease: ()=> {
            dispatch( decrease( 1 ) )
        }
    }
}

export default ctg( connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
)( Home ) )
