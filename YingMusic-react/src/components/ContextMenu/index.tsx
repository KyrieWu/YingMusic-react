import React, { ReactNode, useState } from "react";
import styles from "./style.module.scss";

type Props = {
  children: ReactNode[];
  name: string;
};

const contextMenu: React.FC<Props> = (props: Props) => {
  const [top, setTop] = useState("100px");
  const [left, setLeft] = useState("100px");
  const [showMenu, setShowMenu] = useState(true);
  const { children } = props;

  return (
    <div className={styles.context_menu}>
      {showMenu && (
        <div className={styles.menu} style={{ top: top, left: left }}>
          {children?.length &&
            children.map((item: ReactNode, index: number) => {
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
};

export default contextMenu;
