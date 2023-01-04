import React, { useState } from "react";
import ContextMenu from "../ContextMenu";
import {
  SearchOutlined,
  LoginOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import loginIcon from "@/assets/icons/login.png";
import styles from "./style.module.scss";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const [inputFocus, setInputFocus] = useState(false);

  // 处理 input 的 onFocus 事件
  const focusHandler = () => {
    setInputFocus(true);
  };

  // 处理 input 的 onBlur 事件
  const blurHandler = () => {
    setInputFocus(false);
  };

  return (
    <div>
      {"header 组件 "}
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
            <div
              className={[
                styles.container,
                inputFocus === true ? styles.active : "",
              ].join(" ")}
            >
              <div className={styles.input}>
                <input
                  type="search"
                  placeholder="搜索"
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </div>
              <SearchOutlined className={styles.searchIcon} />
            </div>
          </div>
          <img className={styles.avator} src={loginIcon} alt="" />
        </div>
      </header>
      <ContextMenu name="nihao">
        <div>
          <SettingOutlined />
          设置
        </div>
        <div>
          <LoginOutlined />
          登录
        </div>
        <div>
          <LogoutOutlined />
          退出登录
        </div>
      </ContextMenu>
    </div>
  );
};

export default Header;
