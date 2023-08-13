const actions = {
  GET_REPOSITORIES: "GET_REPOSITORIES",

  getRepositoryData: (data) => {
    return {
      type: actions.GET_REPOSITORIES,
      data,
    };
  },
};

export default actions;
