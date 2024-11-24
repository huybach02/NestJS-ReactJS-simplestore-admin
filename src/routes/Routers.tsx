import {useSelector} from "react-redux";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import {RootState} from "../redux/store";
import {useEffect, useState} from "react";
import {User} from "../types/userType";
import {Loading} from "../components/Loading";
import {message} from "antd";

export const Routers = () => {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {user} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    setIsLoading(true);
    if (user) {
      if (user.role === "admin") {
        setData(user);
      } else {
        setData(null);
        message.error("You are not authorized to access this page");
      }
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      timeout = setTimeout(() => {
        setData(null);
        setIsLoading(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [user]);

  return isLoading ? <Loading /> : data ? <MainRouter /> : <AuthRouter />;
};
