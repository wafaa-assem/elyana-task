import { FaPhoneVolume, FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { FaLocationPin } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto max-w-screen-xl px-8 md:px-6 lg:px-12">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-start md:gap-40">
          <div>
            <img src={logo} alt="" className="w-[77px] h-[78px]" />
            <h5 className="font-[Poppins] font-[400] text-sm leading-[22px] my-5">
              إعادة التدوير أذكــى وأسهل من قبل !
            </h5>
            <div className="icons flex items-center gap-6">
              <div className="border-[1px] border-[#0DB760] w-7 h-7 flex justify-center items-center rounded-full ">
                <FaTwitter className="text-xs" />
              </div>
              <div className="border-[1px] border-[#0DB760] w-7 h-7 flex justify-center items-center rounded-full ">
                <FaFacebookF className="text-xs" />
              </div>
              <div className="border-[1px] border-[#0DB760] w-7 h-7 flex justify-center items-center rounded-full ">
                <FaInstagram className="text-xs" />
              </div>
            </div>
          </div>
          <div>
            <h5 className="fonr-[Inter] font-medium text-[18.44px] leading-6 text-[#0DB760]">
              العنوان
            </h5>
            <div className="flex items-center gap-3 mt-5">
              <FaLocationPin className="text-[#8D8B8C] font-black text-xl leading-5" />
              <h6 className="font-[Lato] font-light text-base leading-[28.8px] text-[#8D8B8C]">
                القاهرة , المنوفية
              </h6>
            </div>
          </div>
          <div>
            <h5 className="fonr-[Inter] font-medium text-[18.44px] leading-6 text-[#0DB760]">
              رقم الهاتف
            </h5>
            <div className="flex items-center gap-3 mt-5">
              <FaPhoneVolume className="text-[#8D8B8C] font-black text-xl leading-5 rotate-[200.96deg]" />
              <h6 className="font-[Lato] font-medium text-[18.44px] leading-6 text-[#8D8B8C]">
                +201001234567
              </h6>
            </div>
          </div>
        </div>
        <h6 className="font-[DM Sans] text-sm font-normal leading-[27.75px] text-center mt-10">
          © 2024 All Safe.com. All rights reserved.
        </h6>
      </div>
    </section>
  );
};

export default Footer;
