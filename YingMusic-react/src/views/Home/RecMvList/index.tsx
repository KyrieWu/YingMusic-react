import React, { useEffect, useState } from "react";
import MVItem, { MVProps } from "@/components/MVItem";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import { getMVList } from "@/apis/mv";

const RecMVList: React.FC = () => {
  const { t } = useTranslation();
  const [mvType, setMVType] = useState("");
  const [mvList, setMVList] = useState<MVProps[]>([]);
  const navList = ["内地", "港台", "欧美", "韩国", "日本"];

  useEffect(() => {
    getRecMV("");
  }, []);

  const changeMVTypeHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.text == "精彩推荐") {
      getRecMV("");
    } else {
      getRecMV(event.currentTarget.text);
    }
  };

  const getRecMV = async (mvType: string) => {
    let result = await getMVList(mvType);
    const mvDatas = result.data;
    let mvList: MVProps[] = [];
    mvDatas.forEach((item) => {
      mvList.push(
        Object.freeze({
          id: item.id,
          name: item.name,
          picUrl: item.cover,
          artistId: item.artistId,
          artistName: item.artistName,
        })
      );
    });
    setMVType(mvType);
    setMVList(mvList);
  };

  return (
    <div className={styles.recMVList_container}>
      <div className={styles.head}>
        <h2>MV</h2>
      </div>
      <div className={styles.nav}>
        <a
          onClick={changeMVTypeHandler}
          className={mvType == "" ? styles.active : ""}
        >
          精彩推荐
        </a>
        {navList.map((item) => {
          return (
            <a
              key={item}
              onClick={changeMVTypeHandler}
              className={mvType == item ? styles.active : ""}
            >
              {item}
            </a>
          );
        })}
        <div className={styles.showAll}>
          <Link to="/allMVList">{t("home.seeMore")}</Link>
        </div>
      </div>
      <div className={styles.content}>
        <MVItem mvList={mvList}></MVItem>
      </div>
    </div>
  );
};

export default RecMVList;
