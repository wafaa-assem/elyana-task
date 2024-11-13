import { useState } from "react";
import { CiBag1 } from "react-icons/ci";
import { AiOutlinePhone } from "react-icons/ai";
import { CiCalendar } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";

const ClientRecords = () => {
  const [openTab, setOpenTab] = useState(1);
  const selectedTabClasses =
    "font-[Montserrat] font-semibold md:text-lg text-xs text-white bg-[#EF161F80] rounded-md w-[72px] h-[38px] p-2";
  return (
    <>
      <h4 className="md:text-2xl text-xl font-bold text-[#000000] my-10 font-[Montserrat]">
        سجلات العمليات
      </h4>
      <div className="font-sans">
        <div className="p-8">
          <div className="max-w-md mx-auto">
            <div className="mb-4 flex space-x-4 p-2 rounded-lg max-w-[706px] h-14">
              <button
                onClick={() => setOpenTab(1)}
                className={`w-[200px] text-center rounded-md ${
                  openTab === 1
                    ? selectedTabClasses
                    : "font-[Montserrat] font-semibold md:text-lg text-xs text-[#0C0800]"
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setOpenTab(2)}
                className={`w-[200px] text-center rounded-md ${
                  openTab === 2
                    ? selectedTabClasses
                    : "font-[Montserrat] font-semibold text-lg text-[#0C0800]"
                }`}
              >
                المقبولة
              </button>
              <button
                onClick={() => setOpenTab(3)}
                className={`w-[200px] text-center rounded-md ${
                  openTab === 3
                    ? selectedTabClasses
                    : "font-[Montserrat] font-semibold text-lg text-[#0C0800]"
                }`}
              >
                الحالية
              </button>
              <button
                onClick={() => setOpenTab(4)}
                className={`w-[200px] text-center rounded-md ${
                  openTab === 4
                    ? selectedTabClasses
                    : "font-[Montserrat] font-semibold text-lg text-[#0C0800]"
                }`}
              >
                المرفوضة
              </button>
            </div>
            {/* design  */}
            <div className="relative flex flex-col gap-y-3 border-[0.5px] border-dashed border-[#EF161F] rounded-lg w-[352px] p-5">
              <div className="flex items-center gap-x-2">
                <span>
                  <IoPersonOutline />
                </span>
                <h4>his name</h4>
              </div>
              <div className="flex items-center gap-x-2">
                <span>
                  <AiOutlinePhone />
                </span>
                <h4>his phone</h4>
              </div>
              <div className="flex items-center gap-x-2">
                <span>
                  <CiCalendar />
                </span>
                <h4>his no3 el montg</h4>
              </div>
              <div className="flex items-center gap-x-2">
                <span>
                  <CiBag1 />
                </span>
                <h4>his kmya</h4>
              </div>
              <div className="bg-red-500 p-2 text-white text-center absolute top-0 left-5 -translate-y-1/2">
                marfod
              </div>
            </div>

            {openTab === 1 && <h2>lorem2</h2>}
            {openTab === 2 && <h2>lorem2</h2>}
            {openTab === 3 && <h2>lorem2</h2>}
            {openTab === 4 && <h2>lorem2</h2>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientRecords;
