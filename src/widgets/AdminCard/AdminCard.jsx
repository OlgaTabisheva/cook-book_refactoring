import style from './AdminCard.module.scss'
import icon from './../../assets/IconEdit.svg'
import {Navigate, useLocation, useNavigate} from "react-router-dom";

function AdminCard(obj) {


  const navigate = useNavigate();

  function handleClickButton() {
    navigate({
      pathname: `/admin/${obj?.title}`,
      query: {searchValue: obj?.title}
    })
  }


  return (
    <button className={style.adminCard} onClick={handleClickButton}>
      <h3 className={style.adminCard__title}>{obj?.title}</h3>
      <div className={style.adminCard__box}>
        <p className={style.adminCard__text}> 11 рецептов</p>
        <img className={style.adminCard__icon} alt={'icon'} src={obj?.icon}/>
      </div>

    </button>
  )
}

export default AdminCard
