import { useEffect, useState } from "react";
import image2 from "../../assets/Group 9075.png";
import { IoCloudDownloadOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { sendData } from "../../Redux/PartnerSlice";
import { getAreas, getCities, getGov } from "../../Redux/locationSlice";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

const BePartner = ({ data }) => {
  const [selected, setSelected] = useState("agent");
  const dispatch = useDispatch();
  const { governorates, cities, areas } = useSelector(
    (store) => store.locationReducer
  );
  const { isError, isLoading, msg } = useSelector(
    ({ partnerReducer }) => partnerReducer
  );

  const formik = useFormik({
    initialValues: {
      user_type: selected,
      name: "",
      governorate_id: "",
      city_id: "",
      area_id: "",
      mobile: "",
      personal_image: "",
      car_image: "",
      car_type: "",
      license_number: "",
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
      formData.append("personal_image", values.personal_image);

      // Add the car_image file (if selected for transport)
      if (values.user_type === "transport" && values.car_image) {
        formData.append("car_image", values.car_image);
      }
      // Add the car_type file (if selected for transport)
      if (values.user_type === "transport" && values.car_type) {
        formData.append("car_type", values.car_type);
      }
      // Add the license_number file (if selected for transport)
      if (values.user_type === "transport" && values.license_number) {
        formData.append("license_number", values.license_number);
      }
      dispatch(sendData(formData));
    },
    validationSchema: Yup.object({
      name: Yup.string().required("الاسم مطلوب"),
      mobile: Yup.string().required("رقم الهاتف مطلوب"),
      governorate_id: Yup.string().required("المحافظة مطلوبة"),
      city_id: Yup.string().required("المركز مطلوب"),
      area_id: Yup.string().required("القرية مطلوبة"),
      personal_image: Yup.mixed().required("صورة البطاقة مطلوبة"),
      car_image:
        selected === "transport"
          ? Yup.mixed().required("صورة السيارة مطلوبة")
          : undefined,
      car_type:
        selected === "transport"
          ? Yup.mixed().required("نوع السيارة مطلوبة")
          : undefined,
      license_number:
        selected === "transport"
          ? Yup.mixed().required("رقم الترخيص مطلوب")
          : undefined,
    }),
  });

  // handle error
  if (isError) {
    toast.error(isError);
  }
  // handle success
  if (msg) {
    toast.success(msg);
  }

  useEffect(() => {
    dispatch(getGov());
  }, []);

  return (
    <section className="py-12 bg-[#FFF2F2] font-[Inter] relative">
      <div className="container mx-auto max-w-screen-xl px-8 md:px-6 lg:px-12">
        <div className="w-[95px] h-[41px] border-[0.5px] border-[#0DB760] font-[500] text-xl leading-[29px] text-[#0DB760] rounded-full flex justify-center items-center">
          {data?.top_title}
        </div>
        <h2 className="font-[600] text-[35px] md:text-[40px] leading-[54px] my-4">
          {data?.title}
        </h2>
        <p className="max-w-[350px] font-[400] text-[16px] md:text-[17px] leading-[24px] text-[#323433]">
          {data?.description}
        </p>
        <select
          className="select select-bordered select-sm w-full max-w-xs font-[Montserrat] mt-3"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option
            disabled
            selected
            className="font-[400] text-[16px] leading-[24px] text-[#667085]"
          >
            النوع
          </option>
          <option value="agent">وكيل</option>
          <option value="transport">سائق نقل</option>
        </select>

        {/* Open Modal */}
        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className={
            "bg-[#0DB760] text-white font-[400] rounded-lg py-2 px-4 md:w-[302px] block m-auto mt-20 font-[Montserrat]"
          }
        >
          بدأ الشراكة
        </button>
        {/* Modal */}
        <dialog id="my_modal_2" className="modal px-5">
          <div className="modal-box w-full max-w-screen-md flex flex-col items-center">
            <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
              <h3 className="text-center text-2xl font-bold text-gray-900 mb-4">
                {selected === "agent"
                  ? "شارك كـوكيل"
                  : "شارك كـسائق نقل واللوجستيات"}
              </h3>
              <div className="flex gap-2">
                {/* Name */}
                <div className="mt-2 w-full">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="الاسم"
                    className="block w-full h-[42px] p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
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
                  <input
                    id="mobile"
                    name="mobile"
                    type="text"
                    placeholder="رقم الهاتف"
                    className="block w-full h-[42px] p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
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
              </div>

              <div className="flex gap-2">
                {/* Governorate */}
                <div className="mt-2 w-full ">
                  <select
                    id="governorate_id"
                    name="governorate_id"
                    className="block w-full h-[42px] p-2 rounded-md border-0 text-gray-400 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      dispatch(getCities(e.target.value));
                      formik.handleChange(e);
                    }}
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
                  {formik.touched.governorate_id &&
                    formik.errors.governorate_id && (
                      <div className="text-red-500">
                        {formik.errors.governorate_id}
                      </div>
                    )}
                </div>

                {/* City */}
                <div className="mt-2 w-full ">
                  <select
                    id="city_id"
                    name="city_id"
                    className="block w-full h-[42px] p-2 rounded-md border-0 text-gray-400 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      dispatch(getAreas(e.target.value));
                      formik.handleChange(e);
                    }}
                  >
                    <option value="" disabled selected>
                      المركز
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
                  <select
                    id="area_id"
                    name="area_id"
                    className="block w-full h-[42px] p-2 rounded-md border-0 text-gray-400 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    <option value="" disabled selected>
                      القرية
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

              {/* Image id upload */}
              <div className="mt-2 w-full">
                <input
                  id="personal_image"
                  name="personal_image"
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    // Update the Formik value with the selected file
                    const file = event.currentTarget.files[0];
                    formik.setFieldValue("personal_image", file);
                  }}
                />
                <label
                  htmlFor="personal_image"
                  className="flex justify-between items-center w-full h-[42px] p-2 rounded-md border-0 text-gray-400 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                >
                  <span>ضع صورة بطاقة شخصية سارية</span>
                  <IoCloudDownloadOutline className="w-6 h-6" />
                </label>
                {formik.touched.personal_image &&
                  formik.errors.personal_image && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.personal_image}
                    </div>
                  )}
              </div>

              {/* Image car upload */}
              {selected === "transport" && (
                <div className="mt-2 w-full">
                  <input
                    id="car_image"
                    name="car_image"
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      // Update the Formik value with the selected file
                      const file = event.currentTarget.files[0];
                      formik.setFieldValue("car_image", file);
                    }}
                  />
                  <label
                    htmlFor="car_image"
                    className="flex justify-between items-center w-full h-[42px] p-2 rounded-md border-0 text-gray-400 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  >
                    <span>ضع صورة للسيارة</span>
                    <IoCloudDownloadOutline className="w-6 h-6" />
                  </label>
                  {formik.touched.car_image && formik.errors.car_image && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.car_image}
                    </div>
                  )}
                </div>
              )}

              {/* Type */}
              {selected === "transport" && (
                <div className="mt-2 w-full">
                  <input
                    id="car_type"
                    name="car_type"
                    type="text"
                    placeholder="نوع العربية"
                    className="block w-full h-[42px] p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.car_type}
                  />
                  {formik.touched.car_type && formik.errors.car_type && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.car_type}
                    </div>
                  )}
                </div>
              )}

              {/* Number */}
              {selected === "transport" && (
                <div className="mt-2 w-full">
                  <input
                    id="license_number"
                    name="license_number"
                    type="text"
                    placeholder="رقم الترخيص(حروف وارقام)"
                    className="block w-full h-[42px] p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.license_number}
                  />
                  {formik.touched.license_number &&
                    formik.errors.license_number && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.license_number}
                      </div>
                    )}
                </div>
              )}
              {/* {msg && <p>{msg}</p>} */}
              <button
              // 34an myb3t4 request keter 
                 disabled={ isLoading }
                type="submit"
                className={`flex justify-center items-center w-full rounded-md px-3 py-3 text-white text-lg font-bold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-red-500`}
                
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin text-white text-xl" />
                ) : (
                  "كن شريكا"
                )}
              </button>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      {/* group */}
      <div className="absolute right-0 -top-[10px] lg:max-w-[62px] lg:min-h-[132.45px] max-w-[28px] min-h-[70px] md:max-w-[50px] md:min-h-[100px]">
        <img src={image2} alt="" />
      </div>
    </section>
  );
};

export default BePartner;
