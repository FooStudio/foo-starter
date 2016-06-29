/**
 * Created by mendieta on 6/29/16.
 */

import Bowser from "bowser"

export default class Breakpoint {
    constructor(){
        this.bowser();
        this.mobile();
    }

    bowser(){
        let body = document.getElementsByTagName("body")[0];
        body.className+=" "+Bowser.name;
        body.className+=" "+Bowser.version;
    }

    mobile(){
        //TODO: ADD MOBILE CLASS TO BODY
    }
}
