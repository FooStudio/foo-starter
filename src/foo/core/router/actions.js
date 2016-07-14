/**
 * Created by mendieta on 7/13/16.
 */

import {ROUTED, ROUTE_NOT_FOUND} from "foo/core/router/constants"

export function routed ( context ) {
    return {
        type    : ROUTED,
        location: context
    }
}

export function route_not_found ( context ) {
    return {
        type    : ROUTE_NOT_FOUND,
        location: context
    }
}
