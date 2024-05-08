import style from './PortionsCounter.module.scss'
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";


function PortionsCounter() {
  return (

      <div className={style.portionsCounter__counter}>
        <ButtonPicture value={'minus'} disabled size={'normal'}/>
        <p className={style.portionsCounter__counterText}>1</p>

        <ButtonPicture value={'plus'} size={'normal'}/>
    </div>
  )
}

export default PortionsCounter