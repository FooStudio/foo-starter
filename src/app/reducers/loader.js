import {LOADED, LOADING, PROGRESS} from "app/constants/loader"

const initialState = {
    loading : false,
    progress: 0
}

export default function update ( state = initialState, action ) {
    if ( action.type === LOADED ) {
        return { ...state, loading: false }
    } else if ( action.type === LOADING ) {
        return { ...state, loading: true, progress: 0 }
    } else if ( action.type === PROGRESS ) {
        return { ...state, progress: action.progress }
    }
    return state;
}
