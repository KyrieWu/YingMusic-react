import React, { useState, useEffect } from "react";
import RoundItem from "@/components/RoundItem";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getRecArtists } from "@/apis/artists";
import styles from "./style.module.scss";

const RecArtists: React.FC = () => {
  const [artistsInfos, setArtistsInfos] = useState<ArtistsInfo[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getArtists();
  }, []);

  const getArtists = async () => {
    let res = await getRecArtists();
    setArtistsInfos(res.artists);
  };

  return (
    <div className={styles.recArtists_container}>
      <div className={styles.head}>
        <h2>{t("home.recommendArtist")}</h2>
        <div className={styles.showAll}>
          <Link to="/allArtists" style={{ letterSpacing: "normal" }}>
            {t("home.seeMore")}
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <RoundItem artistsInfos={artistsInfos}></RoundItem>
      </div>
    </div>
  );
};

export default RecArtists;
