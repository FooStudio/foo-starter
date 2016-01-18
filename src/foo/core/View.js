/**
 * Created by mendieta on 1/14/16.
 */

import React from "react"
import {render} from "react-dom"
import GSAP from "react-gsap-enhancer"
import Component from "foo/core/Component"

@GSAP()
export default class View extends Component {
    static displayName = "View";
}
