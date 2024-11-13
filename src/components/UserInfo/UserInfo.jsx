import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileMethod } from "../../Redux/updateProfileSlice";
import { getAreas, getCities, getGov } from "../../Redux/locationSlice";
const UserInfo = ({ data }) => {
  const [selected, setSelected] = useState("commercial");
  const dispatch = useDispatch();
  const [isModified, setIsModified] = useState(false);
  const { governorates, cities, areas } = useSelector(
    (store) => store.locationReducer
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user_type: data?.UserType || "",
      name: data?.Name || "",
      mobile: data?.Mobile || "",
      governorate_id: data?.GovernorateId || "",
      city_id: data?.CityId || "",
      area_id: data?.AreaId || "",
      password: "",
      password_confirmation: "",
      location: data?.Location || "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("user_type", values.user_type);
      formData.append("name", values.name);
      formData.append("governorate_id", values.governorate_id);
      formData.append("city_id", values.city_id);
      formData.append("area_id", values.area_id);
      formData.append("mobile", values.mobile);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("location", values.location);

      // Add the location (if selected for commercial users)
      if (values.user_type === "commercial" && values.location) {
        formData.append("location", values.location);
      }

      // call api after values => formData
      dispatch(updateProfileMethod(formData));
    },
  });

  useEffect(() => {
    const hasChanges =
      JSON.stringify(formik.values) !== JSON.stringify(formik.initialValues);
    setIsModified(hasChanges);
  }, [formik.values]);

  useEffect(() => {
    dispatch(getGov());
  }, []);

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 w-full font-[Montserrat] mt-10"
      >
        <h3 className="md:text-2xl text-xl font-bold text-[#000000] mb-4">
          معلومات المستخدم
        </h3>

        {/* Name */}
        <div className="mt-2 w-full">
          <label htmlFor="name" className="text-lg text-[#667085]">
            الاسم
          </label>
          <input
            id="name"
            name="name"
            type="text"
            // defaultValue={data?.Name}
            placeholder="أدخل الاسم"
            className="block w-full h-[42px] p-2 rounded-md border-0 text-sm shadow-sm ring-1 ring-gray-300 placeholder:text-[#B2B7C0] focus:ring-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>
        {/* Phone */}
        <div className="mt-2 w-full">
          <label htmlFor="mobile" className="text-lg text-[#667085]">
            رقم الهاتف
          </label>
          <input
            id="mobile"
            name="mobile"
            type="text"
            placeholder="أدخل رقم  الهاتف"
            className="block w-full h-[42px] p-2 rounded-md border-0 text-sm shadow-sm ring-1 ring-gray-300 placeholder:text-[#B2B7C0] focus:ring-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.mobile}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {/* Governorate */}
          <div className="mt-2 w-full ">
            <label htmlFor="governorate_id" className="text-lg text-[#667085]">
              المحافظة
            </label>
            <select
              id="governorate_id"
              name="governorate_id"
              className="block w-full h-[42px] p-2 rounded-md text-sm border-0 text-gray-400 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
              onChange={(e) => {
                dispatch(getCities(e.target.value));
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.governorate_id}
            >
              <option value="" disabled selected>
                {data?.GovernorateName}
              </option>
              {governorates?.map((governorate) => {
                return (
                  <option key={governorate.Id} value={governorate.Id}>
                    {governorate.Name}
                  </option>
                );
              })}
            </select>
            {formik.touched.governorate_id && formik.errors.governorate_id && (
              <div className="text-red-500">{formik.errors.governorate_id}</div>
            )}
          </div>
          {/* City */}
          <div className="mt-2 w-full ">
            <label htmlFor="city_id" className="text-lg text-[#667085]">
              المركز
            </label>
            <select
              id="city_id"
              name="city_id"
              className="block w-full h-[42px] p-2 rounded-md text-sm border-0 text-gray-400 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
              onChange={(e) => {
                dispatch(getAreas(e.target.value));
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.city_id}
            >
              <option value="" disabled selected>
                {data?.CityName}
              </option>
              {cities?.map((city) => (
                <option key={city.Id} value={city.Id}>
                  {city.Name}
                </option>
              ))}
            </select>
            {formik.touched.city_id && formik.errors.city_id && (
              <div className="text-red-500">{formik.errors.city_id}</div>
            )}
          </div>
          {/* Area */}
          <div className="mt-2 w-full ">
            <label htmlFor="area_id" className="text-lg text-[#667085]">
              القرية
            </label>
            <select
              id="area_id"
              name="area_id"
              className="block w-full h-[42px] p-2 rounded-md text-sm border-0 text-gray-400 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.area_id}
            >
              <option value="" disabled selected>
                {data?.AreaName}
              </option>
              {areas?.map((area) => (
                <option key={area.Id} value={area.Id}>
                  {area.Name}
                </option>
              ))}
            </select>
            {formik.touched.area_id && formik.errors.area_id && (
              <div className="text-red-500">{formik.errors.area_id}</div>
            )}
          </div>
        </div>
        {/* password */}
        <div className="mt-2">
          <label htmlFor="password" className="text-lg text-[#667085]">
            الرقم السري
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="أدخل كلمة المرور"
            className="block w-full h-[42px] p-2 rounded-md border-0 text-sm shadow-sm ring-1 ring-gray-300 placeholder:text-[#B2B7C0] focus:ring-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        {/* rePassword */}
        <div className="mt-2">
          <label
            htmlFor="password_confirmation"
            className="text-lg text-[#667085]"
          >
            تأكيد كلمة المرور
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            placeholder=" أدخل كلمة المرور"
            className="block w-full h-[42px] p-2 rounded-md border-0 text-sm shadow-sm ring-1 ring-gray-300 placeholder:text-[#B2B7C0] focus:ring-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password_confirmation &&
            formik.errors.password_confirmation && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password_confirmation}
              </div>
            )}
        </div>
        {/* location */}
        {selected === "commercial" && (
          <div className="mt-2 ">
            <label
              htmlFor="password_confirmation"
              className="text-lg text-[#667085]"
            >
              الموقع الحالي
            </label>
            <input
              id="location"
              name="location"
              type="url"
              placeholder="أدخل الموقع الحالي"
              className="block w-full h-[42px] p-2 rounded-md border-0 text-sm shadow-sm ring-1 ring-gray-300 placeholder:text-[#B2B7C0] focus:ring-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.location}
              </div>
            )}
          </div>
        )}

        <button
          disabled={!isModified}
          type="submit"
          className="flex disabled:opacity-45 justify-center items-center rounded-md bg-[#0DB760] px-6 py-3 text-white font-medium text-lg"
        >
          حفظ{" "}
        </button>
      </form>
    </>
  );
};

export default UserInfo;
