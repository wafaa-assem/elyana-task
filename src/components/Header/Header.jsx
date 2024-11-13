// import image1 from "../../assets/img1.png";
import image2 from "../../assets/Group 9075.png";
import image3 from "../../assets/Vector 1.png";
import Btn from "../Btn/Btn";
const Header = ({ data }) => {
  // console.log(data);

  return (
    <header className="py-12 min-h-[80vh] md:min-h-[40vh] bg-[#E8EAFD78] relative">
      <div className="container mx-auto max-w-screen-xl px-8 md:px-12 flex flex-col md:items-start md:flex-row md:justify-between items-center font-[Montserrat]">
        {/* content */}
        <div className="md:max-w-full md:min-h-[336.33px] flex flex-col justify-end items-start">
          <h2 className="font-[500] md:text-[49.22px] text-[42.22px] leading-[49.22px] md:min-w-[511px] max-w-[400px] min-h-[99px]">
            {data?.title}
          </h2>
          <p className="md:max-w-[600px] max-w-[450px] min-h-[79px] [font-weight:400] md:text-[19.69px] text-[16px] leading-[26.25px] my-5 ">
            {data?.description}
          </p>
          <Btn
            className="md:py-[10.66px] py-[3.66px] md:px-[61.05px] px-[35.05px] rounded-[8.2px]"
            word="اقرأ أكثر"
          />
          {/* Group */}
          <div className="absolute left-0 lg:max-w-[62px] lg:min-h-[132.45px] max-w-[28px] min-h-[70px] md:max-w-[50px] md:min-h-[100px]">
            <img
              src={image2}
              alt=""
              // className="w-[62px] h-[132.45px] rounded-sm"
            />
          </div>
        </div>
        {/* main image */}
        <div className="block md:mx-auto mt-8">
          <img src={data?.image} alt="" className="w-full sm:w-[369px]" />
        </div>
        {/* cloudssss */}
        <div className="absolute lg:top-[95%] right-0 -bottom-4">
          <img src={image3} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
