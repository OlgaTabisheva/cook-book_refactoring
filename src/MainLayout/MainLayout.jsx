import {Outlet} from "react-router-dom";
import style from "./MainLayout.module.scss";
import Header from "../widgets/Header/Header.jsx";
import Footer from "../widgets/Footer/Footer.jsx";

function MainLayout() {
  return (
    <div className={style.layout}>
      <Header/>
      <div className={style.content}>
        <Outlet/>
      </div>
      <Footer/>

    </div>
  );
}

export default MainLayout;