/**
 * Created by mendieta on 7/21/16.
 */

import {LOADED, LOADING, PROGRESS} from "app/constants/loader"

export function loading () {
    return { type: LOADING }
}

export function loaded () {
    return { type: LOADED }
}

export function progress ( pcent ) {
    return { type: PROGRESS, progress: pcent }
}
