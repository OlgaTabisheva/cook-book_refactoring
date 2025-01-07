import style from './PopupImageGallery.module.scss'
import img from './../../../assets/test.jpg'
import 'swiper/css';
import React, {useCallback, useRef} from "react";
import {A11y, Pagination, Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import ButtonPicture from "../../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const PopupImageGallery = ({recipeStepsMap, open, setOpenImagePopup}) => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const swiper = useSwiper();
  return (
    <div className={open === true ? style.popupImageGallery : style.popupImageGallery__deactivate}>
      <div className={style.popupImageGallery__wrapper}>
        <div className={style.popupImageGallery__flexWrapper}>
          <ButtonPicture size={'smallBlack'} value={'WhiteClose'} onClick={() => {
            setOpenImagePopup(!open)
          }}/>
          <div className={style.popupImageGallery__window}>
            {<Swiper pagination={{
              type: 'fraction',
            }}
                     navigation={false}
                     modules={[Pagination, Navigation]}
                     className={style.swiper 
                  } ref={sliderRef}

            >
              {recipeStepsMap && recipeStepsMap.map((obj, index) => (
                <SwiperSlide key={index} className={style.swiper__SwiperSlide }>

                  <img alt={'img'} className={style.popupImageGallery__img} src={obj.url}/>
                </SwiperSlide>
              ))}


            </Swiper>}
            <div className={style.popupImageGallery__buttons}>
              <ButtonPicture size={'prev'} value={'ArrowSmallLeft'} onClick={handlePrev}>77777</ButtonPicture>
              <ButtonPicture size={'next'} value={'ArrowSmallRight'} onClick={handleNext}/>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
export default PopupImageGallery;


/*unction PopupImageGallery {open, setOpenImagePopup, recipeStepsMap}) {



  return (

    <div className={open === true ? style.popupImageGallery : style.popupImageGallery__deactivate}>
      <div className={style.popupImageGallery__wrapper}>
        {/!*   //    <div className={style.popupImageGallery__flexWrapper}>*!/}
      {/!*    <ButtonPicture size={'smallBlack'} value={'WhiteClose'} onClick={() => {
            setOpenImagePopup(!open)
          }}/>
          <div className={style.popupImageGallery__box}>

            <div className={style.popupImageGallery__left}>
              <ButtonPicture size={'prev'} value={'ArrowSmallLeft'} onClick={() => setCurrentIndex(prevState => prevState - 1)}/>
            </div>*!/}
        <div className={style.popupImageGallery__window}>
              <Carousel swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
              >

                {recipeStepsMap?.map((url, index
                ) => {

                  return (<img width={"100px"} height={'100px'} alt={'img'} src={url?.url}/>
                  )

                })}
              </Carousel>

        </div>
        {/!*    <div className={style.popupImageGallery__right}>
              <ButtonPicture size={'next'} value={'ArrowSmallRight'}   onClick={() => setCurrentIndex(prevState => prevState + 1)}/>

            </div>*!/}
         {/!*</div>*!/}
        </div>
        <p className={style.popupImageGallery__text}>1/5</p>

    </div>
  )
}

export default PopupImageGallery*/


