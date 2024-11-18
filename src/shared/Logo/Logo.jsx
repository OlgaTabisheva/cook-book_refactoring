import headerLogo from "../../assets/Logo_olive.svg";
import {Link} from "react-router-dom";


function Logo({onClick}) {
  return (
    <Link to={'/'} onClick={onClick}>
      <img width="109px"
           src={headerLogo} alt="logo"/>
    </Link>
  )
}

export default Logo