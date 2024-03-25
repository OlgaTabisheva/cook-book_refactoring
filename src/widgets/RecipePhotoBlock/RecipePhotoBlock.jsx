import style from './RecipePhotoBlock.module.scss'
import test from "../../assets/test.jpg";
import ButtonLikeFull from "../../shared/Buttons/ButtonLike/ButtonLikeFull.jsx";
import ButtonComments from "../../shared/Buttons/ButtonComments/ButtonComments.jsx";
import {ReactComponent as User} from '../../assets/user.svg';
import StepByStep from "../StepByStep/StepByStep.jsx";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ButtonImgOpenGallery from "../../shared/Buttons/ButtonImgOpenGallery/ButtonImgOpenGallery.jsx";
import Foodstuff from "../../shared/Foodstuff/Foodstuff.jsx";


function RecipePhotoBlock({instantAddRecipe, recipeStepsMap}) {
  const {id} = useParams();
  const navigate = useNavigate();
  const fullRecipe = instantAddRecipe?.recipes?.find(elem => elem.id === id);


  console.log(fullRecipe,'recipeCompositionMap')
  return (
    <div className={style.recipePhotoBlock}>

      <div className={style.recipePhotoBlock__recipe}>
        <div className={style.recipePhotoBlock__boxMaxi}>
          <img className={style.recipePhotoBlock__img} src={fullRecipe?.photo} alt={'photo'}/>
          <div className={style.recipePhotoBlock__boxMini}>
            <img className={style.recipePhotoBlock__imgMini} src={test} alt={'photo'}/>
            <img className={style.recipePhotoBlock__imgMini} src={test} alt={'photo'}/>
            <img className={style.recipePhotoBlock__imgMini} src={test} alt={'photo'}/>
            <ButtonImgOpenGallery Imagebutton={test}/>

          </div>
          <div className={style.recipePhotoBlock__box}>
            <div className={style.recipePhotoBlock__buttons}>
              <ButtonLikeFull countLikes={5}/>
              <ButtonComments countComments={5}/>
            </div>
            <div className={style.recipePhotoBlock__module}>
              <div className={style.recipePhotoBlock__userBox}>
                <p className={style.recipePhotoBlock__text}>Марина Иванова</p>
                <p className={style.recipePhotoBlock__text}>12.02.2024</p>
              </div>
              <div className={style.recipePhotoBlock__boxPhoto}>
                <User className={style.recipePhotoBlock__user}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.recipePhotoBlock__steps}>
        <h3 className={style.recipePhotoBlock__title}>Пошаговое приготовление</h3>
        {recipeStepsMap?.map((obj) => (
          <StepByStep obj={obj}/>
        ))}


      </div>
    </div>
  )
}

export default RecipePhotoBlock
