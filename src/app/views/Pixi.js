/**
 * Created by mendieta on 2/2/16.
 */

import PixiMain from "foo/core/pixi/PixiMain"

export default class Pixi extends PixiMain {
    constructor() {
        super();
    }

    init() {
        window.Router.routed.add(this.onRouted, this);
    }

    onRouted(ctx) {
    }
}
