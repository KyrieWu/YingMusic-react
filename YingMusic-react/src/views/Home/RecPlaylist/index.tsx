import React, { useState, useEffect } from "react";
import SquareItemList from "@/components/SquareItemList";
import styles from "./style.module.scss";
import { getRecPlayList, getReccategoryPlayList } from "@/apis/playlist";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RecPlaylist: React.FC = () => {
  const { t } = useTranslation();
  const [catTag, setCatTag] = useState("");
  const navList = ["华语", "流行", "摇滚", "民谣", "电子"];
  let [playListData, setPlayListData] = useState<
    PlayListInfo[] | ReccategoryPlaylistInfo[]
  >([]);
  let [squareItems, setSquareItems] = useState<SquareItemProps[]>([]);

  useEffect(() => {
    getPlayListHandler();
  }, []);

  const getCatPlayListHandler = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    let cat = event.currentTarget.text;

    let result = await getReccategoryPlayList(10, cat, 0);
    playListData = result.playlists;
    let squareItems: SquareItemProps[] = [];
    playListData.forEach((item) => {
      squareItems.push(
        Object.freeze({
          id: item.id,
          picUrl: item.coverImgUrl,
          name: item.name,
          routerPath: "/songlistDetail",
        })
      );
    });
    setSquareItems(squareItems);
    setCatTag(cat);

    event.stopPropagation();
  };

  const getPlayListHandler = async () => {
    let result = await getRecPlayList();
    playListData = result.result;
    let squareItems: SquareItemProps[] = [];
    playListData.forEach((item) => {
      squareItems.push(
        Object.freeze({
          id: item.id,
          picUrl: item.picUrl,
          name: item.name,
          routerPath: "/songlistDetail",
        })
      );
    });

    setSquareItems(squareItems);
    setCatTag("为你推荐");
  };

  return (
    <div className={styles.recPlaylist_container}>
      <div className={styles.recPlaylist_head}>
        <h2>{t("home.recommendPlaylist")}</h2>
      </div>
      <div className={styles.recPlaylist_nav}>
        <a
          className={catTag === "为你推荐" ? styles.active : ""}
          onClick={getPlayListHandler}
        >
          精彩推荐
        </a>
        {navList.map((item) => {
          return (
            <a
              className={catTag === item ? styles.active : ""}
              key={item}
              onClick={getCatPlayListHandler}
            >
              {item}
            </a>
          );
        })}
        <div className={styles.showAll}>
          <Link to={"/allPlayList"}>{t("home.seeMore")}</Link>
        </div>
      </div>
      <div className={styles.recPlaylist_content}>
        <SquareItemList squareItems={squareItems} />
      </div>
    </div>
  );
};

export default RecPlaylist;
