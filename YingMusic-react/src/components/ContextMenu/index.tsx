import React, {
  ReactNode,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./style.module.scss";

export type IProps = {
  children: ReactNode[];
  openMenu: Function;
  closeMenu: Function;
  showMenu: boolean;
};

const contextMenu: React.FC<IProps> = forwardRef((props, ref) => {
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { children } = props;

  const closeMenu = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 1000);
  };

  const setMenu = (top: number, left: number): void => {
    setTop(top - 10);
    setLeft(left - 10);
  };

  useImperativeHandle(ref, () => ({
    showMenu,
    openMenu(e: React.MouseEvent<HTMLImageElement>) {
      setShowMenu(true);
      setMenu(e.clientY, e.clientX);
      e.preventDefault();
    },
    closeMenu() {
      setShowMenu(false);
    },
  }));

  const openMenu = () => {
    setShowMenu(true);
  };

  return (
    <div className={styles.context_menu}>
      {showMenu && (
        <div
          className={styles.menu}
          style={{ top: top + "px", left: left + "px" }}
          onMouseLeave={closeMenu}
          onMouseEnter={openMenu}
        >
          {children?.length &&
            children?.map((item: ReactNode, index: number) => {
              return (
                <div className={styles.item} key={index}>
                  {item}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
});

export default contextMenu;
