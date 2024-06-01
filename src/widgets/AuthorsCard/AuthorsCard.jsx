import style from './AuthorsCard.module.scss'
import {useEffect} from "react";
import photo from './../../assets/userYelow.svg'


function AuthorsCard(obj) {

  const defaultAvatar = 'https://s.gravatar.com/avatar/'


  return (
    <section className={style.authorsCard}>
      {obj?.avatarUrl?.includes(defaultAvatar) ? <div className={style.authorsCard__box}>
          <img className={style.authorsCard__img} alt={'avatar'}
               src={photo}/>
        </div>
        :
        <img className={style.authorsCard__avatar} alt={'avatar'}
             src={obj?.avatarUrl}/>}
      <div className={style.authorsCard__section}>
        <h3 className={style.authorsCard__title}>{obj?.displayName} </h3>
        <div className={style.authorsCard__textBox}>
          <div className={style.authorsCard__text}>{obj?.recipes_aggregate?.aggregate?.count} рецептов</div>
          <div
            className={style.authorsCard__text}>{obj?.like?.recipe?.likes_aggregate?.aggregate?.count > 0 ? obj?.like?.recipe?.likes_aggregate?.aggregate?.count : 0} лайка(ов)
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthorsCard