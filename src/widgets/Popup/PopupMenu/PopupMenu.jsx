import style from './PopupMenu.module.scss'
import HeaderMini from "../../HeaderMini/HeaderMini.jsx";
import Logo from "../../../shared/Logo/Logo.jsx";
import LinkItem from "../../../shared/LinkItem/LinkItem.jsx";
import userPhoto from "../../../assets/userYelow.svg";
import {useAuthenticated, useUserData} from "@nhost/react";


function PopupMenu({}) {
  const isAuthenticated = useAuthenticated()
  const user = useUserData()

  return (
    <div
      className={style.popupMenu_visible}>
      <div className={style.popupMenu_visible__component}>


      <HeaderMini/>

      <div className={style.popupMenu_visible__box}></div>
        <Logo/>
        <nav className={style.header__box}>
          {!isAuthenticated ? <LinkItem linkTo={'/auth'} text={'Вход/Регистрация'} active={active}/> :<LinkItem linkTo={'/user'} text={user.displayName}/>}
          {/*<LinkItem linkTo={'/'} text={'Личный кабинет'}/>}*/}
          <img className={style.header__logo} width="24px" height="24px"
               src={userPhoto} alt="user"/>
        </nav>
        <nav className={style.header__links}>

          <LinkItem linkTo={'/recipes'} text={'Рецепты'} active={active}/>
          <LinkItem linkTo={'/authors'} text={'Авторы'} active={active}/>
          <LinkItem linkTo={'/add-recipe-step'} text={'Добавить новый рецепт'} active={active}/>

        </nav>
<div className={style.popupMenu_visible__overlay }> </div>
      dd
    </div>
    </div>
  )
}

export default PopupMenu
