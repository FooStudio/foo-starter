/**
 * Created by mendieta on 1/20/16.
 */

export default class Facebook {
    constructor(appID, permissions) {
        this.permissions = permissions;
        this.appID = appID;
        this.init();
    }

    init() {
        FB.init({
            appId: this.appID,
            status: false,
            xbml: false,
            version: "2.4"
        });
    }

    login(cb) {
        FB.login((res)=> {
            if (res["status"] === "connected")
                this._getUserData(cb, res["authResponse"]["accessToken"]);
            else
                cb(new Error("No way josé!"));
        }, this.permissions);
    }

    _getUserData(cb, token) {
        let userData = {};
        userData.access_token = token;

        FB.api("/me", (res)=> {
            userData.full_name = res.name;
            userData.social_id = res.id;
            userData.email = res.email || null;
        });

        FB.api("me/pictrure", (res)=> {
            userData.profile_pic = res.data.url;
        });

        this.userData = userData;
        cb(null, userData);
    }

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
