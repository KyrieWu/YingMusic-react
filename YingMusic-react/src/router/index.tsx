import React, { lazy } from 'react';

import Discover from '@/views/Discover';
import Home from '@/views/Home';
import Library from '@/views/Library';
import SpinPage from '@/components/Spin';

const AllPlayList = lazy(() => import('@/views/Discover/AllPlayList'));
const AllArtists = lazy(() => import('@/views/Discover/AllArtists'));
import { Navigate } from 'react-router-dom';

// 懒加载
const withLoadingComponent = (comp: JSX.Element) => {
	return <React.Suspense fallback={<SpinPage />}>{comp}</React.Suspense>;
};

const routes = [
	{
		path: '*',
		element: <Navigate to="/" />,
	},
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/library',
		element: <Library />,
	},
	{
		path: '/discover',
		element: <Discover />,
		children: [
			{
				path: '/discover/allPlayList',
				element: withLoadingComponent(<AllPlayList />),
			},
			{
				path: '/discover/allArtists',
				element: withLoadingComponent(<AllArtists />),
			},
		],
	},
];

export default routes;
