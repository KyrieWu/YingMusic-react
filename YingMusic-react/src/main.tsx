import React from 'react';

import ReactDOM from 'react-dom/client';
import 'reset-css';
import '@/assets/styles/global.scss';
import '@/assets/styles/nprogress.css';
// 引入国际化解决方案
import '@/locale';
import { changeAppearance } from '@/utils/common';
import { Provider } from 'react-redux';
// 路由
import { BrowserRouter } from 'react-router-dom';

import App from './App';
//状态管理
import store from './store';

window.addEventListener('load', () => {
	let theme = localStorage.getItem('data-theme');
	changeAppearance(theme || 'light');
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>
);
