import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import bannerImg1 from "../../assets/banner/banner1.png";
import bannerImg2 from "../../assets/banner/banner2.png";
import bannerImg3 from "../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className="w-11/12 lg:container mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="w-full" src={bannerImg1} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={bannerImg2} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={bannerImg3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
