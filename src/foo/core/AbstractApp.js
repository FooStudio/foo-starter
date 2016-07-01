/**
 * Created by mendieta on 1/20/16.
 */

import React from "react"
import {render} from "react-dom"
import MemorySats from "memory-stats"
import Polyglot from "node-polyglot"
import Requester from "foo/net/Requester"
import AppDispatcher from "foo/core/AppDispatcher"
import Component from "foo/core/react/Component"


export default class AbstractApp {
    static displayName = "AbstractApp";

    /**
     * @module foo
     * @namespace core
     * @class AbstractApp
     * @constructor
     * @param {object} config App config object
     * @param {object} environment App environment object
     * @param {object} [data={}] App initial load data
     */
    constructor(config, environment, data = {}) {
        /**
         * The app config object
         * @property config
         * @type {Object}
         */
        this.config = config;

        /**
         * App environment object
         * @property environment
         * @type {Object}
         */
        this.environment = environment;

        /**
         * App initial load data
         * @default {}
         * @property data
         * @type {Object}
         */
        this.data = data;
        /**
         *  Defines if the App has started
         *  @property started
         *  @default false
         *  @type {boolean}
         */
        this.started = false;
        /**
         * The current locale
         * @default "es-MX"
         * @type {string}
         */
        this.locale = "es-MX";
        window.App = this;
        this.init = this.init.bind(this);
        this._setupPolyglot = this._setupPolyglot.bind(this);
        this._setupPolyglot();
    }

    /**
     * The method binds the methods passed as parameters to this scope
     * @param {...Function} methods Methods to be bind to this, separated by commas
     * @private
     * @method _bind
     * @returns {void}
     */
    _bind(...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    /**
     * Method called when the App will initialize, setup initial data at override
     * @method init
     * @override
     */
    init() {
        this._bind("_onResizeHandler");
        if (this.environment.vars.debug)this._startDebug();
        this._addListeners();
        this._initSDKs();
        this.start();
    }

    /**
     * Method that setups Polyglot, loads default locale
     * @private
     * @method _setupPolyglot
     * @returns {void}
     */
    _setupPolyglot() {
        /**
         * Polyglot instance
         * @private
         * @type {Polyglot}
         */
        this._polyglot = new Polyglot();
        window.locale = this._polyglot;
        this._polyglot.locale(this.config.locale);
        this._loadLocale();
    }

    /**
     * Method that loads the current locale and (re)renders the App
     * @private
     * @returns {void}
     */
    _loadLocale() {
        Requester.getJSON("static/data/locale/" + this._polyglot.locale() + ".json", (error, data)=> {
            if (error) {
                console.log(error);
                console.error("Error: The provided locale was not found in the locales directory");
            } else {
                this._polyglot.extend(data.body);
                AppDispatcher.LOCALE_CHANGED.dispatch();
                if (this.started) {
                    this.renderApp();
                } else {
                    this.init();
                }
            }
        });
    }

    /**
     * Method that set the current locale
     * @param {string} locale The locale to set as current
     * @returns {void}
     */
    setLocale(locale) {
        AppDispatcher.LOCALE_LOADING.dispatch();
        this._polyglot.locale(locale);
        this._loadLocale();
    }

    /**
     * Method that init listeners depending on the App config
     * @private
     * @returns {void}
     */
    _addListeners() {
        if (this.config.vars.resize) window.addEventListener("resize", this._onResizeHandler);
        if (this.config.vars._animate || this.environment.vars.debug) this._animate();
    }

    /**
     * Method that initialize SDKs and APIs depending on the App config
     * @private
     * @returns {void}
     */
    _initSDKs() {
        const {apis} = this.config;
        if (apis.facebook) {
            console.log("init facebook");
        }
    }

    /**
     * Window resize event handler
     * @param {Event} e The event object
     * @private
     * @returns {void}
     */
    _onResizeHandler(e) {
        /**
         * App window width
         * @type {Number}
         */
        this.width = window.innerWidth;
        /**
         * App window height
         * @type {Number}
         */
        this.height = window.innerHeight;
        AppDispatcher.RESIZED.dispatch(this.width, this.height);
    }


    /**
     * Method that loops animation frameworks
     * @private
     * @returns {void}
     */
    _animate() {
        requestAnimationFrame(()=> {
            AppDispatcher.RENDERED.dispatch();
            this._animate();
        });
        if (this.environment.vars.debug) {
            this.stats.update();
        }
    }

    /**
     * Method that starts debug mode, depending on App config and environment
     * @private
     * @returns {void}
     */
    _startDebug() {
        /**
         * MemoryStats indicator instance
         * @type {MemoryStats}
         */
        this.stats = new MemorySats();
        this.stats.domElement.style.position = "fixed";
        this.stats.domElement.style.right = "0px";
        this.stats.domElement.style.bottom = "0px";
        document.body.appendChild(this.stats.domElement);
    }

    /**
     * Starts App, override
     * @override
     * @returns {void}
     */
    start() {
        this.started = true;
        AppDispatcher.STARTED.dispatch();
        this.renderApp();
    }

    /**
     * Method to be overridden, render logic
     * @abstract
     * @override
     * @returns {void}
     */
    renderApp() {

    }

}
