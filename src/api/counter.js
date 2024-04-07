import axios from "axios";
import { BACKEND_URL } from "./endpoint";

export const get_counter = async (query, opinion) => {
  const data = await axios({
    method: "post",
    url: `${BACKEND_URL}/counter`,
    data: {
      query: query,
      opinion: opinion,
    },
  });
  return data;
};
