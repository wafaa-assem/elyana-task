import img from "../../assets/image111.png";
import img1 from "../../assets/1.png";
// import img2 from "../../assets/2.png";
// import img3 from "../../assets/3.png";
// import img4 from "../../assets/4.png";

const Ecellenece = ({ data }) => {
  return (
    <section className="relative py-12 font-[Montserrat]">
      <div className="container mx-auto max-w-screen-xl px-8 md:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row-reverse md:justify-between md:items-center">
          {/* left */}
          <div className="flex-shrink-0">
            <img src={img} alt="" className="p-10 md:p-5" />
          </div>

          {/* right */}
          <div className="flex flex-col gap-5">
            <span className="font-[400] text-[17.78px] leading-[24.9px] text-[#FF0000]">
              {data?.top_title}
            </span>
            <h2 className="font-[500] md:text-[32.01px] text-[28.01px] leading-[42.68px] md:w-[591px] md:h-[86px]">
              {data?.title}
            </h2>
            <div className="flex flex-col gap-7">
              {data?.data?.map((item) => (
                <div key={item.title} className="flex gap-5">
                  {/* img */}
                  <div className=" w-[59.75px] h-[88.91px] flex-shrink-0">
                    <img src={img1} alt="" className="w-full" />
                  </div>
                  {/* info */}
                  <div className="">
                    <h3 className="font-[600] md:text-[17.78px] text-[16.78px] leading-[24.9px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 md:w-[554px] md:h-[50px] font-[400] md:text-[14.23px] text-[13.23px] leading-[24.9px] text-[#929292]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecellenece;
