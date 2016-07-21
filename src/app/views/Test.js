import "styles/views/Test"
import React from "react"
import {connect} from "react-redux"
import {render} from "react-dom"
import ctg from "foo/core/redux/redux-transition"
import Form from "app/components/Form"

import {routeAppear, routeLeave} from 'app/animations/routes'
import gsap from 'react-gsap-enhancer'

@gsap()
class Test extends React.Component {
    static displayName = "Test";
           state       = {
               submit   : false,
               submitted: false
           };

    componentWillEnter ( callback ) {
        this.addAnimation( routeAppear, { callback } );
    }

    componentWillLeave ( callback ) {
        this.addAnimation( routeLeave, { callback } );
    }

    handleSubmit = ( data ) => {
        this.setState( { submit: true } );
        let d = new FormData();
        for ( const key in data ) {
            if ( {}.hasOwnProperty.call( data, key ) ) {
                // console.log(key, data[key]);
                d.append( key, data[ key ] );
            }
        }
        this.setState( { submit: false, submitted: true } );
    }

    render () {
        const { test } = this.props.locale;
        return (
            <div className="Test">
                <h2>{test.title}</h2>
                <h3>{test.subtitle}</h3>
                <p>dfokkk kllklkl</p>
                <Form onSubmit={this.handleSubmit} submit={this.state.submit} submitted={this.state.submitted}/>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return { locale: state.app.locale_data }
}

export default ctg( connect( mapStateToProps, null, null, { withRef: true } )( Test ) )
