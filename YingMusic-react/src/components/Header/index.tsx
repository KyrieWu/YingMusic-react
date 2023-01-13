import React, { useState, useRef } from "react";
import ContextMenu, { IProps } from "../ContextMenu";
import { useTranslation } from "react-i18next";
import { Switch } from "antd";
import {
  SearchOutlined,
  LoginOutlined,
  LogoutOutlined,
  TranslationOutlined,
  UserOutlined,
  BulbOutlined,
  BulbFilled,
} from "@ant-design/icons";
import loginIcon from "@/assets/icons/login.png";
import styles from "./style.module.scss";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { changeAppearance } from "@/utils/common";

const Header: React.FC = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const [inputFocus, setInputFocus] = useState(false);
  const contextMenuRef = useRef<IProps>(null);
  const transContextRef = useRef<IProps>(null);
  const { t, i18n } = useTranslation();

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

  const showTransContextMenu = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (!transContextRef.current?.showMenu) {
      transContextRef.current?.openMenu(event);
    }
  };

  const closeTransContextMenu = () => {
    transContextRef.current?.closeMenu();
  };

  const toHome = () => {
    navigateTo("/");
  };

  const changLangToZH = () => {
    i18n.changeLanguage("zh");
  };
  const changLangToEN = () => {
    i18n.changeLanguage("en");
  };

  const changeTheme = (checked: boolean) => {
    if (checked) {
      changeAppearance("light");
    } else {
      changeAppearance("dark");
    }
  };

  const placeHolder = (): string => {
    return inputFocus == true ? "" : t("header.search");
  };

  return (
    <>
      <header>
        <div className={styles.navigation_logo}>
          <img src="/music.png" alt="" onClick={toHome} />
          <p onClick={toHome}>YingMusic</p>
        </div>
        <div className={styles.naviagtion_links}>
          <Link
            to={"/"}
            className={location.pathname === "/" ? styles.active : ""}
          >
            {t("header.home")}
          </Link>
          <Link
            to={"/discover"}
            className={location.pathname === "/discover" ? styles.active : ""}
          >
            {t("header.discover")}
          </Link>
          <Link
            to={"/library"}
            className={location.pathname === "/library" ? styles.active : ""}
          >
            {t("header.profile")}
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
                  placeholder={inputFocus ? "" : t("header.search")}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </div>
              <SearchOutlined className={styles.searchIcon} />
            </div>
          </div>
          <UserOutlined
            className={styles.avator}
            src={loginIcon}
            alt="loginIcon"
            onMouseEnter={showContextMenu}
            onMouseLeave={closeContextMenu}
            style={{ color: "var(--color-text)", fontSize: "28px" }}
          />
          <div
            className={styles.translate}
            onMouseEnter={showTransContextMenu}
            onMouseLeave={closeTransContextMenu}
          >
            <TranslationOutlined
              style={{ color: "var(--color-text)", fontSize: "28px" }}
            />
          </div>
          <Switch
            style={{
              marginLeft: "20px",
            }}
            checkedChildren={<BulbFilled style={{ fontSize: "15px" }} />}
            unCheckedChildren={<BulbOutlined style={{ fontSize: "15px" }} />}
            defaultChecked
            onChange={changeTheme}
          />
        </div>
      </header>
      <ContextMenu ref={contextMenuRef}>
        <div>
          <LoginOutlined />
          {t("login.login")}
        </div>
        <div>
          <LogoutOutlined />
          {t("profile.userProfileMenu.logout")}
        </div>
      </ContextMenu>
      <ContextMenu ref={transContextRef}>
        <div onClick={changLangToEN}>English</div>
        <div onClick={changLangToZH}>简体中文</div>
      </ContextMenu>
    </>
  );
};

export default Header;
