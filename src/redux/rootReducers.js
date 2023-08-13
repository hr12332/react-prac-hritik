import { combineReducers } from "redux";

import RepositoryReducer from "./repos/reducers";
import AllRepositoryReducer from "./repos/reducers"

const rootReducers = combineReducers({
    RepositoryReducer,AllRepositoryReducer
});

export default rootReducers;
