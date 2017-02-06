import { Map } from 'immutable';

export function setState(formItems) {
  let state = Map();
  formItems.forEach(item => {
    const path = item.name.split('.');
    state = state.setIn(path, item.value);
  });

  return state.toJS();
}
