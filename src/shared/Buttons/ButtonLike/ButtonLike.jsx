import style from './ButtonLike.module.scss'
import {useState} from "react";

function ButtonLike({count}) {
  const [like, setLike]=useState(true)
  return (
    <button className={like === false ? style.buttonLike : style.buttonLike_active} onClick={()=>setLike(!like)}>
      <div
        className={like === false ? style.buttonLike__heart : style.buttonLike_active__heart_active}></div>
      <div className={style.buttonLike_active__count}>5</div>

    </button>
  )
}

export default ButtonLike
