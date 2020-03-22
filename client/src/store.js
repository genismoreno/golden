import { createStore } from "redux";

import reducer from "./reducer";

function store(
    state = {
      phrase: undefined
    }
  ) {
    return createStore(
      reducer,
      state,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      
    );
  }


/*const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});*/

export default store;


