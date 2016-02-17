/**
 * Created by mendieta on 2/2/16.
 */

import Signal from "signals"

export default class AppDispatcher {

    static LOCALE_CHANGED = new Signal();
    static LOCALE_LOADING = new Signal();
    static STARTED = new Signal();
    static RENDERED = new Signal();
    static RESIZED = new Signal();
}
