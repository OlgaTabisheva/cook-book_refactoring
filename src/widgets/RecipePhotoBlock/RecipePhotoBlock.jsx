import style from './RecipePhotoBlock.module.scss'
import test from "../../assets/test.jpg";
import ButtonLikeFull from "../../shared/Buttons/ButtonLike/ButtonLikeFull.jsx";
import ButtonComments from "../../shared/Buttons/ButtonComments/ButtonComments.jsx";
import {ReactComponent as User} from '../../assets/user.svg';
import StepByStep from "../StepByStep/StepByStep.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ButtonImgOpenGallery from "../../shared/Buttons/ButtonImgOpenGallery/ButtonImgOpenGallery.jsx";
import PopupImageGallery from "../Popup/PopupImageGallery/PopupImageGallery.jsx";


function RecipePhotoBlock({instantAddRecipe, recipeStepsMap}) {
  const {id} = useParams();
  const navigate = useNavigate();
 const [openImagePopup,setOpenImagePopup] = useState(false)
  const [recipeStepsMapSlice,setRecipeStepsMapSlice] = useState(false)
  const [recipeStepsMapSliceForButton,setRecipeStepsMapSliceForButton] = useState(false)
  const [fullRecipe,setFullRecipe] = useState()
  useEffect(()=>{
    setRecipeStepsMapSlice(recipeStepsMap?.slice(0, 4));
    setRecipeStepsMapSliceForButton(recipeStepsMap?.slice(4, 5))
  },[recipeStepsMap])
  useEffect(()=>{
    setFullRecipe(instantAddRecipe?.recipes?.find(elem => elem?.id === id))
  },[instantAddRecipe])

  return (
    <div className={style.recipePhotoBlock}>

        <PopupImageGallery open={openImagePopup} setOpenImagePopup={setOpenImagePopup}/>


      <div className={style.recipePhotoBlock__recipe}>
        <div className={style.recipePhotoBlock__boxMaxi}>
          <img className={style.recipePhotoBlock__img} src={fullRecipe?.photo} alt={'photo'}/>
          <div className={style.recipePhotoBlock__boxMini}>
            {recipeStepsMapSlice && recipeStepsMapSlice?.map((obj) => (
              <img className={style.recipePhotoBlock__imgMini} key={obj?.id} src={obj?.url ? obj?.url : test} alt={'photo'}/>
            ))}

            {recipeStepsMapSliceForButton && recipeStepsMapSliceForButton?.map((obj) => (
            <ButtonImgOpenGallery key={obj?.id}  Imagebutton={obj?.url ? obj?.url : test} onClick={()=>setOpenImagePopup(!openImagePopup)}/>
            ))}

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
        {recipeStepsMap && recipeStepsMap?.map((obj) => (
          <StepByStep obj={obj} key={obj?.id} />
        ))}


      </div>

    </div>
  )
}

export default RecipePhotoBlock
