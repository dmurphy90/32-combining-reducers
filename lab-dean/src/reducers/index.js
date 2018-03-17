import expenseReducer from './expense';
import categoryReducer from './category';
import {combineReducers} from 'redux';

export default combineReducers({
  expenses: expenseReducer,
  categories: categoryReducer,
});