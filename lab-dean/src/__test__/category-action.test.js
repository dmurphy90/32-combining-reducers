import * as actions from '../actions/category-actions';

describe('Category Actions', function() {
  it('Should create an action to add a new category', () => {
    let category = {name: 'tim'};
    let action = actions.categoryCreate(category);

    expect(action.type).toEqual('CATEGORY_CREATE');
    expect(action.payload).toHaveProperty('_id');
    expect(action.payload).toHaveProperty('timestamp');
  });
});