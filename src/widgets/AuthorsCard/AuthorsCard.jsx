import style from './AuthorsCard.module.scss'
import DefaultUserPhoto from "../../shared/DefaultUserPhoto/DefaultUserPhoto.jsx";


function AuthorsCard() {


  return (
    <section className={style.authorsCard}>
   <DefaultUserPhoto/>
<div className={style.authorsCard__section}>
<h3 className={style.authorsCard__title}>Анжелика ДлиннаяФамилия </h3>
      <div className={style.authorsCard__textBox}>
        <div className={style.authorsCard__text}>148 рецептов</div>
        <div className={style.authorsCard__text}>16 лайков</div>
      </div>
</div>
    </section>
  )
}

export default AuthorsCard