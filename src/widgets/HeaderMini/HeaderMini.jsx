import style from './HeaderMini.module.scss'

import {useAuthenticated} from "@nhost/react";
import Logo from "../../shared/Logo/Logo.jsx";
import ButtonClose from "../../shared/Buttons/ButtonClose/ButtonClose.jsx";


function HeaderMini() {
  const isAuthenticated = useAuthenticated()
  return (
    <section className={style.headerMini}>
      <Logo/>
      <ButtonClose/>
    </section>
  )
}

export default HeaderMini