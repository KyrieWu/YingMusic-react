import React, { useState, useRef } from "react";
import ContextMenu, { IProps } from "../ContextMenu";
import {
  SearchOutlined,
  LoginOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import loginIcon from "@/assets/icons/login.png";
import styles from "./style.module.scss";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const [inputFocus, setInputFocus] = useState(false);
  const contextMenuRef = useRef<IProps>(null);

  // 处理 input 的 onFocus 事件
  const focusHandler = () => {
    setInputFocus(true);
  };

  // 处理 input 的 onBlur 事件
  const blurHandler = () => {
    setInputFocus(false);
  };

  const showContextMenu = (event: React.MouseEvent<HTMLImageElement>): void => {
    if (!contextMenuRef.current?.showMenu) {
      contextMenuRef.current?.openMenu(event);
    }
  };

  const closeContextMenu = () => {
    contextMenuRef.current?.closeMenu();
  };

  const toHome = () => {
    navigateTo("/");
  };

  return (
    <div>
      <header>
        <div className={styles.navigation_logo}>
          <img src="/music.ico" alt="" onClick={toHome} />
          <p onClick={toHome}>YingMusic</p>
        </div>
        <div className={styles.naviagtion_links}>
          <Link
            to={"/"}
            className={location.pathname === "/" ? styles.active : ""}
          >
            首页
          </Link>
          <Link
            to={"/discover"}
            className={location.pathname === "/discover" ? styles.active : ""}
          >
            发现音乐
          </Link>
          <Link
            to={"/library"}
            className={location.pathname === "/library" ? styles.active : ""}
          >
            我的音乐
          </Link>
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
          <img
            className={styles.avator}
            src={loginIcon}
            alt="loginIcon"
            onMouseEnter={showContextMenu}
            onMouseLeave={closeContextMenu}
          />
        </div>
      </header>
      <ContextMenu ref={contextMenuRef}>
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
