import style from './PopupBasic.module.scss'
import ButtonPicture from "../../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import ButtonBasic from "../../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";


function PopupBasic({title, text}) {
  return (
    <div className={style.popupBasic}>
      <div className={style.popupBasic__header}>
        <h3 className={style.popupBasic__title}>{title}</h3>
        <ButtonPicture value={'brownClose'} size={'smallInherit'}/>

      </div>
      <p className={style.popupBasic__text}>{text}</p>
      <div className={style.popupBasic__buttons}>
        <div className={style.popupBasic__button}>
          <ButtonBasic text={'Отменить'} color={'secondaryGreen'}/>
        </div>
        <div className={style.popupBasic__button}>
          <ButtonBasic text={'Удалить'} color={'primaryRed'}/>
        </div>
      </div>
    </div>
  )
}

export default PopupBasic