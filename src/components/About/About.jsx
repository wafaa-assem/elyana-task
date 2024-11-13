import { IoDiamondOutline } from "react-icons/io5";
import image2 from "../../assets/Group 9075.png";
import Btn from "../Btn/Btn";

const About = ({ data }) => {
  return (
    <section className="relative py-12">
      <div className="container mx-auto max-w-screen-xl px-8 md:px-6 lg:px-12 flex flex-col-reverse lg:flex-row-reverse lg:justify-between lg:items-center">
        {/* left */}
        <div className="left-content flex flex-col py-4 lg:max-w-full lg:w-[600px]">
          {data?.data?.map((item, index) => (
            <div
              key={index}
              className="ps-5 items-start me-auto shadow-custom-left"
            >
              <div className="bg-white py-5">
                <IoDiamondOutline
                  style={{
                    color: "#0DB760",
                    marginBottom: "10px",
                    fontSize: "22px",
                  }}
                />
                <h2 className="font-[Poppins] font-extrabold text-xl leading-5">
                  {item.title}
                </h2>
                <p className="my-3 font-[Inter] text-sm leading-[21px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* right */}
        <div className="right-content flex flex-col md:gap-5 gap-3">
          <span className="text-[#0DB760] font-[Inter] font-medium md:text-xl text-sm leading-[29px] border border-[#0DB760] w-[95px] p-1 rounded-full text-center">
            {data?.main_section.top_title}
          </span>
          <h2 className="font-[Inter] font-semibold md:text-[40px] text-3xl md:leading-[54px] leading-10">
            {data?.main_section.title}
          </h2>
          <p className="max-w-[496px]  text-sm md:text-base leading-[24px] text-[#323433]">
            {data?.main_section.description}
          </p>
          <Btn
            className={
              "md:w-[138px] md:h-[56px] w-[98px] h-[38px] rounded-[12px] mt-5"
            }
            word={"المزيد"}
          />
        </div>
        {/* Group */}
        <div className="absolute right-0 bottom-0 lg:max-w-[62px] lg:min-h-[132.45px] max-w-[28px] min-h-[70px] md:max-w-[46px] md:min-h-[100px] ">
          <img src={image2} alt="" />
        </div>
      </div>
    </section>
  );
};

export default About;
