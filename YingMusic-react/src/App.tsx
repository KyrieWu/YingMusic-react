import { useEffect } from 'react';

import { useRoutes, useLocation } from 'react-router-dom';

import { changeAppearance } from '@/utils/common';

import Header from './components/Header';
import router from './router';
import Footer from './views/Footer';

function App() {
	useEffect(() => {
		changeAppearance('light');
	}, []);
	const outlet = useRoutes(router);
	const location = useLocation();
	return (
		<div className="App">
			<Header />
			{outlet}
			{location.pathname === '/' && <Footer />}
		</div>
	);
}

export default App;
