/**
 * Created by mendieta on 7/13/16.
 */
import Root from "app/views/Root"
import Home from "app/views/Home"
import Test from "app/views/Test"

const routes = {
    path       : "/",
    component  : Root,
    indexRoute : { component: Home, onEnter: enterHandler },
    childRoutes: [
        { path: "test", component: Test }
    ]
}

function enterHandler ( nextState, replace, callback ) {
    callback();
}

export default routes;
