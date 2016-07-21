import "styles/components/Loader"
import React, {PropTypes} from "react"
import {render} from "react-dom"
import Component from "foo/core/react/Component"
import gsap from "react-gsap-enhancer"

import {connect} from "react-redux"
import ctg from "foo/core/redux/redux-transition"

import {loaderAppear, loaderDisapper} from "app/animations/loader"

@gsap()
class Loader extends Component {

    static displayName = "Loader";
    static propTypes   = {}

    componentDidUpdate ( prevProps, prevState ) {
        if ( this.props.loading ) {
            this.addAnimation( loaderAppear );
        } else {
            this.addAnimation( loaderDisapper );
        }
    }

    render () {
        return (<div className="Loader">
            <h5>LOADING</h5>
            <p>progress: {this.props.progress}</p>
        </div>)
    }
}

const mapStateToProps = ( state ) => {
    return { loading: state.loader.loading, progress: state.loader.progress }
}

export default ctg( connect( mapStateToProps, null, null, { withRef: true } )( Loader ) )
