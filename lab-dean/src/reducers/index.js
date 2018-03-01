import expenseReducer from './expense';
import {combineReducers} from 'redux';
import categoryReducer from './category';

export default combineReducers({
  expenses: expenseReducer,
  categories: categoryReducer,
});