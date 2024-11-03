import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Provider } from "react-redux";
import { reduxStore } from "../../Redux/reduxStore";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Provider store={reduxStore}>
        <Navbar />
        <div className="container mx-auto p-10 max-w-screen-xl">
          <Outlet />
        </div>
        <Toaster position="top-left" />
      </Provider>
    </>
  );
};

export default Layout;
