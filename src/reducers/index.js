import { combineReducers } from 'redux';
import tasks from './tasks';

const Reducer = combineReducers({
    tasks,
});

export default Reducer;