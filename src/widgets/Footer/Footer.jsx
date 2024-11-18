import style from './Footer.module.scss'
import {useAuthenticated} from "@nhost/react";


function Footer() {
  const isAuthenticated = useAuthenticated()
  return (
    <section className={style.footer}>
      <h3 className={style.footer__title}>Сайт создан любителями средиземноморской и сербской кухни вне коммерческих
        целях
      </h3>
      <nav className={style.footer__links}>
        <h4 className={style.footer__boxTitle}>Контакты разработчика и администратора сайта</h4>
        <a className={style.footer__link} href='mailto:oliatabisheva@gmail.com'>Mail</a>
        <a className={style.footer__link} href='https://t.me/oliatab'>Telegram</a>
        <a className={style.footer__link} href='https://github.com/OlgaTabisheva'>Github</a>
        <a className={style.footer__link}
           href='https://www.linkedin.com/in/olga-tabisheva-67541b258/'>linkedin</a>
      </nav>
      <nav className={style.footer__box}>
        <h4 className={style.footer__boxTitle}>UX/UI Дизайнер</h4>

        <a className={style.footer__linkLast} href='https://t.me/Polinadks'>Telegram</a>
      </nav>

    </section>
  )
}

export default Footer