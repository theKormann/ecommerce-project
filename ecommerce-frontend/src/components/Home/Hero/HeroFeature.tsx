'use client';

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Entrega Rápida",
    description: "Para todos os pedidos acima de $200",
  },
  {
    img: "/images/icons/icon-02.svg",
    title: "Devoluções 1 & 1",
    description: "Cancelamento após 1 dia",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "100% Pagamentos Seguros",
    description: "Garantia de segurança",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "Suporte Dedicado",
    description: "Estamos aqui para melhor lhe acolher",
  },
];

const ContinuousHeroFeature = () => {
  const duplicatedFeatures = [...featureData, ...featureData, ...featureData];

  return (
    <div className="max-w-[1000px] w-full mx-auto px-4 sm:px-8 xl:px-0 relative">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#E5EAF4] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#E5EAF4] to-transparent z-10 pointer-events-none" />

      <div className="relative overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={5000}
          freeMode={true}
          className="mySwiper mt-10"
        >
          {duplicatedFeatures.map((item, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <div className="flex items-center gap-4 px-4">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  width={40} 
                  height={41} 
                  className="flex-shrink-0"
                />
                <div>
                  <h3 className="font-medium text-lg text-dark">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ContinuousHeroFeature;