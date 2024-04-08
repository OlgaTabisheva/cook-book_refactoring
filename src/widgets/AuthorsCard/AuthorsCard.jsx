import style from './AuthorsCard.module.scss'
import DefaultUserPhoto from "../../shared/DefaultUserPhoto/DefaultUserPhoto.jsx";
import {gql, useQuery} from "@apollo/client";


function AuthorsCard(obj) {

  return (
    <section className={style.authorsCard}>
      <DefaultUserPhoto/>
      <div className={style.authorsCard__section}>
        <h3 className={style.authorsCard__title}>{obj?.displayName} </h3>
        <div className={style.authorsCard__textBox}>
          <div className={style.authorsCard__text}>{obj?.recipes_aggregate?.aggregate?.count} рецептов</div>
          <div className={style.authorsCard__text}>{ obj?.like?.recipe?.likes_aggregate?.aggregate?.count > 0 ? obj?.like?.recipe?.likes_aggregate?.aggregate?.count  : 0 }  лайка(ов)</div>
        </div>
      </div>
    </section>
  )
}

export default AuthorsCard