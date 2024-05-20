import style from './BoxClockTime.module.scss'
import img from "../../assets/test.jpg";
import recipeClock from "../../assets/clock 16.svg";

function BoxClockTime({howLong}) {
  return (
    <section className={style.boxClockTime}>
      <img className={style.boxClockTime__imgClock}
           src={recipeClock} alt="clock"/>
      <p className={style.boxClockTime__text}>{howLong}</p>
    </section>
  )
}

export default BoxClockTime