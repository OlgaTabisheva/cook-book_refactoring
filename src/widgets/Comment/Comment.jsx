import style from './Comment.module.scss'
import {ReactComponent as User} from '../../assets/user.svg';
import ButtonLikeFull from "../../shared/Buttons/ButtonLike/ButtonLikeFull.jsx";


function Comments() {
  return (
    <section className={style.comment}>
      <div className={style.comment__boxPhoto}>
        <User className={style.comment__user}/>
      </div>
      <div className={style.comment__box}>
      <h2 className={style.comment__title}>Марина Иванова </h2>

      <p className={style.comment__time}> 14 февраля 2024 г. в 11:11</p>
      <p className={style.comment__text}>Это шедевр! Мягкие, ароматные очень вкусные булочки получились! Вместо сливочного сыра использовала маскарпоне,
        остальное строго по рецепту. Спасибо огромное за рецепт!</p>
        <div className={style.comment__bottomBox}>
<p className={style.comment__info}>Пожаловаться</p>
          <ButtonLikeFull countLikes={5}/>
        </div>
      </div>
    </section>
  )
}

export default Comments
