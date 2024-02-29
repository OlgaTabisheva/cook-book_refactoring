import style from './Header.module.scss'
import {Link} from "react-router-dom";
import {useAuthenticated} from "@nhost/react";
import Logo from "../../shared/Logo/Logo.jsx";
import LinkItem from "../../shared/LinkItem/LinkItem.jsx";
import user from "../../assets/userYelow.svg";

function Header({active}) {
  const isAuthenticated = useAuthenticated()
  return (
    <section className={style.header}>
      <Logo/>
      <nav className={style.header__links}>

        <LinkItem linkTo={'/recipes'} text={'Рецепты'} active={active}/>
        <LinkItem linkTo={'/authors'} text={'Авторы'} active={active}/>
        <LinkItem linkTo={'/test'} text={'Добавить новый рецепт'} active={active}/>

      </nav>
      <nav className={style.header__box}>
        {!isAuthenticated ? <LinkItem linkTo={'/auth'} text={'Вход/Регистрация'} active={active}/> : null}
        {/*<LinkItem linkTo={'/'} text={'Личный кабинет'}/>}*/}
        <img className={style.header__logo} width="24px" height="24px"
             src={user} alt="user"/>
      </nav>

    </section>
  )
}

export default Header