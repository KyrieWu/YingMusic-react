import React from 'react';
import { useSelector } from 'react-redux';
import RecArtists from './RecArtists';
import RecMVList from './RecMvList';
import RecNewAlbum from './RecNewAlbum';
import RecPlaylist from './RecPlaylist';
import RecTopList from './RecTopList';
import DailyRec from './DailyRec';
import styles from './style.module.scss';

const Home: React.FC = () => {
	const { isLogin } = useSelector((state: RootType) => ({
		isLogin: state.handleUser.isLogin,
	}));
	return (
		<main className={styles.home_container}>
			{isLogin && <DailyRec />}
			<RecPlaylist />
			<RecArtists />
			<RecNewAlbum />
			<RecTopList />
			<RecMVList />
		</main>
	);
};

export default Home;
