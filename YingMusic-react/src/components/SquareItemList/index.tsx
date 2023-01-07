import React from "react";
import styles from "./style.module.scss";
import { timestampToDate } from "@/utils/fonmatDate";

// interface AltumDetail {
//     album: AlbumInfo,
//     code: number
//     resourceState: boolean
//     songs: SongInfo[]
//   }

type Props = {
  squareItems: SquareItemProps[];
};

const SquareItemList: React.FC<Props> = (props: Props) => {
  const { squareItems } = props;
  return (
    <div className={styles.content}>
      {squareItems.map((item: SquareItemProps) => {
        return (
          <div className={styles.item} key={item.id}>
            <div className={styles.play}>
              <div className={styles.playIcon}>
                <img
                  src="https://y.qq.com/ryqq/static/media/cover_play@2x.53a26efb.png?max_age=2592000"
                  alt=""
                />
              </div>
              <div className={styles.img}>
                <img src={item.picUrl} alt={item.name} />
              </div>
            </div>
            <div className={styles.discription}>
              <a className={styles.des_title} title={item.name}>
                {item.name}
              </a>
              {item.artistName && item.artistId && (
                <a style={{ fontSize: "12px", opacity: "0.7" }}>
                  {item.artistName}
                </a>
              )}
              {item.playCount && (
                <div className={styles.playcount}>
                  播放量:&nbsp;{(item.playCount / 10000).toFixed(1)}万
                </div>
              )}
              {item.publishTime && (
                <div className={styles.publishTime}>
                  {timestampToDate(item.publishTime)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SquareItemList;
