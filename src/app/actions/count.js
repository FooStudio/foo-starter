/**
 * Created by mendieta on 7/8/16.
 */

import {INCREASE, DECREASE} from "app/constants/user"

export function increase ( n ) {
    return {
        type  : INCREASE,
        amount: n
    }
}

export function decrease ( n ) {
    return {
        type  : DECREASE,
        amount: n
    }
}
