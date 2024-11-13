import image2 from "../../assets/Group 9075.png";
import person1 from "../../assets/person1.png";

const Opinion = ({ data }) => {
  return (
    <section className="py-12 font-[Inter] relative">
      <div className="container mx-auto max-w-screen-xl px-8 md:px-6 lg:px-12">
        {/* top */}
        <div className="">
          <div className="w-[95px] h-[41px] border-[0.5px] border-[#0DB760] font-[500] text-[20px] leading-[29px] text-[#0DB760] rounded-full flex justify-center items-center">
            {data?.top_title}
          </div>
          <h2 className="font-[600] text-[35px] md:text-[40px] leading-[54px] mb-4 mt-8">
            {data?.title}
          </h2>
          <p className="max-w-[300px] font-[400] text-[16px] md:text-[17px] leading-[24px] text-[#323433]">
            {data?.description}
          </p>
        </div>
        {/* bottom carousel ?????????? */}
        {/* howa carousel walla div bs ????????????????????? */}
        <div className="flex flex-col md:flex-row gap-10 mt-10">
          {data?.data?.map((item) => (
            <div
              key={item.id}
              className="md:w-[480px] md:h-[222px] rounded-lg shadow-[0px_4px_23.4px_0px_#C9C9C940] p-7"
            >
              {/* ?? sora wala eh wkol 7aga gowa leha sora  */}
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked={item.rating == "1"}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked={item.rating == "2"}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked={item.rating == "3"}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked={item.rating == "4"} // defaultChecked == true or false ==> ana ha7ot condition return true or false
                  // if defaultChecked= true ,so hygor kol le 2ablo l7ad mywsal hena fhykon 4 stars
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked={item.rating == "5"}
                />
              </div>
              {/* starss */}
              <p className="font-[400] text-[15px] md:text-[16px] leading-[19.2px] text-[#11142D]">
                {item.content}
              </p>
              <div className="flex items-center gap-5 mt-6">
                <img
                  src={item.user_image}
                  className="w-[40px] h-[40px]"
                  alt=""
                />
                <div>
                  <h4 className="font-[600] text-[16px] leading-[19.2px] text-[#11142D]">
                    {item.user_name}
                  </h4>
                  <h5 className="font-[500] text-[14px] leading-[18.2px] text-[#92929D]">
                    {item.user_job}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* group */}
        <div className="absolute left-0 -top-[40px] lg:max-w-[62px] lg:min-h-[132.45px] max-w-[28px] min-h-[70px] md:max-w-[50px] md:min-h-[100px]">
          <img src={image2} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Opinion;
