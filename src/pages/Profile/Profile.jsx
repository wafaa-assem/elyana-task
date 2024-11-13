import { useEffect, useState } from "react";
import UserInfo from "./../../components/UserInfo/UserInfo";
import image2 from "../../assets/Group 9075.png";
import ClientRecords from "../../components/ClientRecords/ClientRecords";
import Cash from "../../components/Cash/Cash";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/profileSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.profileReducer);
  console.log("data", data);

  const [openTab, setOpenTab] = useState(1);
  const selectedTabClasses =
    "bg-white text-[#0DB760] font-[Montserrat] font-semibold text-lg w-[200px]";

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <section className="py-12 relative">
      {/* Group */}
      <div className="absolute right-0 bottom-20 lg:max-w-[62px] lg:min-h-[132.45px] max-w-[28px] min-h-[70px] md:max-w-[46px] md:min-h-[100px] ">
        <img src={image2} alt="" />
      </div>
      <div className="absolute left-0 top-32 lg:max-w-[62px] lg:min-h-[132.45px] max-w-[28px] min-h-[70px] md:max-w-[46px] md:min-h-[100px] ">
        <img src={image2} alt="" />
      </div>
      <div className="container mx-auto max-w-screen-xl px-2 md:px-6 md:flex md:justify-start">
        <div className="font-sans">
          <div className="p-8">
            <div className="max-w-md mx-auto">
              <div className="mb-4 flex space-x-4 p-2 bg-[#EAECF0] rounded-lg shadow-md max-w-[706px] h-14">
                <button
                  onClick={() => setOpenTab(1)}
                  className={`w-[200px] text-center rounded-md text-sm md:text-lg ${
                    openTab === 1
                      ? selectedTabClasses
                      : "font-[Montserrat] font-semibold text-lg text-[#667085]"
                  }`}
                >
                  معلومات المستخدم
                </button>
                <button
                  onClick={() => setOpenTab(2)}
                  className={`w-[200px] text-center rounded-md text-sm md:text-lg ${
                    openTab === 2
                      ? selectedTabClasses
                      : "font-[Montserrat] font-semibold text-lg text-[#667085]"
                  }`}
                >
                  سجلات العميل
                </button>
                <button
                  onClick={() => setOpenTab(3)}
                  className={`w-[200px] text-center rounded-md text-sm md:text-lg ${
                    openTab === 3
                      ? selectedTabClasses
                      : "font-[Montserrat] font-semibold text-lg text-[#667085]"
                  }`}
                >
                  كاش باك
                </button>
              </div>

              {openTab === 1 && <UserInfo data={data} />}
              {openTab === 2 && <ClientRecords />}
              {openTab === 3 && <Cash />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
