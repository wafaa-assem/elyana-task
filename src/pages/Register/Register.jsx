import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerMethod } from "../../Redux/authSlice";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { getAreas, getCities, getGov } from "../../Redux/locationSlice";

const Register = () => {
  // const [governorates, setGovernorates] = useState([]);
  // const [centers, setCenters] = useState([]);
  // const [areas, setAreas] = useState([]); // State for areas

  const navigate = useNavigate();
  const [selected, setSelected] = useState("commercial");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.authReducer);
  const { governorates, cities, areas } = useSelector(
    (store) => store.locationReducer
  );

  const registerFormikObj = useFormik({
    initialValues: {
      user_type: selected,
      name: "",
      governorate_id: "",
      city_id: "",
      area_id: "",
      mobile: "",
      password: "",
      password_confirmation: "",
      location: "",
      business_image: null,
    },
    onSubmit: (values) => {
      const formData = new FormData();

      // Add other form fields to formData
      formData.append("user_type", values.user_type);
      formData.append("name", values.name);
      formData.append("governorate_id", values.governorate_id);
      formData.append("city_id", values.city_id);
      formData.append("area_id", values.area_id);
      formData.append("mobile", values.mobile);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("location", values.location);

      // Add the business image file (if selected for commercial users)
      if (values.user_type === "commercial" && values.business_image) {
        formData.append("business_image", values.business_image);
      }
      dispatch(registerMethod(formData))
        .then((res) => {
          // sawa2 sa7 aw ghalt hyege hena // el far2 fel res hyege mn type eh fulfilled wala rejected => need to handle it by rejectWithValue 34an yege mn rejected
          console.log("res", res);
          if (res.meta.requestStatus == "fulfilled") {
            toast.success(res.payload.data.message);
            navigate("/login");
          } else {
            toast.error(res.payload.response.data.message);
          }
        })
        .catch((error) => {
          console.log("err", error);
        });
    },
    validationSchema: Yup.object({
      name: Yup.string().required("الاسم مطلوب"),
      mobile: Yup.string().required("رقم الهاتف مطلوب"),
      governorate_id: Yup.string().required("المحافظة مطلوبة"),
      city_id: Yup.string().required("المركز مطلوب"),
      area_id: Yup.string().required("القرية مطلوبة"),
      password: Yup.string()
        .min(8, "يجب أن تكون كلمة المرور على الأقل 8 أحرف")
        .required("كلمة المرور مطلوبة"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين")
        .required("يرجى تأكيد كلمة المرور"),
      location:
        selected === "commercial"
          ? Yup.string().required("الموقع مطلوب")
          : undefined,
      business_image:
        selected === "commercial"
          ? Yup.mixed().required("صورة النشاط التجاري مطلوبة")
          : undefined,
    }),
  });

  const handleUserTypeChange = (type) => {
    setSelected(type);
    registerFormikObj.setFieldValue("user_type", type); // Update Formik field
  };

  // useEffect(() => {
  //   const fetchGovernorates = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://elyana-backend.web-allsafeeg.com/api/v1/cities?per_page=-1"
  //       );
  //       setGovernorates(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching governorates:", error);
  //     }
  //   };

  //   fetchGovernorates();
  // }, []);

  // const handleGovernorateChange = async (governorateId) => {
  //   registerFormikObj.setFieldValue("governorate_id", governorateId);
  //   registerFormikObj.setFieldValue("city_id", ""); // Reset city_id
  //   registerFormikObj.setFieldValue("area_id", ""); // Reset area_id
  //   setCenters([]); // Clear existing centers
  //   setAreas([]);
  //   try {
  //     const response = await axios.get(
  //       `https://elyana-backend.web-allsafeeg.com/api/v1/cities?per_page=-1&filter[governorate_id]=${governorateId}`
  //     );
  //     setCenters(response.data.data);
  //     setAreas([]); // Reset areas when a new governorate is selected
  //   } catch (error) {
  //     console.error("Error fetching centers:", error);
  //   }
  // };

  // const handleCityChange = async (cityId) => {
  //   registerFormikObj.setFieldValue("city_id", cityId);
  //   try {
  //     const response = await axios.get(
  //       `https://elyana-backend.web-allsafeeg.com/api/v1/areas?filter[city_id]=${cityId}`,

  //     );
  //     setAreas(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching areas:", error);
  //   }
  // };

  useEffect(() => {
    dispatch(getGov());
  }, []);
  return (
    <>
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
          <form onSubmit={registerFormikObj.handleSubmit} className="space-y-6">
            <h3 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900 mb-5">
              إنشاء حساب
            </h3>
            <div className="flex mb-4">
              <button
                type="button"
                onClick={() => handleUserTypeChange("home")}
                className={`px-4 w-1/2 py-2 font-semibold ${
                  selected === "home"
                    ? "bg-green-500 text-white"
                    : "bg-transparent text-black border border-green-500"
                }`}
              >
                عميل منزلي
              </button>

              <button
                type="button"
                onClick={() => handleUserTypeChange("commercial")}
                className={`px-4 w-1/2 py-2 font-semibold ${
                  selected === "commercial"
                    ? "bg-green-500 text-white"
                    : "bg-transparent text-black border border-green-500"
                }`}
              >
                عميل تجاري
              </button>
            </div>
            {/* name */}
            <div className="flex justify-between">
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="الاسم"
                  className="block w-[266px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  onChange={registerFormikObj.handleChange}
                  onBlur={registerFormikObj.handleBlur}
                  value={registerFormikObj.values.name}
                />
                {registerFormikObj.touched.name &&
                  registerFormikObj.errors.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {registerFormikObj.errors.name}
                    </div>
                  )}
              </div>
              {/* phone */}
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobile"
                  // type="tel"
                  placeholder="رقم الهاتف"
                  className="block w-[266px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  onChange={registerFormikObj.handleChange}
                  onBlur={registerFormikObj.handleBlur}
                  value={registerFormikObj.values.mobile}
                />
                {registerFormikObj.touched.mobile &&
                  registerFormikObj.errors.mobile && (
                    <div className="text-red-500 text-sm mt-1">
                      {registerFormikObj.errors.mobile}
                    </div>
                  )}
              </div>
            </div>
            {/* gov */}
            <div className="flex justify-between">
              <div className="mt-2">
                <select
                  id="governorate_id"
                  name="governorate_id"
                  className="block w-[172px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  onBlur={registerFormikObj.handleBlur}
                  onChange={(e) => {
                    dispatch(getCities(e.target.value));
                    registerFormikObj.handleChange(e);
                  }}

                  // value={registerFormikObj.values.governorate_id}
                >
                  <option value="" disabled selected>
                    المحافظة
                  </option>
                  {governorates?.map((governorate) => {
                    return (
                      <option key={governorate.Id} value={governorate.Id}>
                        {governorate.Name}
                      </option>
                    );
                  })}
                </select>
                {registerFormikObj.touched.governorate_id &&
                  registerFormikObj.errors.governorate_id && (
                    <div className="text-red-500">
                      {registerFormikObj.errors.governorate_id}
                    </div>
                  )}
              </div>
              {/* City */}
              <div className="mt-2">
                <select
                  id="city_id"
                  name="city_id"
                  className="block w-[172px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  onBlur={registerFormikObj.handleBlur}
                  onChange={(e) => {
                    dispatch(getAreas(e.target.value));
                    registerFormikObj.handleChange(e);
                  }}
                  // value={registerFormikObj.values.city_id}
                >
                  <option value="" disabled selected>
                    المركز
                  </option>
                  {/* Add your options here */}
                  {cities?.map((city) => (
                    <option key={city.Id} value={city.Id}>
                      {city.Name}
                    </option>
                  ))}
                </select>
                {registerFormikObj.touched.city_id &&
                  registerFormikObj.errors.city_id && (
                    <div className="text-red-500">
                      {registerFormikObj.errors.city_id}
                    </div>
                  )}
              </div>
              {/* Area */}
              <div className="mt-2">
                <select
                  id="area_id"
                  name="area_id"
                  className="block w-[172px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  onBlur={registerFormikObj.handleBlur}
                  onChange={registerFormikObj.handleChange}
                  // value={registerFormikObj.values.area_id}
                >
                  <option value="" disabled selected>
                    القرية
                  </option>
                  {/* Add your options here */}
                  {areas?.map((area) => (
                    <option key={area.Id} value={area.Id}>
                      {area.Name}
                    </option>
                  ))}
                </select>
                {registerFormikObj.touched.area_id &&
                  registerFormikObj.errors.area_id && (
                    <div className="text-red-500">
                      {registerFormikObj.errors.area_id}
                    </div>
                  )}
              </div>
            </div>
            {/* image */}
            {selected === "commercial" && (
              <div className="mt-2">
                <input
                  id="business_image"
                  name="business_image"
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    // Update the Formik value with the selected file
                    const file = event.currentTarget.files[0];
                    registerFormikObj.setFieldValue("business_image", file);
                  }}
                />
                <label
                  htmlFor="business_image"
                  className="block w-[548px] h-[42px] text-gray-400 p-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm"
                >
                  {registerFormikObj.values.business_image
                    ? registerFormikObj.values.business_image.name
                    : "ضع صورة النشاط التجاري"}{" "}
                </label>
                {registerFormikObj.touched.business_image &&
                  registerFormikObj.errors.business_image && (
                    <div className="text-red-500 text-sm mt-1">
                      {registerFormikObj.errors.business_image}
                    </div>
                  )}
              </div>
            )}
            {/* password */}
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="الرقم السري"
                className="block w-[548px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={registerFormikObj.handleChange}
                onBlur={registerFormikObj.handleBlur}
                value={registerFormikObj.values.password}
              />
              {registerFormikObj.touched.password &&
                registerFormikObj.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {registerFormikObj.errors.password}
                  </div>
                )}
            </div>
            {/* rePassword */}
            <div className="mt-2">
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                placeholder=" تأكيد الرقم السري"
                className="block w-[548px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={registerFormikObj.handleChange}
                onBlur={registerFormikObj.handleBlur}
                value={registerFormikObj.values.password_confirmation}
              />
              {registerFormikObj.touched.password_confirmation &&
                registerFormikObj.errors.password_confirmation && (
                  <div className="text-red-500 text-sm mt-1">
                    {registerFormikObj.errors.password_confirmation}
                  </div>
                )}
            </div>
            {/* location */}
            {selected === "commercial" && (
              <div className="mt-2">
                <input
                  id="location"
                  name="location"
                  type="url"
                  placeholder="موقع النشاط الحالي (ارفق رابط لموقعك)"
                  className="block w-[548px] h-[42px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  onChange={registerFormikObj.handleChange}
                  onBlur={registerFormikObj.handleBlur}
                  value={registerFormikObj.values.location}
                />
                {registerFormikObj.touched.location &&
                  registerFormikObj.errors.location && (
                    <div className="text-red-500 text-sm mt-1">
                      {registerFormikObj.errors.location}
                    </div>
                  )}
              </div>
            )}
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
                    <span className="ml-2 text-xl">انشاء حساب</span>
                    <BiLeftArrowAlt className="text-xl" />
                  </>
                )}
              </button>
            </div>
          </form>
          <p className="mt-10 text-center font-semibold text-sm/6 text-gray-500">
            هل لديك حساب بالفعل؟
            <Link to="/login" className="font-semibold text-red-500">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
