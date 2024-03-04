import style from './CarouselsBox.module.scss'

import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import Carousel from "react-multi-carousel";
import {useState} from "react";
import RecipeCardTest from "../../test/RecipeCardTest/RecipeCardTest.jsx";

function CarouselsBox({
                        instantAddRecipe,
                        instantLikes,
                        setInstantLikes,
                        isAuthenticated,
                        setInstantAddRecipe, newRecipes,
                        carouselTitle
                      }) {

  const chosenCategory1 = [
    //First image url
    {

      url:
        "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1"
    },
    {
      url:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*"
    },
    //Second image url
    {
      url:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*"
    },
    //Third image url
    {
      url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU"
    },

    //Fourth image url

    {
      url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvuww0JDC7nFRxiFL6yFiAxRJgM-1tvJTxA&usqp=CAU"
    }
  ];


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
  const [numberCarouselImage, setNumberCarouselImage] = useState()
  const arrowStyle = {
    background: "transparent",
    border: 0,
    color: "#fff",
    fontSize: "80px"
  };


  const ButtonGroup = ({next, previous, goToSlide, ...rest}) => {
    const {carouselState: {currentSlide}} = rest;
    const firstNumberCarousel = numberCarouselImage === 0
    const NumberCarousel = newRecipes?.length - 3
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
          <p className={style.carouselsBox__text}> {numberCarouselImage + 1}/{newRecipes?.length - 2}</p>
        </button>


      </div>

    );
  };
  return (
    <div className={style.carouselsBox}>
      <div className={style.carouselsBox__carousel}>
        <h2 className={style.carouselsBox__title}>{carouselTitle}</h2>
        <Carousel
          renderButtonGroupOutside={false}
          customButtonGroup={<ButtonGroup/>}
          responsive={responsive}
          customRightArrow={null}
          customLeftArrow={null}
          additionalTransfrom={0}
          arrows={false}
          rewindWithAnimation={true}
          autoPlaySpeed={3000}
          centerMode={false}
          //className="react-multi-carousel"
          dotListClass=""
          draggable
          focusOnSelect={false}
          //  itemClass="react-multi"
          keyBoardControl
          minimumTouchDrag={80}
          renderDotsOutside={false}
          sliderClass=""
          slidesToSlide={3}
          swipeable
          rewind={false}
          // dotListClass="custom-dot-list-style"

        >
          {chosenCategory1?.map((imageUrl, index
          ) => {

            return (<div className={style.carouselsBox__card} key={index}><RecipeCardTest/>
              </div>
            )

          })}
        </Carousel>
      </div>

    </div>
  )
}

export default CarouselsBox