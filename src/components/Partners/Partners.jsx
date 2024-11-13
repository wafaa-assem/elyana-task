// import img1 from "../../assets/Figure.png";
// import img2 from "../../assets/Figure2.png";
// import img3 from "../../assets/Figure3.png";
import image2 from "../../assets/Group 9075.png";
import "./Partners.css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import PartnerCard from "../PartnerCard/PartnerCard";

const Partners = ({ data }) => {
  return (
    <section className="relative py-12 font-[Montserrat]">
      <div className="container mx-auto max-w-screen-xl px-8 md:px-6 lg:px-12">
        {/* heading */}
        <div>
          <h2 className="font-[700] text-[31.37px] leading-[34.85px] text-center">
            {data?.title}
          </h2>
        </div>
        {/* content */}
        <Swiper
          modules={[Navigation]}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {data?.data?.map((item) => (
            <SwiperSlide key={item.Id}>
              <PartnerCard id={item.Id} img={item.Image} name={item.Name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* group */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 lg:max-w-[62px] lg:min-h-[132.45px] max-w-[28px] min-h-[70px] md:max-w-[50px] md:min-h-[100px]">
        <img src={image2} alt="" />
      </div>
    </section>
  );
};

export default Partners;
