/**
 * Created by mendieta on 7/13/16.
 */
import Home from "app/views/Home"
import Test from "app/views/Test"

const routes = [
    {
        "name"     : "home",
        "url"      : "/",
        "component": Home,
        "assets"   : []
    },
    {
        "name"     : "test",
        "url"      : "/test",
        "component": Test,
        "handler"  : onHandle
    }
]

function onHandle ( ctx, next ) {
    //DO SOME SYNC DATA LOADING OR TRANSFORMS
    next();
}

export default routes;

