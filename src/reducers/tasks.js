import * as types from './../constants/ActionTypes';

var dataTasks = JSON.parse(localStorage.getItem('tasks'));
var rdStr= require("randomstring");
var initialState = dataTasks ? dataTasks : [];

var Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL :
            return state;
        case types.ADD_TASK :
            var newTask = {
                id : rdStr.generate(),
                name : action.task.name,
                status : Boolean(action.task.status),
            }
            state.push(newTask);
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        default: 
            return state;
    }
}

export default Reducer