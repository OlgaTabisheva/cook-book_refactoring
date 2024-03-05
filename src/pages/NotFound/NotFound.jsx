import style from './NotFound.module.scss'
import error from "../../assets/404.svg";
import AdditionalRecipes from "../../widgets/AdditionalRecipes/AdditionalRecipes.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";

function NotFound() {
  return (
    <section
      className={style.notFound}>
      <img className={style.notFound__img} src={error} alt={'notFound'}/>
      <h3 className={style.notFound__title}>Такой страницы не существует</h3>
      <form action="/" target="_blank">
        <ButtonBasic text={'На главную'} color={'primaryGreen'}/>
      </form>
      <AdditionalRecipes/>

    </section>
  )
}

export default NotFound
