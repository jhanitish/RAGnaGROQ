// rootReducer.js
import { combineReducers } from 'redux';
import colorReducer from './Color/color.reducer';

const rootReducer = combineReducers({
    color: colorReducer,
});

export default rootReducer;
