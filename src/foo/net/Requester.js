/**
 * Created by mendieta on 1/20/16.
 */

import "Base64"
import request from "superagent"

export function getJSON(url, cb) {
    request
        .get(url)
        .set("Accept", "application/json")
        .end(cb);
}

export function postJSON(url, obj, cb) {
    request
        .post(url)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(obj)
        .end(cb);
}

