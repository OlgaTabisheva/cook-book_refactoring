import style from './LinkItem.module.scss'
import {Link} from "react-router-dom";

function LinkItem({linkTo, text , active}) {
  return (
    <Link to={linkTo} className={ !active ? style.linkItem : (style.linkItem && style.linkItem_active)  } >
      {text}

    </Link>
  )
}

export default LinkItem