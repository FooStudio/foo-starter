/**
 * Created by mendieta on 1/30/16.
 */

import page from "page"
import Signal from "signals"
import "html5-history-api"

export default class Routing {
    constructor(base = "", hashbang = false, bindClick = true, dispatchInitial = true, decodeURLComponent = true) {
        page.base(base);
        this.options = {hashbang, bindClick, dispatchInitial, decodeURLComponent};
        this.notFound = new Signal();
        this.routed = new Signal();
        page("*", (ctx, next)=>{
            this.routed.dispatch(ctx);
            next();
        })
    }

    start() {
        page("*", this.notFound.dispatch);
        page.start(this.options);
    }

    stop() {
        page.stop();
    }

    navigate(route) {
        page.show(route);
    }

    addRoute(route, callback, callbacks = null) {
        page(route, callback, callbacks);
    }
}
