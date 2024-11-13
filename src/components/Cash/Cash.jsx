import { PiHandCoins, PiTicket } from "react-icons/pi";

const Cash = () => {
  return (
    <>
      <h3 className="md:text-2xl text-xl font-bold text-[#000000] font-[Montserrat] my-10">كاش باك</h3>
      <div className="flex items-center gap-x-7 font-[Montserrat] font-bold">
        <h4 className="text-[#182936] text-xl">اسم المتجر</h4>
        
          <div>
          <div className="flex items-center text-[#7F899B] ">
            <span><PiHandCoins />
            </span>
            <span className="text-lg ms-3">2000$</span>
          </div>
          <div className="flex items-center text-[#7F899B]">
            <span><PiTicket />
            </span>
            <span className="text-lg ms-3">code 123</span>
          </div>
          </div>
        
      </div>
    </>
  );
};

export default Cash;
