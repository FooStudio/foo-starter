/**
 * Created by mendieta on 2/2/16.
 */

import PixiMain from "foo/core/pixi/PixiMain"
import ViewManager from "foo/core/pixi/PixiViewManager"

import SplashView from "app/views/pixi/SplashView"
import TestView from "app/views/pixi/TestView"

export default class Pixi extends PixiMain {
    constructor() {
        super();
    }

    init() {
        window.Router.routed.add(this.onRouted, this);
        this.viewManager = new ViewManager(this);
        this.viewManager.addView(SplashView, "/");
        this.viewManager.addView(TestView, "/test");
    }

    onRouted(ctx) {
        this.viewManager.openView(ctx.path);
    }
}
