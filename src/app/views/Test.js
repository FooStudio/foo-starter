import "styles/views/_Test"
import React from "react"
import {render} from "react-dom"
import View from "foo/core/react/View"

export default class Test extends View {
    static displayName = "Test";

    render() {
        return (<div className="Test">
            <h2>Test</h2>
        </div>)
    }
}
