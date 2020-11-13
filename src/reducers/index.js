import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';

const Reducer = combineReducers({
    tasks, //=== tasks : tasks;
    isDisplayForm
});

export default Reducer;