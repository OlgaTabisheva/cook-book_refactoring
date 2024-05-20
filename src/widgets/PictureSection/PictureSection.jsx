import style from './PictureSection.module.scss'
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import LinkItem from "../../shared/LinkItem/LinkItem.jsx";
import {useNavigate} from "react-router-dom";

function PictureSection() {

  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/add-recipe-step`)

  }

  return (
    <section className={style.pictureSection}>
      <div className={style.pictureSection__cover}>
        <div className={style.pictureSection__box}>
          <h2 className={style.pictureSection__title}> Делимся вкусными рецептами средиземноморской <br/> и сербской
            кухни
          </h2>
          <p className={style.pictureSection__text}>Помогаем собрать рецепты в одном месте. Все блюда опробованы и
            составляют кулинарную книгу наших авторов</p>
          <ButtonBasic text={'Добавить рецепт'} color={'primaryGreen'} onClick={handleNavigate}/>

        </div>
      </div>
    </section>
  )
}

export default PictureSection