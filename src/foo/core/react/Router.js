/* eslint-disable */
/**
 * Created by mendieta on 7/18/16.
 */

import React, {PropTypes} from "react"
import {render} from "react-dom"
import page from "page"
import TransitionGroupPlus from "react-transition-group-plus"
import Component from "foo/core/react/Component"

import {connect} from "react-redux"
import {routed} from "foo/core/router/actions"

export default class Router extends Component {

    static propTypes = {
        routes            : PropTypes.array.isRequired,
        base              : PropTypes.string.isRequired,
        hashbang          : PropTypes.bool,
        bindClick         : PropTypes.bool,
        dispatchInitial   : PropTypes.bool,
        decodeURLComponent: PropTypes.bool
    }

    static defaultProps = {
        routes            : {},
        base              : "",
        hashbang          : true,
        bindClick         : true,
        dispatchInitial   : true,
        decodeURLComponent: true,
        notFound          : null
    }

    state   = {
        component: (<div/>),
        ctx      : null
    }
    options = {};

    setupPage () {
        page.base( this.props.base )
        this.options = {
            hashbang          : this.props.hashbang,
            bindClick         : this.props.bindClick,
            dispatchInitial   : this.props.dispatchInitial,
            decodeURLComponent: this.props.decodeURLComponent
        }
    }

    onRender () {
        this.setupPage();
        this.props.routes.forEach( ( route )=> {
            let Comp = route.component
            if ( route.assets != null || route.assets != undefined ) {
                page( route.url, ( ctx, next )=> {
                    this.preloadAssets( route.assets, next );
                }, ( ctx )=> {
                    this.setComponent( ctx, Comp );
                } );
            } else if ( route.handler != null || route.handler != undefined ) {
                page( route.url, route.handler, ( ctx )=> {
                    this.setComponent( ctx, Comp );
                } );
            } else {
                page( route.url, ( ctx )=> {
                    this.setComponent( ctx, Comp );
                } )
            }
        } )

        page( "*", ( ctx )=> {
            if ( this.props.notFound != null ) {
                this.setComponent( ctx, this.props.notFound )
            } else {
                this.setState( { ctx, ctx } );
            }
        } )

        page.start( this.options );
    }

    setComponent = ( ctx, Comp )=> {
        this.setState( {
            component: <Comp router={ctx} key={ctx.path}/>,
            ctx      : ctx
        } );
    }

    preloadAssets ( assets, next ) {
        next();
    }

    componentWillUpdate ( nextProps, nextState ) {
        this.props.routed( nextState.ctx );
    }

    render () {
        return (<TransitionGroupPlus className="Router" component="div" transitionMode="simultaneous"
                                     deferLeavingComponentRemoval={false}>
            {this.state.component}
        </TransitionGroupPlus>)
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        routed: ( ctx )=> {
            dispatch( routed( ctx ) )
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)( Router )
