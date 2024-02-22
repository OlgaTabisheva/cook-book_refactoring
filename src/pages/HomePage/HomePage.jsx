import style from './HomePage.module.scss'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {useEffect, useState} from "react";
import PictureSection from "../../widgets/PictureSection/PictureSection.jsx";
import CarouselsBox from "../../widgets/CarouselsBox/CarouselsBox.jsx";


export const HomePage = ({instantAddRecipe, instantLikes, setInstantLikes, isAuthenticated, setInstantAddRecipe, data}) => {
  console.log(instantAddRecipe)


  const [numberCarouselImage,setNumberCarouselImage] = useState()
  const [numberCarouselImage2,setNumberCarouselImage2] = useState()
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1 ,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const responsive2 = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const sliderImageUrl = [
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

  const arrowStyle = {
    background: "transparent",
    border: 0,
    color: "#fff",
    fontSize: "80px"
  };


  /* const CustomRight = ({ onClick,...rest }) => {
     const {carouselState: {currentSlide}} = rest;
     setNumberCarouselImage(currentSlide)
     return (
       <button className={style.about__buttonRight} onClick={onClick} style={arrowStyle}>
         <button className={style.about__buttonLeft}  ></button>
         <p></p>
       </button>
     )
   };
    const CustomLeft = ({ onClick,...rest }) => {
      const {carouselState: {currentSlide}} = rest;
      setNumberCarouselImage(currentSlide)
      return(
      <button className={style.about__buttonRight} onClick={onClick} style={arrowStyle}>

        <button className={style.about__buttonRight}></button>
        <p className={style.about__text}> {numberCarouselImage+1 }/{(sliderImageUrl.length+1)/2}</p>
      </button>
      )
    };*/
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    setNumberCarouselImage(currentSlide)
    return (
      <div className="carousel-button-group mb-4  gap-4 flex justify-end
          items-center w-full">
        <button className={style.home__buttonRight} onClick={next} style={arrowStyle}>
          <button className={style.home__buttonLeft}  ></button>
          <p></p>
        </button>
        <button className={style.home__buttonRight} onClick={previous} style={arrowStyle}>

          <button className={style.home__buttonRight}></button>
          <p className={style.home__text}> {numberCarouselImage+1 }/{(sliderImageUrl?.length+1)/2}</p>
        </button>


      </div>

    );
  };
  const ButtonGroup2 = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    setNumberCarouselImage2(currentSlide)
    return (
      <div className="carousel-button-group mb-4  gap-4 flex justify-end
          items-center w-full">
        <button className={style.home__buttonRight} onClick={next} style={arrowStyle}>
          <button className={style.home__buttonLeft}  ></button>
          <p></p>
        </button>
        <button className={style.home__buttonRight} onClick={previous} style={arrowStyle}>

          <button className={style.home__buttonRight}></button>
          <p className={style.home__text}> {numberCarouselImage2+1 }/{(sliderImageUrl?.length+1)-2}</p>
        </button>



      </div>

    );
  };


  return (
    <section className={style.home}>
      <PictureSection/>
      <CarouselsBox/>
      {/*  <h2 className={style.about__title}>Немного о данном проекте:</h2>
      <p className={style.about__text}>Тематика данного портала - Простые и вкусные блюда на каждый день.</p>
      <p className={style.about__text}>Одна из причин создания данного проекта - собрать все интересующие организаторов
        рецепты в одном месте. Все собранные рецепты опробованы и составляют кулинарную книгу организаторов проекта.
        Используемые кухни - средиземноморкая, а также сербская. Но в процессе создания проекта могут быть добавлены
        понравившиеся рецепты других кухонь мира.</p>
      <p className={style.about__text}>Основной упор рецептов основывается на простоте приготовления и вкусовых
        качетвах. Вкусовые предпочтения пользователей могут отличаться от мнения организаторов проекта, поэтому
        планируется органировать отзывы под каждым рецептом.</p>
      <p className={style.about__text}>Вторая причина создания проекта - совершетсвования навыков во фронтенд
        разработке</p>*/}

     {/* <div className={style.home__parent}>
        <h2>Новые:</h2>

        <div className={style.home__box}>

        </div>
        <Carousel
          renderButtonGroupOutside={false}
          customButtonGroup={<ButtonGroup />}
          responsive={responsive2}
          customRightArrow={null}
          customLeftArrow={ null}
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
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
          // dotListClass="custom-dot-list-style"

        >
          {sliderImageUrl?.map((imageUrl, index) => {
            return (
              <div className={style.home__slider} key={index}>
                <img src={imageUrl.url} alt="movie" />
              </div>
            );
          })}
        </Carousel>
        <h2>Самые популярные:</h2>

        <Carousel
          renderButtonGroupOutside={false}
          customButtonGroup={<ButtonGroup2 />}
          responsive={responsive}
          customRightArrow={null}
          customLeftArrow={ null}
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
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
           { instantAddRecipe?.recipes?.map((obj) => (
            <Recipe isBtnEdit={false}
                    key={obj.id} {...obj}
                    instantLikes={instantLikes}
                    setInstantLikes={setInstantLikes}
                    isAuthenticated={isAuthenticated}

            />
          ))}
          {sliderImageUrl?.map((imageUrl, index) => {
            return (
              <div className={style.home__slider} key={index}>
                <img src={imageUrl.url} alt="movie" />
              </div>
            );
          })}
        </Carousel>
      </div>*/}
    </section>
  );
}