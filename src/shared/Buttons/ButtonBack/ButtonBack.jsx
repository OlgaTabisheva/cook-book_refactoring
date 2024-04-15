import style from './ButtonBack.module.scss'
import {ReactComponent as Back} from '../../../assets/Back.svg';
import {useNavigate} from "react-router-dom";

function ButtonBack({onClick, disabled}) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(-1);
  }

  return (
    <button
      className={style.buttonBack}
      onClick={handleNavigate} disabled={disabled}>
      <Back className={style.buttonBack__back}/>
      Назад
    </button>
  )
}

export default ButtonBack