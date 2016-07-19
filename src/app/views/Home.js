import "styles/views/Home"
import React, {PropTypes} from "react";
import {render} from "react-dom";
import {connect} from "react-redux"
import ctg from "foo/core/redux/redux-transition"
import {increase, decrease} from "app/actions/count"
import View from "foo/core/react/View";

import { routeAppear, routeLeave } from 'app/animations/routes'
import gsap from 'react-gsap-enhancer'

class Home extends View {

    static propTypes = {
        count     : PropTypes.number.isRequired,
        locale     : PropTypes.object.isRequired,
        onIncrease: PropTypes.func.isRequired,
        onDecrease: PropTypes.func.isRequired
    }

    componentWillEnter ( callback ) {
        this.addAnimation(routeAppear, { callback });
    }

    componentWillLeave ( callback ) {
        this.addAnimation(routeLeave, { callback });
    }

    render () {
        const { home } = this.props.locale;
        const { count } = this.props;
        return (
          <div className="Home">
            <h2>{home.title} Foo</h2>
            <h3>{home.subtitle}</h3>

            <button onClick={this.props.onIncrease}>increase</button>
            <button onClick={this.props.onDecrease}>decrease</button>

            <div>
              Some state changes: {count}
            </div>
        </div>
      );
    }
}

const mapStateToProps = ( state ) => {
    return { count: state.count.number, locale: state.app.locale_data }
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

Home = gsap()(Home)

export default ctg(connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
)( Home ))
