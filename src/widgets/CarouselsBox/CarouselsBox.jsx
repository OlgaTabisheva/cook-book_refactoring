import style from "./CarouselsBox.module.scss";
import { useCallback, useRef } from "react";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import "./../../../swiper.css";
function CarouselsBox({
  instantNewRecipes,
  carouselTitle,
  instantLikes,
  setInstantLikes,
  isAuthenticated,
}) {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className={style.carouselsBox}>
      <div className={style.carouselsBox__carousel}>
        <h2 className={style.carouselsBox__title}>{carouselTitle}</h2>
        <div className={style.carouselsBox__swiper}>
          <Swiper
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
            }}
            centeredSlides={false}
            navigation={false}
            spaceBetween={30}
            pagination={{ type: "fraction" }}
            ref={sliderRef}
            modules={[Pagination, Navigation]}
            style={{ "--swiper-pagination-color": "#fff" }}
          >
            {instantNewRecipes &&
              instantNewRecipes?.map((obj, index) => (
                  <SwiperSlide
                    key={index}
                    className={style.carouselsBox__swiperSlide}
                  >
                    <RecipeCard
                      isBtnEdit={false}
                      key={obj.id}
                      {...obj}
                      instantLikes={instantLikes}
                      setInstantLikes={setInstantLikes}
                      isAuthenticated={isAuthenticated}
                    />
                  </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className={style.carouselsBox__buttons}>
          <ButtonPicture
            size={"arrowNext"}
            value={"ArrowMLeft"}
            onClick={handlePrev}
          ></ButtonPicture>
          <ButtonPicture
            size={"arrowPrev"}
            value={"ArrowMRight"}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

export default CarouselsBox;
