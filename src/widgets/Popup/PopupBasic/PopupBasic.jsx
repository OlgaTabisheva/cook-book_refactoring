import style from './PopupBasic.module.scss'
import ButtonPicture from "../../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import ButtonBasic from "../../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {Navigate} from "react-router-dom";


function PopupBasic({title, text,textButtonGo , setPopupCloseAddRecipe, popupCloseAddRecipe,exitClick, closeAddRecipe, setCloseAddRecipe}) {

  return (
    <div className={style.popupBasic}>
      <div className={style.popupBasic__header}>
        <h3 className={style.popupBasic__title}>{title}</h3>
        <ButtonPicture value={'brownClose'} size={'smallInherit'}  onClick={()=>setPopupCloseAddRecipe(!popupCloseAddRecipe)}/>

      </div>
      <p className={style.popupBasic__text}>{text}</p>
      <div className={style.popupBasic__buttons}>
        <div className={style.popupBasic__button}>
          <ButtonBasic text={'Отменить'} color={'secondaryGreen'} onClick={()=>setPopupCloseAddRecipe(!popupCloseAddRecipe)}/>
        </div>
        <div className={style.popupBasic__button}>
          <ButtonBasic text={textButtonGo} color={'primaryRed'} onClick={exitClick}/>
        </div>
        {closeAddRecipe === true && <Navigate to="/" replace={true} setCloseAddRecipe={false}/>
        }
      </div>
    </div>
  )
}

export default PopupBasic