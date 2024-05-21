import style from './Header.module.scss'
import {Link} from "react-router-dom";
import {useAuthenticated, useUserData} from "@nhost/react";
import Logo from "../../shared/Logo/Logo.jsx";
import LinkItem from "../../shared/LinkItem/LinkItem.jsx";
import userPhoto from "../../assets/userYelow.svg";

function Header({active, popupMenu, setPopupMenu}) {
  const isAuthenticated = useAuthenticated()
  const user = useUserData()

  return (
    <section className={style.header}>
      <Logo/>
      <nav className={style.header__links}>

        <LinkItem linkTo={'/recipes'} text={'Рецепты'} active={active}/>
        <LinkItem linkTo={'/authors'} text={'Авторы'} active={active}/>
        <LinkItem linkTo={'/add-recipe-step'} text={'Добавить новый рецепт'} active={active}/>

      </nav>
      <nav className={style.header__box}>
        {!isAuthenticated ? <LinkItem linkTo={'/auth'} text={'Вход/Регистрация'} active={active}/> :
          <LinkItem linkTo={'/user'} text={user.displayName}/>}
        {/*<LinkItem linkTo={'/'} text={'Личный кабинет'}/>}*/}
        <img className={style.header__logo} width="24px" height="24px"
             src={user?.avatarUrl ? user?.avatarUrl : userPhoto} alt="user"/>
      </nav>
      <button className={style.header__burger} onClick={() => setPopupMenu(!popupMenu)}/>
    </section>
  )
}

export default Header