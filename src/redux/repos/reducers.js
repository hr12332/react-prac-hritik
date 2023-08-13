import actions from "./actions";

const { GET_REPOSITORIES } = actions;

const initState = {
  repo: {},
};

const RepositoryReducer = (state = initState, action) => {
  const { type, data } = action;

  switch (type) {
    case GET_REPOSITORIES:
      return {
        ...state,
        repo: data,
      };

    default:
      return state;
  }
};

export default RepositoryReducer;
