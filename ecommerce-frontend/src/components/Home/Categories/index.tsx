"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect } from "react";
import data from "./categoryData";
import Image from "next/image";

import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";

const Categories = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.init();
    }
  }, []);

  return (
    <section className="overflow-hidden pt-17.5 bg-[#fff]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-[#375d8a]/20">
        <div className="swiper categories-carousel common-carousel">
          {/* Título da Seção */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 1.66667C5.4 1.66667 1.66667 5.4 1.66667 10C1.66667 14.6 5.4 18.3333 10 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66667 10 1.66667ZM10 16.6667C6.3181 16.6667 3.33333 13.6819 3.33333 10C3.33333 6.3181 6.3181 3.33333 10 3.33333C13.6819 3.33333 16.6667 6.3181 16.6667 10C16.6667 13.6819 13.6819 16.6667 10 16.6667ZM10.8333 5H9.16667V10.8333L14.1667 13.7333L15 12.3667L10.8333 10V5Z"
                    fill="#376f8a"
                  />
                </svg>
                Categorias
              </span>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-[#376f8a]">
                Explore Produtos para seu Pet
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="swiper-button-prev text-[#375d8a] hover:text-[#375d8a]/80 transition-colors duration-200"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="swiper-button-next text-[#375d8a] hover:text-[#375d8a]/80 transition-colors duration-200"
              >
                ▶
              </button>
            </div>
          </div>

          <Swiper
            ref={sliderRef}
            slidesPerView={6}
            breakpoints={{
              0: { slidesPerView: 2 },
              1000: { slidesPerView: 4 },
              1200: { slidesPerView: 6 },
            }}
          >
            {data.map((item, key) => (
              <SwiperSlide key={key}>
                <SingleItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Categories;
