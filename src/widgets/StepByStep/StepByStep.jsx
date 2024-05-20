import style from './StepByStep.module.scss'
import img from './../../assets/test.jpg'

function StepByStep({obj}) {

  return (
    <div className={style.stepByStep}>
      <h3 className={style.stepByStep__title}>Шаг {obj?.step}</h3>
      <img className={style.stepByStep__img} src={obj?.url}/>
      <div className={style.stepByStep__box}>
        {obj?.text}
      </div>
    </div>
  )
}

export default StepByStep
