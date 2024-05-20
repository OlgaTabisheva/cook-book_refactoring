import React from 'react';
import {useSwiper} from 'swiper/react';
import style from './SwiperNavButton.module.scss'
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";

export const SwiperNavButton = () => {
  const swiper = useSwiper();

  return (
    <div className={style.swiperNavBtns}>

      <ButtonPicture size={'prev'} value={'ArrowSmallLeft'} onClick={() => swiper.slidePrev()}>77777</ButtonPicture>
      <ButtonPicture size={'next'} value={'ArrowSmallRight'} onClick={() => swiper.slideNext()}/>
    </div>
  );
};