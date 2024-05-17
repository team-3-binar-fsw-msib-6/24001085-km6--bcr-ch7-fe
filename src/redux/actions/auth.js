import axios from "axios";
import { toast } from "sonner";
import { setIsLoading, setToken, setUser } from "../reducers/auth";

export const login = (navigate, email, password) => async (dispatch) => {
  // setIsLoading(true);
  dispatch(setIsLoading(true));

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const {
      data: { token, user },
    } = res.data;

    dispatch(setToken(token));
    dispatch(setUser(user));

    return navigate("/");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error Occured");

    dispatch(logout());
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const loginWithGoogle = (navigate, accessToken) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/auth/google-login`,
      { access_token: accessToken }
    );
    console.log(accessToken);

    const { data } = response.data;
    const { token, user } = data;

    dispatch(setToken(token));
    dispatch(setUser(user));

    return navigate("/");
  } catch (error) {
    toast.error(error?.response?.data?.message);

    dispatch(logout());
  }
};

export const register =
  (navigate, name, email, photo, password) => async (dispatch) => {
    dispatch(setIsLoading(true));

    let data = new FormData();
    data.append("email", email);
    data.append("name", name);
    data.append("picture", photo);
    data.append("password", password);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/register`,
        data
      );

      const {
        data: { token, user },
      } = res.data;

      dispatch(setToken(token));
      dispatch(setUser(user));
      return navigate("/");
    } catch (error) {
      toast(error?.response?.data?.message || "Error Occured");
      dispatch(logout());
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const getProfile =
  (navigate, successRedirect, errorRedirect) => async (dispatch, getState) => {
    const { token } = getState().auth;

    if (!token) {
      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect);
        }
      }
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data } = res.data;

      dispatch(setUser(data));

      if (navigate) {
        if (successRedirect) {
          navigate(successRedirect);
        }
      }
    } catch (error) {
      toast(error?.response?.data?.message || "Error Occured");
      dispatch(logout());

      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect);
        }
      }
    }
  };

export const logout = (navigate) => async (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  return navigate("/login");
};

export const vote = (navigate, voteId) => async (dispatch, getState) => {
  const { user, token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const userRes = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/auth/user-vote`,
      { id: user.id, voteId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const voteRes = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/vote`,
      { voteId }
    );

    const { data } = userRes.data;
    const { message } = voteRes.data;
    setUser(data);
    toast(message);
    return navigate("/");
  } catch (error) {
    toast(error?.response?.data?.message || "Error Occured");
    dispatch(logout());
  } finally {
    dispatch(setIsLoading(false));
  }
};
