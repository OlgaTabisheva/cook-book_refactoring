import {Outlet} from "react-router-dom";
import style from "./MainLayout.module.scss";
import Header from "../widgets/Header/Header.jsx";

function MainLayout() {
  return (
    <div className={style.layout}>
      <Header/>
      <div className={style.content}>
        <Outlet/>
      </div>
    </div>
  );
}

export default MainLayout;