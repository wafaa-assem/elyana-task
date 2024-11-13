import img from "../../assets/Section.png";

const Contact = () => {
  return (
    <section className="relative md:py-36 py-12">
      {/* ????????????? on mobile screen ??????? */}

      <img
        src={img}
        className="absolute bottom-0 w-full h-full z-[-1] overflow-hidden"
        alt=""
      />

      <div className="container mx-auto max-w-screen-xl px-8 md:px-6 lg:px-12">
        <div className="flex flex-col items-center">
          {/* العنوان */}
          <h2 className="font-[Montserrat] font-semibold text-[28px] md:text-[42px] mb-2">
            اتصل بنا الآن
          </h2>

          {/* النموذج */}
          <form className="flex flex-col gap-3 md:gap-0 md:flex-row-reverse justify-center">
            <button className="bg-[#0DB760] text-white font-[400] rounded-tl-[30px] py-[10.43px] px-[63.1px] w-[169.2px] h-[40.87px]">
              <span className=" md:w-[53px] h-[40px] text-[12.84px] leading-[19.26px] font-[Montserrat]">
                اتصل الآن
              </span>
            </button>
            <div>
              <input
                type="tel"
                placeholder="+201001234567"
                className="py-[8.84px] md:py-[12.84px] px-[20.89px] md:px-[28.89px] w-[200px] md:w-[419.96px] h-[49.68px] text-right rounded-r-full text-gray-700 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
