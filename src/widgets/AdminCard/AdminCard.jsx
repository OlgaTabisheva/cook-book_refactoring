import style from './AdminCard.module.scss'
import icon from './../../assets/IconEdit.svg'

function AdminCard(obj) {
  return (
    <section
      className={style.adminCard}>
      <h3 className={style.adminCard__title}>{obj?.title}</h3>
      <div className={style.adminCard__box}>
        <p className={style.adminCard__text}> 11 рецептов</p>
        <img className={style.adminCard__icon} alt={'icon'} src={obj?.icon}/>
      </div>

    </section>
  )
}

export default AdminCard
