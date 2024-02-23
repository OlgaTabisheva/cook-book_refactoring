import style from './Footer.module.scss'
import {Link} from "react-router-dom";
import {useAuthenticated} from "@nhost/react";
import Logo from "../../shared/Logo/Logo.jsx";
import LinkItem from "../../shared/LinkItem/LinkItem.jsx";
import user from "../../assets/userYelow.svg";

function Footer() {
  const isAuthenticated = useAuthenticated()
  return (
    <section className={style.footer}>
      <Logo/>
      <nav className={style.header__links}>

        <LinkItem linkTo={'/'} text={'Рецепты'}/>
        <LinkItem linkTo={'/'} text={'Авторы'}/>
        <LinkItem linkTo={'/'} text={'Добавить новый рецепт'}/>

      </nav>
      <nav className={style.header__box}>
        {!isAuthenticated ? <LinkItem linkTo={'/'} text={'Вход/Регистрация'}/> : null}
        {/*<LinkItem linkTo={'/'} text={'Личный кабинет'}/>}*/}
        <img className={style.header__logo} width="24px" height="24px"
             src={user} alt="user"/>
      </nav>

    </section>
  )
}

export default Footer