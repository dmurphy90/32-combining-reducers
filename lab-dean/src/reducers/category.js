export default (state=[], action) => {
  let {type, payload} = action;

  switch(type) {
  case 'CATEGORY_CREATE': return [...state, payload];
  case 'CATEGORY_UPDATE': return state.map(category => category._id === payload._id ? payload : category);
  case 'CATEGORY_DELETE': return state.filter(category => category._id !== payload._id);
  case 'CATEGORY_RESET': return [];
  default: return state;
  }
};