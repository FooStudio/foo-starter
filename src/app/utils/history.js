/**
 * Created by mendieta on 1/14/16.
 */

import {createHistory, createHashHistory, createMemoryHistory, useBasename} from "history"


//HTML5 HISTORY API
/*
 export default useBasename(createHistory)({
 basename: ""
 })
 */


//MEMORY HISTORY
/*export default useBasename(createMemoryHistory)({
 basename: ""
 })*/


//HASH HISTORY
export default useBasename(createHashHistory)({
    basename: "",
    queryKey: false
})
