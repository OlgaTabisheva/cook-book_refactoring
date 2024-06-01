import style from './Header.module.scss'
import {Link} from "react-router-dom";
import {useAuthenticated, useUserData} from "@nhost/react";
import Logo from "../../shared/Logo/Logo.jsx";
import LinkItem from "../../shared/LinkItem/LinkItem.jsx";
import userPhoto from "../../assets/userYelow.svg";
import {useState} from "react";

function Header({ popupMenu, setPopupMenu}) {
  const isAuthenticated = useAuthenticated()
  const user = useUserData()
  const [activeLink, setActiveLink] = useState(0)

  return (
    <section className={style.header}>
      <Logo onClick={()=>setActiveLink(0)} />
      <nav className={style.header__links}>

        <LinkItem linkTo={'/recipes' } onClick={()=>setActiveLink(2)}  text={'Рецепты'} active={activeLink===2} />
        <LinkItem linkTo={'/authors' } text={'Авторы'} onClick={()=>setActiveLink(1)}  active={activeLink===1}/>
        <LinkItem linkTo={'/add-recipe-step'} text={'Добавить новый рецепт'}  />

      </nav>
      <nav className={style.header__box}>
        {!isAuthenticated ? <LinkItem linkTo={'/auth'} text={'Вход/Регистрация'}  onClick={()=>setActiveLink(0)} /> :
          <LinkItem linkTo={'/user'} text={user.displayName}  onClick={()=>setActiveLink(0)} />}
        {/*<LinkItem linkTo={'/'} text={'Личный кабинет'}/>}*/}
        <img className={style.header__logo} width="24px" height="24px"
             src={user?.avatarUrl ? user?.avatarUrl : userPhoto} alt="user"/>
      </nav>
      <button className={style.header__burger} onClick={() => setPopupMenu(!popupMenu)}/>
    </section>
  )
}

export default Header