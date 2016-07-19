/**
 * Created by mendieta on 1/14/16.
 */

import React, {PropTypes} from "react";
import {render} from "react-dom";
import {connect} from "react-redux"
import Component from "foo/core/react/Component"
import TransitionGroupPlus from "react-transition-group-plus"

// import Pixi from "app/views/pixi/Main"

//IMPORT COMPONENTS
import Header from "app/components/Header"

class Root extends Component {
    static displayName = "App";

    init () {
    }

    onRender () {
        // this.renderer = PIXI.autoDetectRenderer( 800, 600, { backgroundColor: 0xcccccc } );
        // this.refs.pixi.appendChild( this.renderer.view );
        // this.stage = new Pixi();
    }

    componentWillReceiveProps ( nextProps ) {
    }

    render () {
        return (<div className="App">
            <Header/>
<<<<<<< a61d90e27130d49794bfdf08bb0244354ea9fb09
              {this.props.router.partial}
=======
            {this.props.children}
>>>>>>> Update Foo React Router
            <div ref="pixi"/>
        </div>)
    }
}

const mapStatetoProps = ( state )=> {
    return { router: state.router }
}

export default connect( mapStatetoProps )( Root )
