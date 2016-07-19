import "styles/views/Test"
import React from "react"
import {connect} from "react-redux"
import {render} from "react-dom"
import View from "foo/core/react/View"
import Form from "app/components/Form"

class Test extends View {
    state = {submit: false, submitted: false};

    componentWillEnter ( callback ) {
        TweenMax.fromTo( this.refs[ "self" ], 0.75, { alpha: 0 },
            { alpha: 1, ease: Power4.easeOut, onComplete: callback } );
    }

    componentWillLeave ( callback ) {
        TweenMax.to( this.refs[ "self" ], 0.75, { alpha: 0, ease: Power4.easeOut, onComplete: callback } );
    }

    handleSubmit = (data) => {
      this.setState({submit: true});
      let d = new FormData();
      for (const key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
          // console.log(key, data[key]);
          d.append(key, data[key]);
        }
      }
      this.setState({submit: false, submitted: true});
    }

    render () {
        const { test } = this.props.locale;
        return (
          <div ref="self" className="Test">
            <h2>{test.title}</h2>
            <h3>{test.subtitle}</h3>
            <Form onSubmit={this.handleSubmit} submit={this.state.submit} submitted={this.state.submitted}/>
          </div>
      )
    }
}

const mapStateToProps = ( state )=> {
    return { locale: state.app.locale_data }
}

export default connect(mapStateToProps)( Test )
