import style from './CarouselsBox.module.scss'
import React, {useCallback, useRef} from "react";
import Carousel from "react-multi-carousel";
import {useState} from "react";
import RecipeCardTest from "../../test/RecipeCardTest/RecipeCardTest.jsx";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import {EffectCoverflow,Pagination, Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import 'swiper/scss';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";

function CarouselsBox({ instantNewRecipes, carouselTitle , instantLikes, setInstantLikes, isAuthenticated}) {




  const [swiperRef, setSwiperRef] = useState(null);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);


  const responsive = {
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: {max: 1024, min: 768},
      items: 2,
      slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
      breakpoint: {max: 767, min: 464},
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const [numberCarouselImage, setNumberCarouselImage] = useState(0)
  const arrowStyle = {
    background: "transparent",
    border: 0,
    color: "#fff",
    fontSize: "80px"
  };

/*  const ButtonGroup = ({next, previous, goToSlide, ...rest}) => {
    if (instantNewRecipes?.length > 0){
    const {carouselState: {currentSlide}} = rest;
    const firstNumberCarousel = numberCarouselImage === 0
    const NumberCarousel = instantNewRecipes?.length - 3
    const LastNumberCarousel = numberCarouselImage === NumberCarousel
    setNumberCarouselImage(currentSlide)
    return (
      <div className="carousel-button-group mb-4  gap-4 flex justify-end
          items-center w-full">
        <button className={style.carouselsBox__box} onClick={() => next()} style={arrowStyle} disabled={LastNumberCarousel}>
          <div className={style.carouselsBox__buttonRight} ></div>

        </button>
        <button className={style.carouselsBox__box} onClick={() =>
          previous()}  style={arrowStyle} disabled={firstNumberCarousel}>
          <div className={style.carouselsBox__buttonLeft} ></div>
          <p className={style.carouselsBox__text}> {numberCarouselImage + 1}/{instantNewRecipes?.length - 5}</p>
        </button>


      </div>

    );
  }};*/


  return (
    <div className={style.carouselsBox}>
      <div className={style.carouselsBox__carousel}>
        <h2 className={style.carouselsBox__title}>{carouselTitle}</h2>
        <div className={style.carouselsBox__swiper}>
     <Swiper
       className="mySwiper"
          onSwiper={setSwiperRef}
          slidesPerView={3}
          centeredSlides={false}
             navigation={false}
          spaceBetween={30}
          pagination={{
            type: 'fraction',
          }}

          ref={sliderRef}
          modules={[Pagination, Navigation]}

          style={{
              "--swiper-pagination-color": "#fff",
            }}

        >

          {instantNewRecipes && instantNewRecipes?.map((obj,index) => (
            <SwiperSlide key={index} className={style.carouselsBox__swiperSlide}>

              <RecipeCard
                isBtnEdit={false}
                key={obj.id} {...obj}
                instantLikes={instantLikes}
                setInstantLikes={setInstantLikes}
                isAuthenticated={isAuthenticated}/>

          </SwiperSlide>

          ))}

        </Swiper>
        </div>
        <div className={style.carouselsBox__buttons}>
          <ButtonPicture size={'arrowNext'} value={'ArrowMLeft'} onClick={handlePrev}></ButtonPicture>
          <ButtonPicture size={'arrowPrev'} value={'ArrowMRight'}   onClick={handleNext}/>
        </div>

 {/*   <Carousel
          renderButtonGroupOutside={false}
         // customButtonGroup={<ButtonGroup/>}
          responsive={responsive}
          customRightArrow={null}
          customLeftArrow={null}
          additionalTransfrom={0}
          arrows={false}
          centerMode={false}
          className="react-multi-carousel"
          dotListClass=""
          draggable
          focusOnSelect={false}
           itemClass="react-multi"
          //keyBoardControl
          minimumTouchDrag={80}
          renderDotsOutside={false}
          sliderClass=""
          slidesToSlide={3}
          swipeable
          rewind={false}

        >
          {instantNewRecipes && instantNewRecipes?.recipes?.map((obj, index
          ) => {

            return (<div  className={style.carouselsBox__card}key={index}><RecipeCard
                                                                                      isBtnEdit={false}
                                                                                      key={obj.id} {...obj}
                                                                                      instantLikes={instantLikes}
                                                                                      setInstantLikes={setInstantLikes}
                                                                                      isAuthenticated={isAuthenticated}/>
              </div>
            )

          })}
        </Carousel>*/}
      </div>

    </div>
  )
}

export default CarouselsBox