/**
 * Created by mendieta on 7/13/16.
 */

import React from "react"

import Home from "app/views/Home"
import Test from "app/views/Test"

export default class Routes {

    constructor () {
        this.buildRoutes();
        App.router.start();
    }

    buildRoutes () {
        App.router.addRoute( "/", this.home )
        App.router.addRoute( "/test", this.test );
    }

    home = ( ctx, next )=> {
        ctx.partial = <Home key={ctx.path}/>
        next()
    }

    test = ( ctx, next )=> {
        ctx.partial = <Test key={ctx.path}/>
        next()
    }

}
