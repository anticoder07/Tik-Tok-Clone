import * as request from "../utils/request";

export const video = async () => {
  try {
    const res = await request.get("content");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const videoMore = async () => {
  try {
    const res = await request.get("content");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
