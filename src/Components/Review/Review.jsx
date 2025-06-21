import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaAngleLeft, FaQuoteLeft } from 'react-icons/fa';
import { useRef, useEffect, useState, use } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import img from "../../assets/profile.png"

const reviewsPromise = fetch("/data/reviews.json").then(res=>res.json())

const Review = () => {
    const reviews = use(reviewsPromise)
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <div className="w-full mt-20">

      {swiperReady && (
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={(swiper) => {
            // Navigation manually init & update
            setTimeout(() => {
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="w-full"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              {({ isActive }) => (
                <div
                  className={`rounded-xl my-8 p-6 transition duration-300 mx-auto ${
                    isActive
                      ? 'bg-white shadow-xl scale-108'
                      : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <FaQuoteLeft className="text-3xl text-primary mb-4" />
                  <p className="text-gray-700 pb-4 border-b border-dashed">"{review.description}"</p>
                  <div className='flex items-center gap-2 mt-4'>
                    <img src={img} className='w-13'/>
                    <div>
                        <h4 className="text-lg font-semibold">{review.author.name}</h4>
                        <p>{review.author.position}</p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Pagination + Navigation */}
      <div className="flex flex-col items-center justify-center mt-8 space-y-4">
        <div className="custom-pagination flex gap-2 justify-center"></div>
        <div className="flex gap-4">
          <button ref={prevRef} className="btn btn-outline btn-primary rounded-full">
            <FaAngleLeft size={20}></FaAngleLeft>
          </button>
          <button ref={nextRef} className="btn btn-outline btn-primary rounded-full">
            <FaAngleRight size={20}></FaAngleRight>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
