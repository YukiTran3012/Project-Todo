import * as types from './../constants/ActionTypes';

var initialState = [];

var Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL :
            return state;
        default: 
            return state;
    }
}

export default Reducer