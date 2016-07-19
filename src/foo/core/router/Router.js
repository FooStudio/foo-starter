/**
 * Created by mendieta on 1/30/16.
 */

import page from "page"
import {routed} from "foo/core/router/actions"

//import "html5-history-api"

/**
 * Basic usage:
 *
 *      Router.addRoute("/", this.onHome);
 *
 *      onHome(ctx, next){
 *          //Handle route match
 *      }
 *
 *  Context:
 *
 *  Routes are passed Context objects, these may be used to share state, for example ctx.user =, as well as the history
 * "state" ctx.state that the pushState API provides.
 *
 *          Context.save()
 *              Saves the context using replaceState(). For example this is useful for caching HTML or other resources
 * that were loaded for when a user presses "back". Context.canonicalPath Pathname including the "base" (if any) and
 * query string "/admin/login?foo=bar". Context.path Pathname and query string "/login?foo=bar". Context.querystring
 * Query string void of leading ? such as "foo=bar", defaults to "". Context.pathname The pathname void of query string
 * "/login". Context.state The pushState state object. Context.title The pushState title.
 *
 * Working with state:
 *
 * When working with the pushState API, and page.js you may optionally provide state objects available when the user
 * navigates the history.
 *
 * For example if you had a photo application and you performed a relatively expensive search to populate a list of
 * images, normally when a user clicks "back" in the browser the route would be invoked and the query would be made
 * yet-again.
 *
 * An example implemenation might look as follows:
 *
 *          function show(ctx){
 *              $.getJSON('/photos', function(images){
 *              displayImages(images)
 *              })
 *          }
 *
 * You may utilize the history's state object to cache this result, or any other values you wish. This makes it
 * possible to completely omit the query when a user presses back, providing a much nicer experience.
 *
 *          function show(ctx){
 *              if (ctx.state.images) {
 *                  displayImages(ctx.state.images)
 *              } else {
 *                  $.getJSON('/photos', function(images){
 *                  ctx.state.images = images
 *                  ctx.save()
 *                  displayImages(images)
 *                  })
 *              }
 *          }
 *
 *
 *  Matching paths:
 *
 *  Here are some examples of what's possible with the string to RegExp conversion.
 *
 *          Match an explicit path:
 *              page('/about', callback)
 *          Match with required parameter accessed via ctx.params.name:
 *              page('/user/:name', callback)
 *          Match with several params, for example /user/tj/edit or /user/tj/view.
 *              page('/user/:name/:operation', callback)
 *          Match with one optional and one required, now /user/tj will match the same route as /user/tj/show etc:
 *              page('/user/:name/:operation?', callback)
 *
 * Separating concerns:
 *
 * For example suppose you have a route to edit users, and a route to view users. In both cases you need to load the
 * user. One way to achieve this is with several callbacks as shown here:
 *
 *      Router.addRoute('/user/:user', load, show)
 *      Router.addRoute('/user/:user/edit', load, edit)
 *
 * Then perform some kind of action against the server, assigning the user to ctx.user for other routes to utilize.
 * next() is then invoked to pass control to the following matching route in sequence, if any.
 *
 *      function load(ctx, next){
 *         var id = ctx.params.id
 *         $.getJSON('/user/' + id + '.json', function(user){
 *           ctx.user = user
 *           next()
 *         })
 *       }
 *
 *
 */
export default class Router {
    /**
     * @constructor
     * @param {string} [base=""] Set the base path. For example if App is operating within /blog/* set the base path to
     *     "/blog".
     * @param {boolean} [hashbang=true] Add #! before urls
     * @param {boolean} [bindClick=true] Bind to click events on 'a' tags
     * @param {boolean} [dispatchInitial=true] Perform initial dispatch
     * @param {boolean} [decodeURLComponent=true] Remove URL encoding from path components (query string, pathname,
     *     hash)
     */
    constructor ( base = "", hashbang = true, bindClick = true, dispatchInitial = true, decodeURLComponent = true ) {
        page.base( base );
        /**
         * The Router options
         * @type {{hashbang: boolean, bindClick: boolean, dispatchInitial: boolean, decodeURLComponent: boolean}}
         */
        this.options = { hashbang, bindClick, dispatchInitial, decodeURLComponent };

        page( "*", ( ctx, next )=> {
            ctx.partial = {}
            console.log("init")
            //DISPATCH INIT LOADING
            next();
        } )
    }

    /**
     * Starts the routing <br/>
     * Register App's popstate / click bindings. If you're doing selective binding you'll like want to pass {
     * bindClick: false } to constructor.
     * @return {void}
     */
    start () {
        page( "*", ( ctx, next )=> {
            console.log("not found")
            App.store.dispatch( routed( ctx ) );
        } )
        page.start( this.options );
    }

    /**
     * Stops the routing <br/>
     * Unbind both the popstate and click handlers.
     * @return {void}
     */
    stop () {
        page.stop();
    }

    /**
     * Navigate to the given path.
     * @example
     $('.view').click(function(e){
        Router.navigate('/user/12')
        e.preventDefault()
     })
     * @param {string} route The route to navigate
     * @return {void}
     */
    navigate ( route ) {
        page.show( route );
    }

    /**
     * Defines an exit route mapping path to the given callback(s).<br/>
     * Exit routes are called when a page changes, using the context from the previous change. For example:
     * @example
     Router.addRoute('/sidebar', function(ctx, next) {
      sidebar.open = true
      next()
    })

     Router.exit('/sidebar', function(next) {
      sidebar.open = false
      next()
    })
     * @param {string} route The route to be listened when exited
     * @param {function} callback Callback to be called when the route matches
     * @param {...function} [callbacks] The callbacks to be called, in sequence.
     * @return {void}
     */
    exit ( route, callback, ...callbacks ) {
        page.exit( route, callback, ...callbacks )
    }

    /**
     * Defines a route mapping path to the given callback(s). Each callback is invoked with two arguments, context and
     * next. Much like Express invoking next will call the next registered callback with the given path.
     *
     * @example
     * Router.addRoute('/', user.list)
     Router.addRoute('/user/:id', user.load, user.show)
     Router.addRoute('/user/:id/edit', user.load, user.edit)
     *
     * @param {string} route The route to be added
     * @param {function} callback Callback to be called when the route matches
     * @param {...function} [callbacks] The callbacks to be called, in sequence.
     * @return {void}
     */
    addRoute ( route, callback, ...callbacks ) {
        page( route, callback, ...callbacks );
    }

    /**
     * Calling redirect a string as the first parameter redirects to another route. Waits for the current route to push
     * state and after replaces it with the new one leaving the browser history clean.
     * @param {string} path The path to be redirected to.
     * @return {void}
     */
    redirect ( path ) {
        page.redirect( path );
    }
}
