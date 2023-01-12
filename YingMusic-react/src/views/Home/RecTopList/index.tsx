import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPlayListTrack } from "@/apis";
import { getTopList } from "@/apis";
import styles from "./style.module.scss";

const RecTopList = () => {
  const { t } = useTranslation();
  let [topMusicList, setTopMusicList] = useState<Map<string, SongInfo[]>>(
    new Map()
  );

  let backColorList = [
    "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
    "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
    "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
  ];

  useEffect(() => {
    getTopMusicList();
  }, []);

  const getTopMusicList = async () => {
    let topMusicList: Map<string, SongInfo[]> = new Map();
    let res = await getTopList();
    let topListInfo = res.list.slice(0, 5);
    for (let i = 0; i < topListInfo.length; i++) {
      let result = await getPlayListTrack(topListInfo[i].id, 20);
      topMusicList.set(topListInfo[i].name, result.songs);
    }
    setTopMusicList(topMusicList);
  };
  return (
    <div className={styles.toplist_container}>
      <div className={styles.head}>
        <h2>{t("home.charts")}</h2>
        <div className={styles.showAll}>
          <Link to="/allTopList" style={{ letterSpacing: "normal" }}>
            {t("home.seeMore")}
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        {[...topMusicList.keys()].map((name: string, index: number) => {
          return (
            <div className={styles.item} key={name}>
              <div
                className={styles.bg}
                style={{
                  backgroundImage: backColorList[index],
                }}
              ></div>
              <div className={styles.play}>
                <div className={styles.playIcon}>
                  <img
                    src="https://y.qq.com/ryqq/static/media/cover_play@2x.53a26efb.png?max_age=2592000"
                    alt=""
                  />
                </div>
              </div>
              <i className={styles.line}></i>
              <div className={styles.head}>
                <a>{name}</a>
              </div>
              <div className={styles.discription}>
                <ol className={styles.songlist}>
                  {topMusicList
                    .get(name)
                    ?.slice(0, 5)
                    .map((item) => {
                      return (
                        <li key={item.id}>
                          <a className={styles.songname}>{item.name}</a>
                          <br />
                          <Link
                            to="{
                path: '/artistDetail',
                query: { id: item.ar[0].id },
              }"
                            className={styles.artistname}
                          >
                            {item.ar[0].name}
                          </Link>
                        </li>
                      );
                    })}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecTopList;
