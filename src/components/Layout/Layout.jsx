import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Provider } from "react-redux";
import { reduxStore } from "../../Redux/reduxStore";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";
import Contact from "../Contact/Contact";

const Layout = () => {
  return (
    <>
      <Provider store={reduxStore}>
        <Navbar />
        <Outlet />
        {/* <Contact /> */}
        <Footer />
        <Toaster position="top-left" />
      </Provider>
    </>
  );
};

export default Layout;
