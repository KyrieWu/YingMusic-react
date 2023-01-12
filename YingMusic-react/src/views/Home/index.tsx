import React from "react";
import RecPlaylist from "./RecPlaylist";
import RecArtists from "./RecArtists";
import RecNewAlbum from "./RecNewAlbum";
import RecTopList from "./RecTopList";
import styles from "./style.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.home_container}>
      <RecPlaylist />
      <RecArtists />
      <RecNewAlbum />
      <RecTopList />
    </div>
  );
};

export default Home;
