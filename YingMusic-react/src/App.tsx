import { useEffect } from 'react';

import { useRoutes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { changeAppearance } from '@/utils/common';

import Header from './components/Header';
import router from './router';
import Footer from './views/Footer';
import Player from './components/Player';

function App() {
	useEffect(() => {
		changeAppearance('light');
	}, []);
	const outlet = useRoutes(router);
	const location = useLocation();

	const { showPlayerBar } = useSelector((state: RootType) => ({
		showPlayerBar: state.handlePlayer.showPlayerBar,
	}));
	return (
		<div className="App">
			<Header />
			{outlet}
			{location.pathname === '/' && <Footer />}
			{showPlayerBar && <Player />}
		</div>
	);
}

export default App;
