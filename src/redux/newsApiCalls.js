import {
    getNewsStart,
    getNewsSuccess,
    getNewsFailure,
    deleteNewsStart,
    deleteNewsSuccess,
    deleteNewsFailure,
    updateNewsStart,
    updateNewsSuccess,
    updateNewsFailure,
    addNewsStart,
    addNewsSuccess,
    addNewsFailure,
  } from "./newsRedux";
  import { publicRequest } from "../requestMethods";
  
  export const getNews = async (dispatch, token) => {
    dispatch(getNewsStart());
    try {
      const res = await publicRequest.get("/News/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getNewsSuccess(res.data.data));
      return 1;
    } catch (err) {
      dispatch(getNewsFailure());
      return 0;
    }
  };
  
  export const deleteNews = async (id, dispatch,token) => {
    dispatch(deleteNewsStart());
    try {
      const res = await publicRequest.delete(`/News/delete-News?News_id=${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
    //   dispatch(deleteNewsSuccess(id));
      return 1;
    } catch (err) {
    //   dispatch(deleteNewsFailure());
      return 0;
    }
  };
  
  export const updateNews = async (News, dispatch, token) => {
    dispatch(updateNewsStart());
    try {
      // update
      const res = await publicRequest.put(`/News/update-News`, News, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // dispatch(updateNewsSuccess({ id, News }));
      console.log(res);
      return 1;
    } catch (err) {
      dispatch(updateNewsFailure());
      return 0;
    }
  };
  export const addNews = async (News, token) => {
    // dispatch(addNewsStart());
    try {
      const res = await publicRequest.post(`/News/create-News`, News, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      // dispatch(addNewsSuccess(res.data));
      return 1;
    } catch (err) {
      // dispatch(addNewsFailure());
      return 0;
    }
  };
  