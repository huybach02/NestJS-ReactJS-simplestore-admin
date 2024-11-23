import {ConfigProvider} from "antd";
import {Routers} from "./routes/Routers";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "./redux/slice/userSlice";
import {authService} from "./service/authService";
import {BrowserRouter} from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMe = async () => {
      const user = await authService.me();
      if (user.success) {
        dispatch(setUser(user.data));
      }
    };
    getMe();
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000",
          },
        }}
      >
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
