import style from './HeaderMini.module.scss'
import Logo from "../../shared/Logo/Logo.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import {Link} from "react-router-dom";


function HeaderMini({color}) {

  return (
    <section className={
      color === 'SandColorful10' && style.headerMiniSandColorful10 ||
      color === 'Sand10' && style.headerMiniSand10}>
      <div className={style.headerMiniSand10__box}>
        <Logo/>
        <Link to={'/'}><ButtonPicture value={'close'} size={'normal'}/></Link>

      </div>

    </section>
  )
}

export default HeaderMini