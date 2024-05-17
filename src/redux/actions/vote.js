import axios from "axios";
import { setIsLoading, setVotes } from "../reducers/vote";
import { toast } from "sonner";

export const getVotes = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/vote`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setVotes(data));
  } catch (error) {
    toast(error?.response?.data?.message || "Error occured!");
  } finally {
    dispatch(setIsLoading(false));
  }
};
