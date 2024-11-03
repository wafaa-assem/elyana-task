import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutMethod } from "../../Redux/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userToken } = useSelector((store) => store.authReducer);

  const handleLogout = () => {

    dispatch(logoutMethod())
      .then((res) => {
        console.log("res", res);
        if (res.meta.requestStatus == "fulfilled") {
          toast.success(res.payload.data.message);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <nav className="bg-gray-100 px-4 py-3 border-t border-gray-300" dir="rtl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <img className="w-[77px] h-[78px]" src={logo} alt="logo" />

        {/* Navbar Links for larger screens */}
        <div className="hidden md:flex flex-grow justify-center items-center space-x-4 space-x-reverse">
          <NavLink
            to="/"
            className="text-gray-700 font-semibold"
            onClick={() => setIsOpen(false)} // Close menu on click
          >
            الرئيسية
          </NavLink>
          <NavLink
            to="/profile"
            className="text-gray-700 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            الوكلاء
          </NavLink>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </button>
        </div>

        {/* Auth Buttons for larger screens */}
        <div className="hidden md:flex items-center space-x-4 space-x-reverse">
          {userToken ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              خروج
            </button>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                إنشاء حساب
              </Link>
              <Link
                to="/login"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                تسجيل دخول
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`flex flex-col items-end md:hidden space-y-4 space-x-reverse ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <NavLink
          to="/"
          className="text-gray-700 font-semibold"
          onClick={() => setIsOpen(false)} // Close menu on click
        >
          الرئيسية
        </NavLink>
        <NavLink
          to="/profile"
          className="text-gray-700 font-semibold"
          onClick={() => setIsOpen(false)}
        >
          الوكلاء
        </NavLink>
        {userToken ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            خروج
          </button>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              إنشاء حساب
            </Link>
            <Link
              to="/login"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              تسجيل دخول
            </Link>
          </>
        )}
        {/* <Link
          to="/register"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          إنشاء حساب
        </Link>
        <Link
          to="/login"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          تسجيل دخول
        </Link>
        <button onClick={handleLogout} type="button" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          خروج
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
