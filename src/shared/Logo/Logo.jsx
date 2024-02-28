import headerLogo from "../../assets/Logo_olive.svg";
import {Link} from "react-router-dom";


function Logo() {
  return (
    <Link to={'/'}>
      <img width="109px"
           src={headerLogo} alt="logo"/>
    </Link>
  )
}

export default Logo