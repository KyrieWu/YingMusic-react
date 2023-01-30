import React from 'react';
import RecArtists from './RecArtists';
import RecMVList from './RecMvList';
import RecNewAlbum from './RecNewAlbum';
import RecPlaylist from './RecPlaylist';
import RecTopList from './RecTopList';
import DailyRec from './DailyRec';
import styles from './style.module.scss';

const Home: React.FC = () => {
	return (
		<main className={styles.home_container}>
			<RecPlaylist />
			<DailyRec />
			<RecArtists />
			<RecNewAlbum />
			<RecTopList />
			<RecMVList />
		</main>
	);
};

export default Home;
