import style from './Auth.module.scss'
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import ButtonRadioAuth from "../../shared/Buttons/ButtonRadioAuth/ButtonRadioAuth.jsx";
import SignIn from "../../widgets/SignIn/SignIn.jsx";
import SignUp from "../../widgets/SignUp/SignUp.jsx";
import {useState} from "react";
import carrot from '../../assets/Group 7.svg'

function Auth() {
  const [disabledButton, setDisabledButton] = useState(false)
  const [password, setPassword] = useState(true)



  return (

    <div className={style.auth}>
      <HeaderMini color={'Sand10'}/>
      <div className={style.auth__images}>
        <div className={style.auth__content}>

          <div className={style.auth__contentText}>
            <h2 className={style.auth__title}>{!disabledButton ? "Войдите" : "Зарегистрируйтесь"}</h2>
            <p className={style.auth__description}>ставьте лайки, комментируйте и пишите рецепты </p>
            <ButtonRadioAuth disabledButton={disabledButton} setDisabledButton={setDisabledButton}/>
          </div>

          {disabledButton ?
            <SignUp password={password} setPassword={setPassword}/> :
            <SignIn password={password} setPassword={setPassword}/>}

        </div>

        <div className={style.auth__imagePepper}/>
        <div className={style.auth__imageGarlic}/>
        <div className={style.auth__imageTomato}/>
      </div>
    </div>
  )
}

export default Auth