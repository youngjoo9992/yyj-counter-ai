import axios from "axios";
import { BACKEND_URL } from "./endpoint";

const exampleResponse = {
  response: "exampleResponse",
};

let controller = null;
let requested = false;

export const get_counter = async (query, opinion) => {
  if (requested) return;
  controller = new AbortController();
  requested = true;
  const data = await axios({
    method: "post",
    url: `${BACKEND_URL}/counter`,
    data: {
      query: query,
      opinion: opinion,
    },
    signal: controller.signal,
  });
  requested = false;
  return data;
};

export const cancel_get_counter = () => {
  if (controller && requested) {
    controller.abort();
    requested = false;
  }
};
