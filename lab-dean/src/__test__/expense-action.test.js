import * as actions from '../actions/expense-actions';

describe('Expense Actions', function() {
  it('should create an action to add an expense', () => {
    let expense = {name: 'dog'};
    let action = actions.expenseCreate(expense);

    expect(action.type).toEqual('EXPENSE_CREATE');
    expect(action.payload).toHaveProperty('_id');
    expect(action.payload).toHaveProperty('timestamp');
  });
});