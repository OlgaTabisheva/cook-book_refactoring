import style from './HeaderMini.module.scss'
import Logo from "../../shared/Logo/Logo.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";


function HeaderMini({color}) {

  return (
    <section className={
      color === 'SandColorful10' && style.headerMiniSandColorful10 ||
      color === 'Sand10' && style.headerMiniSand10}>
      <div className={style.headerMiniSand10__box}>
        <Logo/>
        <ButtonPicture value={'close'} size={'normal'}/>
      </div>

    </section>
  )
}

export default HeaderMini