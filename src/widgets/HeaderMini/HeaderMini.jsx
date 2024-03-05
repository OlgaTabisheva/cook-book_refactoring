import style from './HeaderMini.module.scss'

import {useAuthenticated} from "@nhost/react";
import Logo from "../../shared/Logo/Logo.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";


function HeaderMini() {
  const isAuthenticated = useAuthenticated()
  return (
    <section className={style.headerMini}>
      <Logo/>
      <ButtonPicture value={'close'}/>
    </section>
  )
}

export default HeaderMini