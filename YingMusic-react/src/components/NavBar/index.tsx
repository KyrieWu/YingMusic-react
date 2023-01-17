import React from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';

import styles from './styles.module.scss';

const NavBar: React.FC = () => {
	const { t } = useTranslation();
	const location = useLocation();
	return (
		<nav>
			<Link to={'/discover/allPlayList'} className={location.pathname === '/discover/allPlayList' ? styles.active : ''}>
				{t('nav.playlists')}
			</Link>
			<Link to={'/discover/allArtists'} className={location.pathname === '/discover/allArtists' ? styles.active : ''}>
				{t('nav.artists')}
			</Link>
			<Link to={'/discover/allTopList'} className={location.pathname === '/discover/allTopList' ? styles.active : ''}>
				{t('nav.charts')}
			</Link>

			<Link to="/discover/allMVList" className={location.pathname === '/discover/allMVList' ? styles.active : ''}>
				MV
			</Link>
			<Link to="/discover/allAltumList" className={location.pathname === '/discover/allTopList' ? styles.active : ''}>
				{t('nav.album')}
			</Link>
		</nav>
	);
};

export default NavBar;
