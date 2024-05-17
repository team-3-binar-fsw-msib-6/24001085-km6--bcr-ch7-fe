import { getProfile } from "@/redux/actions/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile(navigate, null, "/login"));
  }, [dispatch, navigate, token]);

  return children;
};

export default ProtectedPage;
