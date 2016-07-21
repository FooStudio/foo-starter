/**
 * Created by mendieta on 7/13/16.
 */

import {ROUTED, ROUTE_NOT_FOUND} from "foo/core/router/constants"

const initialState = {}

export default function update ( state = initialState, action ) {
    switch ( action.type ) {
        case ROUTED:
            return action.location
            break
        case ROUTE_NOT_FOUND:
            return action.location
            break
    }
    return state
}
