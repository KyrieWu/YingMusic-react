import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import NavBar from '@/components/NavBar';

import styles from './style.module.scss';

const Discover: React.FC = () => {
	return (
		<div className={styles.discover_container}>
			<NavBar />
			<Outlet />
		</div>
	);
};

export default Discover;
