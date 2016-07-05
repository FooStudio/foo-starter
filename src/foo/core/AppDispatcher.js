/**
 * Created by mendieta on 2/2/16.
 */

import Signal from "signals"

/**
 * @access public
 */
export default class AppDispatcher {


    /**
     * Signal dispatched after locale has changed
     * @static
     * @property LOCALE_CHANGED
     * @public
     * @type {Signal}
     */
    static LOCALE_CHANGED = new Signal();
    static LOCALE_LOADING = new Signal();
    static STARTED = new Signal();
    static RENDERED = new Signal();
    static RESIZED = new Signal();
    static ROUTED = new Signal();
}
