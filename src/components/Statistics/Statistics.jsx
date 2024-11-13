import img from "../../assets/Vector2.png";
import image2 from "../../assets/Group 9075.png";
const Statistics = ({ data }) => {
  return (
    <section className="relative py-12">
      <div className="absolute top-[98px] left-0 z-[-1]">
        <img src={img} alt="" />
      </div>
      <div className="container mx-auto max-w-screen-xl px-8 md:px-6 lg:px-12">
        {/* top */}
        <div className="md:mb-11 mb-5">
          <div className="text-[#0DB760] font-[Inter] font-medium w-28 md:text-xl text-sm  leading-7 border border-[#0DB760] rounded-full text-center">
            {data?.top_title}
          </div>
          <div className="mt-5">
            <h2 className="font-[Inter] font-semibold md:text-[40px] text-4xl md:text-4xl leading-[54px]">
              {data?.title}
            </h2>
          </div>
        </div>
        {/* bottom */}
        <div className="flex flex-wrap flex-row-reverse gap-y-4 justify-center items-center">
          {data?.data?.map((item) => (
            <div
              key={item.name}
              className="flex w-1/2 lg:w-1/3 flex-col justify-center items-center gap-2 py-6 border border-[#0DB760]"
            >
              <p className="font-[400] md:text-[60px] text-4xl font-[IBM Plex Sans] text-[#0DB760] leading-[66px]">
                {item.value}
              </p>
              <p className="font-[Montserrat] text-[#101828] font-[700] text-[20px] leading-[28px]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
        {/* Group */}
        <div className="absolute z-[-1] top-[50%] left-0 lg:max-w-[62px] lg:min-h-[132.45px] max-w-[28px] min-h-[70px] md:max-w-[50px] md:min-h-[100px]">
          <img src={image2} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
