import actions from "./actions";
import { DataService } from "../../config/dataservice/Dataservice";
import { API } from "../../config/api";
import { Alert } from "@mui/material";

const { getRepositoryData } = actions;
export const getRepository = () => {
  return async (dispatch) => {
    const query = "created:>2017-10-22";
    const sort = "stars";
    const order = "desc";
    const page = "1";

    const fullUrl = `${API.repos.get}?q=${query}&sort=${sort}&order=${order}&page=${page}`;

    try {
      const getData = await DataService.get(fullUrl);

      if (!getData.data.error) {
        dispatch(getRepositoryData(getData.data));
        return true;
      } else {
        // Assuming `getData.data.message` contains the error message
        return false;
      }
    } catch (error) {
      console.error("Error fetching repository data:", error);
      return false;
    }
  };
};
