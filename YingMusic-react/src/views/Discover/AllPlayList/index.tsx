import React, { useEffect, useState, useRef } from 'react';

import { useSelector } from 'react-redux';

import { getReccategoryPlayList } from '@/apis/playlist';
import LoadMore from '@/components/LoadMore';
import PlayListCategories from '@/components/PlayListCategories';
import SquareItem from '@/components/SquareItem';
import SpinPage from '@/components/Spin';
import nProgress from 'nprogress';

import styles from './style.module.scss';

const AllPlayList: React.FC = () => {
	const [squareItems, setSquareItems] = useState<SquareItemProps[]>([]);
	const [offset, setOffset] = useState<number>(0);
	const { playListCat } = useSelector((state: RootType) => ({
		playListCat: state.handlePlayList.playListCat,
	}));

	useEffect(() => {
		if (playListCat) {
			setOffset(0);
			setSquareItems([]);
			getPlayLists();
		}
	}, [playListCat]);

	useEffect(() => {
		offset > 0 && getPlayLists();
	}, [offset]);

	const loadMoreSquareItemHandler = () => {
		setOffset(offset + 1);
	};

	const getPlayLists = async () => {
		nProgress.start();
		const result = (await getReccategoryPlayList(30, playListCat, offset)) as unknown as CatePlayLists;
		const playListDatas = result.playlists;
		addSquareItem(playListDatas);
	};

	const addSquareItem = (playListDatas: CatePlayListInfo[]) => {
		let squareItemArr: SquareItemProps[] = [];
		playListDatas.forEach(item => {
			squareItemArr.push(
				Object.freeze({
					id: item.id,
					type: 'songlist',
					picUrl: item.coverImgUrl,
					name: item.name,
					playCount: item.playCount,
					routerPath: '/songlistDetail',
				})
			);
		});

		offset == 0 ? setSquareItems(squareItemArr) : setSquareItems([...squareItems, ...squareItemArr]);

		nProgress.done();
	};

	return (
		<div className={styles.allplaylist_container}>
			<PlayListCategories></PlayListCategories>
			<div className={styles.content}>
				{squareItems.length == 0 ? <SpinPage /> : <SquareItem squareItems={squareItems}></SquareItem>}
			</div>
			<div>{squareItems.length !== 0 && <LoadMore clickHandler={loadMoreSquareItemHandler} />}</div>
		</div>
	);
};

export default AllPlayList;
