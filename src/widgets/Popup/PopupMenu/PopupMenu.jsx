import style from './PopupMenu.module.scss'
import HeaderMini from "../../HeaderMini/HeaderMini.jsx";
import Logo from "../../../shared/Logo/Logo.jsx";
import LinkItem from "../../../shared/LinkItem/LinkItem.jsx";
import userPhoto from "../../../assets/userYelow.svg";
import {useAuthenticated, useUserData} from "@nhost/react";


function PopupMenu({active, setPopupMenu,popupMenu }) {
  const isAuthenticated = useAuthenticated()
  const user = useUserData()

  return (
    <div
      className={style.popupMenu_visible}>
      <div className={style.popupMenu_visible__component}>


      <HeaderMini color={'SandColorful10'} onClick={()=>setPopupMenu(!popupMenu)}/>

      <div className={style.popupMenu_visible__box}>
        <nav className={style.popupMenu_visible__user}>
          {!isAuthenticated ? <LinkItem linkTo={'/auth'} text={'Вход/Регистрация'} active={active}/> :<LinkItem linkTo={'/user'} text={user.displayName}/>}
          {/*<LinkItem linkTo={'/'} text={'Личный кабинет'}/>}*/}
          <img className={style.popupMenu_visible__logo} width="24px" height="24px"
               src={userPhoto} alt="user"/>
        </nav>
        <nav className={style.popupMenu_visible__links}>

          <LinkItem popupMenu={popupMenu} setPopupMenu={setPopupMenu} linkTo={'/recipes'} text={'Рецепты'} active={active}/>
          <LinkItem popupMenu={popupMenu} setPopupMenu={setPopupMenu} linkTo={'/authors'} text={'Авторы'} active={active}/>
          <LinkItem popupMenu={popupMenu} setPopupMenu={setPopupMenu} linkTo={'/add-recipe-step'} text={'Добавить новый рецепт'} active={active}/>

        </nav>
      </div>
<div className={style.popupMenu_visible__overlay }> </div>
    </div>
    </div>
  )
}

export default PopupMenu
