import React from "react";
import RecPlaylist from "./RecPlaylist";
import styles from "./style.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.home_container}>
      <RecPlaylist />
    </div>
  );
};

export default Home;
