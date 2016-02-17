/**
 * Created by mendieta on 1/20/16.
 */

import React from "react"
import {render} from "react-dom"
import MemorySats from "memory-stats"
import Polyglot from "node-polyglot"
import {getJSON} from "foo/net/Requester"
import AppDispatcher from "foo/core/AppDispatcher"
import Component from "foo/core/react/Component"

export default class AbstractApp {
    static displayName = "AbstractApp";
    started = false;
    locale = "es-MX";

    constructor(config, environment, data = {}) {
        this.config = config;
        this.environment = environment;
        this.data = data;
        window.App = this;
        this.init = this.init.bind(this);
        this._setupPolyglot = this._setupPolyglot.bind(this);
        this._setupPolyglot();
    }

    _bind(...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    init() {
        this._bind("onResizeHandler");
        if (this.environment.vars.debug)this.startDebug();
        this.addListeners();
        this.initSDKs();
        this.start();
    }

    _setupPolyglot() {
        this.polyglot = new Polyglot();
        window.locale = this.polyglot;
        this.polyglot.locale(this.config.locale);
        this._loadLocale();
    }

    _loadLocale() {
        getJSON("assets/data/locale/" + this.polyglot.locale() + ".json", (error, data)=> {
            if (error) {
                console.error("Error: The provided locale was not found in the locales directory");
            } else {
                this.polyglot.extend(data.body);
                AppDispatcher.LOCALE_CHANGED.dispatch();
                if (this.started) {
                    this.renderApp();
                } else {
                    this.init();
                }
            }
        });
    }

    setLocale(locale) {
        AppDispatcher.LOCALE_LOADING.dispatch();
        this.polyglot.locale(locale);
        this._loadLocale();
    }

    addListeners() {
        if (this.config.vars.resize) window.addEventListener("resize", this.onResizeHandler);
        if (this.config.vars.animate || this.environment.vars.debug) this.animate();
    }

    initSDKs() {
        const {apis} = this.config;
        if (apis.facebook) {
            console.log("init facebook");
        }
    }

    onResizeHandler(e) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        AppDispatcher.RESIZED.dispatch(this.width, this.height);
    }

    animate() {
        requestAnimationFrame(()=> {
            AppDispatcher.RENDERED.dispatch();
            this.animate();
        });
        if (this.environment.vars.debug) {
            this.stats.update();
        }
    }

    startDebug() {
        this.stats = new MemorySats();
        this.stats.domElement.style.position = "fixed";
        this.stats.domElement.style.right = "0px";
        this.stats.domElement.style.bottom = "0px";
        document.body.appendChild(this.stats.domElement);
    }

    start() {
        this.started = true;
        this.renderApp();
    }

    renderApp() {

    }

}
