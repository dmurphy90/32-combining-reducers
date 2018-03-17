import reducer from '../reducers/category';
require('jest');

describe('Category Reducer', function() {
  it('Should return the initial state on first call', () => {
    expect(reducer([], {})).toEqual([]);
  });
  it('Should handle a CATEGORY_CREATE action', () => {
    let categoryOne = {_id: '1234', name: 'tim', timestamp: new Date()};
    let categoryTwo = {_id: '5678', name: 'hi', timestamp: new Date()};

    let state = reducer([categoryOne], {
      type: 'CATEGORY_CREATE',
      payload: categoryTwo,
    });
    expect(state).toContain(categoryOne);
    expect(state).toContain(categoryTwo);
  });
});