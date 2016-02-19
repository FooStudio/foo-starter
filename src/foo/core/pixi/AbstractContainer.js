import "pixi.js"

export default class AbstractContainer extends PIXI.Container {

    /**
     * @constructor
     * @return {void}
     */
    constructor() {
        super();
        this.init();
    }

    /**
     * Binds the methods to the Class context
     * @example
     * this._bind("onClickHandler", "onOtherHandler");
     * @param {...string} methods Spread operator, functions wrapped in strings separated by coma
     * @private
     * @return {void}
     */
    _bind(...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    /**
     * Called when the Object is added to the stage
     * @returns {void}
     * @abstract
     */
    init() {

    }

    /**
     * Called to destroy the object
     * @return {void}
     * @abstract
     */
    destroy() {

    }
}
