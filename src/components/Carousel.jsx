import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// ICONS
import homeIcon from "../assets/home (1).png";
import piggyBankIcon from "../assets/piggy-bank.png";
import mailIcon from "../assets/envelope.png";
import ratingStarsIcon from "../assets/5-stars.png";
import checkIcon from "../assets/checked.png";
import questionMarkIcon from "../assets/question-mark-transparent-free-png.webp";
import planeIcon from "../assets/airplane.png";

const icons = [
  homeIcon,
  piggyBankIcon,
  mailIcon,
  ratingStarsIcon,
  checkIcon,
  questionMarkIcon,
  planeIcon,
];

const CarouselComponent = () => {
  return (
    <div className=" flex justify-center items-center w-full max-w-[80%] mx-auto pt-4">
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={5}
        slidesPerGroup={1}
        loop={true}
        loopedSlides={icons.length}
        spaceBetween={10}
        speed={600}
      >
        {icons.map((icon, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center h-[150px] px-24"
          >
            <img
              src={icon}
              alt={`Icon ${index}`}
              className="h-[75px] w-auto object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;
