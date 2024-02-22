import style from './LinkItem.module.scss'
import {Link} from "react-router-dom";

function LinkItem({linkTo, text}) {
  return (
    <Link to={linkTo} className={style.linkItem}>
      {text}

    </Link>
  )
}

export default LinkItem