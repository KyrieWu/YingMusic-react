import React, { lazy } from 'react';

import Discover from '@/views/Discover';
import Home from '@/views/Home';
import Library from '@/views/Library';
import SpinPage from '@/components/Spin';

const AllPlayList = lazy(() => import('@/views/Discover/AllPlayList'));
const AllArtists = lazy(() => import('@/views/Discover/AllArtists'));
const AllTopList = lazy(() => import('@/views/Discover/AllTopList'));
const AllMvList = lazy(() => import('@/views/Discover/AllMvList'));
const SongListDetail = lazy(() => import('@/views/Detail/SongListDetail'));
const MVDetail = lazy(() => import('@/views/Detail/MvDetail'));
const ArtistDetail = lazy(() => import('@/views/Detail/ArtistDetail'));
const AlbumDetail = lazy(() => import('@/views/Detail/AlbumDetail'));
const Search = lazy(() => import('@/views/Search'));
const Login = lazy(() => import('@/views/Login'));
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
			{
				path: '/discover/allTopList',
				element: withLoadingComponent(<AllTopList />),
			},
			{
				path: '/discover/allMVList',
				element: withLoadingComponent(<AllMvList />),
			},
		],
	},
	{
		path: '/songlistDetail/:id',
		element: withLoadingComponent(<SongListDetail />),
	},
	{
		path: '/mvDetail/:id',
		element: withLoadingComponent(<MVDetail />),
	},
	{
		path: '/albumDetail/:id',
		element: withLoadingComponent(<AlbumDetail />),
	},
	{
		path: '/artistDetail/:id',
		element: withLoadingComponent(<ArtistDetail />),
	},
	{
		path: '/search/:keyword',
		element: withLoadingComponent(<Search />),
	},
	{
		path: '/login',
		element: withLoadingComponent(<Login />),
	},
];

export default routes;
