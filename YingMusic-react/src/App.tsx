import { useEffect } from 'react';

import { useRoutes } from 'react-router-dom';

import { changeAppearance } from '@/utils/common';

import Header from './components/Header';
import router from './router';
import Footer from './views/Footer';

function App() {
	useEffect(() => {
		changeAppearance('light');
	}, []);
	const outlet = useRoutes(router);
	return (
		<div className="App">
			<Header />
			{outlet}
			<Footer />
		</div>
	);
}

export default App;
