import React from "react";
import searchIcon from "@/assets/icons/search.svg";
import loginIcon from "@/assets/icons/login.png";
import styles from "./header.module.scss";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <header>
      <div className={styles.navigation_logo}>
        <img src="/music.ico" alt="" />
        <p>YingMusic</p>
      </div>
      <div className={styles.naviagtion_links}>
        <a className={location.pathname === "/" ? styles.active : ""}>首页</a>
        <a>发现音乐</a>
        <a>我的音乐</a>
      </div>
      <div className={styles.right_part}>
        <div className={styles.search_box}>
          <div className={styles.container}>
            <div className={styles.input}>
              <input type="search" placeholder="搜索" />
            </div>
            <img src={searchIcon} />
          </div>
        </div>
        <img className={styles.avator} src={loginIcon} alt="" loading="lazy" />
      </div>
    </header>
  );
};

export default Header;
