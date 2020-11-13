import * as types from './../constants/ActionTypes';

var dataTasks = JSON.parse(localStorage.getItem('tasks'));

var initialState = dataTasks ? dataTasks : [];

var Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL :
            return state;
        default: 
            return state;
    }
}

export default Reducer