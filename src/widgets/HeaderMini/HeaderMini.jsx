import style from './HeaderMini.module.scss'
import Logo from "../../shared/Logo/Logo.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import {Link, useNavigate} from "react-router-dom";


function HeaderMini({color, popupMenu, setPopupMenu}) {
  const navigate = useNavigate();
  return (
    <section className={
      color === 'SandColorful10' && style.headerMiniSandColorful10 ||
      color === 'Sand10' && style.headerMiniSand10}>
      <div className={style.headerMiniSand10__box}>
        <Logo/>
       <ButtonPicture onClick={()=>navigate(-1)} value={'close'} size={'normal'}> </ButtonPicture>

      </div>

    </section>
  )
}

export default HeaderMini