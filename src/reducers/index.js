import { combineReducers } from 'redux';
import tasks from './tasks';

const Reducer = combineReducers({
    tasks, //=== tasks : tasks;
});

export default Reducer;