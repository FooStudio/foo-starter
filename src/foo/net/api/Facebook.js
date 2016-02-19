/**
 * Helper class for working with Facebook API
 */
export default class Facebook {
    /**
     *
     * @param {string} appID The Facebook App ID
     * @param {array} permissions The permissions array
     * @return {void}
     */
    constructor(appID, permissions) {
        /**
         * The Facebook permissions array
         * @type {array}
         */
        this.permissions = permissions;
        /**
         * The Facebook App ID
         * @type {string}
         */
        this.appID = appID;
        this.init();
    }

    /**
     * Initialize the Facebook API
     * @private
     * @returns {void}
     */
    init() {
        FB.init({
            appId: this.appID,
            status: false,
            xbml: false,
            version: "2.4"
        });
    }

    /**
     * Facebook login method
     * @param {function} cb
     * @return {void}
     */
    login(cb) {
        FB.login((res)=> {
            if (res["status"] === "connected")
                this._getUserData(cb, res["authResponse"]["accessToken"]);
            else
                cb(new Error("No way josé!"));
        }, this.permissions);
    }

    /**
     * Fetches user data and stores it in userData
     * @param {function} cb The callback
     * @param {string} token The facebook session token
     * @return {void}
     * @private
     */
    _getUserData(cb, token) {
        let userData = {};
        userData.accessToken = token;

        FB.api("/me", (res)=> {
            userData.fullName = res.name;
            userData.socialId = res.id;
            userData.email = res.email || null;
        });

        FB.api("me/pictrure", (res)=> {
            userData.profilePic = res.data.url;
        });

        /**
         * The User Data Object
         * @type {Object}
         */
        this.userData = userData;
        cb(null, userData);
    }

    /**
     * Open Facebook share ui with options
     * @param {object} opts The options object
     * @param {function} cb The callback
     * @return {void}
     */
    share(opts, cb) {
        FB.ui({
            method: opts.method || "feed",
            name: opts.name || "",
            link: opts.link || "",
            picture: opts.picture || "",
            caption: opts.caption || "",
            description: opts.description || ""
        }, (response)=> {
            cb(response)
        });
    }

}
