import * as request from "../utils/request";

export const sidebar = async (q, type = "less") => {
  try {
    const res = await request.get("usersSearch", {
      params: {
        q,
        type,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
