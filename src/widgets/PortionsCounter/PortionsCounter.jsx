import style from './PortionsCounter.module.scss'
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import {useEffect, useState} from "react";


function PortionsCounter({setCountPortions}) {

const [counter, setCounter] =  useState(1)

  useEffect(()=>{
    if (counter> 1) {
      setCountPortions(counter)
    }
  },[counter])

  return (

      <div className={style.portionsCounter__counter}>
        <ButtonPicture value={'minus'} disabled={counter===1} size={'normal'}  onClick={()=>setCounter(counter-1)}/>
        <p className={style.portionsCounter__counterText}>{counter}</p>

        <ButtonPicture value={'plus'} size={'normal'} onClick={()=>setCounter(counter+1)}/>
    </div>
  )
}

export default PortionsCounter