/**
 * Created by mendieta on 7/13/16.
 */

import React, {PropTypes, Component} from "react"

export default class Link extends Component {

    static propTypes = {
        to: PropTypes.string.isRequired
    }

    render () {
        return (<a href={this.props.to}>
            {this.props.children}
        </a>)
    }
}
