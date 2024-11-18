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
  const [numberCarouselImage2, setNumberCarouselImage2] = useState()
  const [numberCarouselImage3, setNumberCarouselImage3] = useState()
  const arrowStyle = {
    background: "transparent",
    border: 0,
    color: "#fff",
    fontSize: "80px"
  };
  const sliderImageUrl = [1, 2, 3, 4, 5, 6, 7,


  ]
  const sliderImageUrl2 = [1, 2, 3, 4, 5, 6, 7,


    ]
  ;
  const sliderImageUrl3 = [1, 2, 3, 4, 5, 6, 7,


  ]
  console.log(sliderImageUrl)
  const ButtonGroup = ({next, previous, goToSlide, ...rest}) => {
    const {carouselState: {currentSlide}} = rest;
    const firstNumberCarousel = numberCarouselImage === 0
    const NumberCarousel = sliderImageUrl?.length - 3
    const LastNumberCarousel = numberCarouselImage === NumberCarousel

    setNumberCarouselImage(currentSlide)
    return (
      <div className="carousel-button-group mb-4  gap-4 flex justify-end
          items-center w-full">
        <button className={style.carouselsBox__box} onClick={next} style={arrowStyle}>
          <button className={style.carouselsBox__buttonRight} disabled={LastNumberCarousel}></button>

        </button>
        <button className={style.carouselsBox__box} onClick={previous} style={arrowStyle}>

          <button className={style.carouselsBox__buttonLeft} disabled={firstNumberCarousel}></button>
          <p className={style.carouselsBox__text}> {numberCarouselImage + 1}/{sliderImageUrl?.length - 2}</p>
        </button>


      </div>

    );
  };
  const ButtonGroup2 = ({next, previous, goToSlide, ...rest}) => {
    const {carouselState: {currentSlide}} = rest;
    const firstNumberCarousel = numberCarouselImage2 === 0
    const NumberCarousel = sliderImageUrl2?.length - 3
    const LastNumberCarousel = numberCarouselImage2 === NumberCarousel

    setNumberCarouselImage2(currentSlide)
    return (
      <div className="carousel-button-group mb-4  gap-4 flex justify-end
          items-center w-full">
        <button className={style.carouselsBox__box} onClick={next} style={arrowStyle}>
          <button className={style.carouselsBox__buttonRight} disabled={LastNumberCarousel}></button>

        </button>
        <button className={style.carouselsBox__box} onClick={previous} style={arrowStyle}>

          <button className={style.carouselsBox__buttonLeft} disabled={firstNumberCarousel}></button>

          <p className={style.carouselsBox__text}> {numberCarouselImage2 + 1}/{sliderImageUrl2?.length - 2}</p>
        </button>


      </div>

    );
  };

  const ButtonGroup3 = ({next, previous, goToSlide, ...rest}) => {
    const {carouselState: {currentSlide}} = rest;
    setNumberCarouselImage3(currentSlide)
    const firstNumberCarousel = numberCarouselImage3 === 0
    const NumberCarousel = sliderImageUrl3?.length - 3
    const LastNumberCarousel = numberCarouselImage3 === NumberCarousel
    return (
      <div className="carousel-button-group mb-4  gap-4 flex justify-end
          items-center w-full">

        <button className={style.carouselsBox__box} onClick={next} style={arrowStyle}>
          <button className={style.carouselsBox__buttonRight} disabled={LastNumberCarousel}></button>

        </button>
        <button className={style.carouselsBox__box} onClick={previous} style={arrowStyle}>

          <button className={style.carouselsBox__buttonLeft} disabled={firstNumberCarousel}></button>
          <p className={style.carouselsBox__text}> {numberCarouselImage3 + 1}/{sliderImageUrl3?.length - 2}</p>
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
          rewindWithAnimation={true}
          autoPlaySpeed={3000}
          centerMode={false}
          className="react-multi-carousel"
          dotListClass=""
          draggable
          focusOnSelect={false}
          itemClass="react-multi"
          keyBoardControl
          minimumTouchDrag={80}
          renderDotsOutside={false}
          sliderClass=""
          slidesToSlide={3}
          swipeable
          rewind={false}
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
          customButtonGroup={<ButtonGroup2/>}
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
          customButtonGroup={<ButtonGroup3/>}
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