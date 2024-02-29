import style from './AuthorsCard.module.scss'


function AuthorsCard() {


  return (
    <section className={style.authorsCard}>
      <div className={style.authorsCard__box}><div className={style.authorsCard__img}/></div>

<h3 className={style.authorsCard__title}>Анжелика ДлиннаяФамилия </h3>
      <div className={style.authorsCard__textBox}>
        <div className={style.authorsCard__text}>148 рецептов</div>
        <div className={style.authorsCard__text}>16 лайков</div>
      </div>
    </section>
  )
}

export default AuthorsCard