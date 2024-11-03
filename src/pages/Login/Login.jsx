import { useFormik } from "formik";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginMethod } from "../../Redux/authSlice";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";


const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((store) => store.authReducer);
  const navigate = useNavigate();
  const loginFormikObj = useFormik({
    initialValues: {
      mobile: "",

      password: "",
    },
    onSubmit: (values) => {
      console.log("done", values);
      const formData = new FormData();
      formData.append("mobile", values.mobile);
      formData.append("password", values.password);
      // call api hena
      dispatch(loginMethod(formData))
        // .then((res) => {
        //   console.log("res", res);
        //   if (res.meta.requestStatus === "fulfilled") {
        //     toast.success(res.payload.data.message);
        //     localStorage.setItem("userToken", res.payload.data.data);
        //     navigate("/");
        //   } else {
        //     toast.error(res.payload.response.data.message);
        //   }
        // })
        // .catch((err) => {});
    },
    validationSchema: Yup.object({
      mobile: Yup.string().required("رقم الهاتف مطلوب"),
      password: Yup.string()
        .min(6, "يجب أن تكون كلمة المرور على الأقل 8 أحرف")
        .required("كلمة المرور مطلوبة"),
    }),
  });
  if(isError){
    toast.error(isError)
  }
  // useEffect(()=>{
    
  // },[isError])
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl font-bold tracking-tight text-gray-900 mb-5">
          مرحبا بك في أليانا 👋
        </h2>
        <p className="text-[#667085] text-center text-xl">
          من فضلك املئ هذه الاستمارة
        </p>
      </div>
      <div className="mt-10 mx-auto p-12 shadow-md rounded-lg w-[644px] h-[766px]">
        <form onSubmit={loginFormikObj.handleSubmit} className="space-y-6">
          <h3 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900 mb-5">
            تسجيل الدخول
          </h3>

          {/* phone */}
          <div className="flex justify-between">
            <div className="mt-2">
              <input
                id="mobile"
                name="mobile"
                // type="tel"
                placeholder="رقم الهاتف"
                className="block w-[548px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={loginFormikObj.handleChange}
                onBlur={loginFormikObj.handleBlur}
                value={loginFormikObj.values.mobile}
              />
              {loginFormikObj.touched.mobile &&
                loginFormikObj.errors.mobile && (
                  <div className="text-red-500 text-sm mt-1">
                    {loginFormikObj.errors.mobile}
                  </div>
                )}
            </div>
            {/* phone */}
            {/* <div className="mt-2">
              <input
                id="mobile"
                name="mobile"
                // type="tel"
                placeholder="رقم الهاتف"
                className="block w-[266px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={loginFormikObj.handleChange}
                onBlur={loginFormikObj.handleBlur}
                value={loginFormikObj.values.mobile}
              />
              {loginFormikObj.touched.mobile &&
                loginFormikObj.errors.mobile && (
                  <div className="text-red-500 text-sm mt-1">
                    {loginFormikObj.errors.mobile}
                  </div>
                )}
            </div> */}
          </div>

          {/* password */}
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="الرقم السري"
              className="block w-[548px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
              onChange={loginFormikObj.handleChange}
              onBlur={loginFormikObj.handleBlur}
              value={loginFormikObj.values.password}
            />
            {loginFormikObj.touched.password &&
              loginFormikObj.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {loginFormikObj.errors.password}
                </div>
              )}
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center align-middle items-center w-full rounded-md bg-red-500 px-3 py-3 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin text-white text-xl" />
              ) : (
                <>
                  {" "}
                  <span className="ml-2 text-xl">تسجيل الدخول</span>
                  <BiLeftArrowAlt className="text-xl" />
                </>
              )}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center font-semibold text-sm/6 text-gray-500">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="font-semibold text-red-500">
            إنشئ حساب
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
