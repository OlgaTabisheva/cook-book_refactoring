import style from './CarouselsBox.module.scss'

import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import Carousel from "react-multi-carousel";
import {useState} from "react";

function CarouselsBox({linkTo, text}) {
  const responsive2 = {
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
  const [numberCarouselImage, setNumberCarouselImage] = useState()
  const arrowStyle = {
    background: "transparent",
    border: 0,
    color: "#fff",
    fontSize: "80px"
  };
  const sliderImageUrl = [1,2,3,4,5,6,7,



]
  ;
  console.log(sliderImageUrl)
  const ButtonGroup = ({next, previous, goToSlide, ...rest}) => {
    const {carouselState: {currentSlide}} = rest;
    setNumberCarouselImage(currentSlide)
    return (
      <div className="carousel-button-group mb-4  gap-4 flex justify-end
          items-center w-full">
        <button className={style.carouselsBox__buttonRight} onClick={next} style={arrowStyle}>
          <button className={style.carouselsBox__buttonLeft}></button>
          <p></p>
        </button>
        <button className={style.carouselsBox__buttonRight} onClick={previous} style={arrowStyle}>

          <button className={style.carouselsBox__buttonRight}></button>
          <p className={style.carouselsBox__text}> {numberCarouselImage + 1}/{(sliderImageUrl?.length + 1) / 2}</p>
        </button>


      </div>

    );
  };
  return (
    <div className={style.carouselsBox}>

<div className={style.carouselsBox__carousel}>
      <h2 className={style.carouselsBox__title}>Новые:</h2>
      <Carousel
        renderButtonGroupOutside={false}
        customButtonGroup={<ButtonGroup/>}
        responsive={responsive2}
        customRightArrow={null}
        customLeftArrow={null}
        additionalTransfrom={0}
        arrows={false}
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        dotListClass=""
        draggable
        focusOnSelect={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderDotsOutside={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        // dotListClass="custom-dot-list-style"

      >
        {sliderImageUrl?.map((imageUrl, index) => {
          return (
            <div className={style.carouselsBox__card} key={index}>
              <RecipeCard/>

            </div>
          );
        })}
      </Carousel>
</div>
      <div className={style.carouselsBox__carousel}>
        <h2 className={style.carouselsBox__title}>Самые популярные:</h2>
        <Carousel
          renderButtonGroupOutside={false}
          customButtonGroup={<ButtonGroup/>}
          responsive={responsive2}
          customRightArrow={null}
          customLeftArrow={null}
          additionalTransfrom={0}
          arrows={false}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          dotListClass=""
          draggable
          focusOnSelect={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderDotsOutside={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
          // dotListClass="custom-dot-list-style"

        >
          {sliderImageUrl?.map((imageUrl, index) => {
            return (
              <div className={style.carouselsBox__card} key={index}>
                <RecipeCard/>

              </div>
            );
          })}
        </Carousel>
      </div>
      <div className={style.carouselsBox__carousel}>
        <h2 className={style.carouselsBox__title}>Обсуждаемые:</h2>
        <Carousel
          renderButtonGroupOutside={false}
          customButtonGroup={<ButtonGroup/>}
          responsive={responsive2}
          customRightArrow={null}
          customLeftArrow={null}
          additionalTransfrom={0}
          arrows={false}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          dotListClass=""
          draggable
          focusOnSelect={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderDotsOutside={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
          // dotListClass="custom-dot-list-style"

        >
          {sliderImageUrl?.map((imageUrl, index) => {
            return (
              <div className={style.carouselsBox__card} key={index}>
                <RecipeCard/>

              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  )
}

export default CarouselsBox