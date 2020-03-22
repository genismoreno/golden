import { ADD_PHRASE } from './actions';

const reducer = (state = {}, action) => {
  console.log('IN REDUCER!');
  console.log(state);
  switch (action.type) {
    case ADD_PHRASE:
        return {
          phrase: action.phrase
        }
    default:
        return state;
  }
}

export default reducer;