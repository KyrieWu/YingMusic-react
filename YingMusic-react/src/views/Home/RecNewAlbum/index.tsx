import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getNewAlbum } from '@/apis/album';
import SquareItem from '@/components/SquareItem';

import styles from './style.module.scss';

interface AlbumArea {
	key: string;
	value: string;
}

const RecNewAlbum: React.FC = () => {
	useEffect(() => {
		getAltums('ALL');
	}, []);
	const { t } = useTranslation();
	const albumAreas: AlbumArea[] = [
		{
			key: 'ZH',
			value: '华语',
		},
		{ key: 'EA', value: '欧美' },
		{
			key: 'KR',
			value: '韩国',
		},
		{ key: 'JP', value: '日本' },
	];
	const [area, setArea] = useState('ALL');
	const [squareItems, setSquareItems] = useState<SquareItemProps[]>([]);

	const selectAreatoAll = () => {
		getAltums('ALL');
	};

	const changeArea = (event: React.MouseEvent<HTMLAnchorElement>) => {
		albumAreas.forEach(item => {
			if (item.value == event.currentTarget.text) {
				getAltums(item.key);
			}
		});

		event.stopPropagation();
	};

	const getAltums = async (area: string) => {
		const result = await getNewAlbum(area, 10, 0);
		const playListData = result.albums;

		const squareItems: SquareItemProps[] = [];
		playListData.forEach(item => {
			squareItems.push(
				Object.freeze({
					id: item.id,
					picUrl: item.picUrl,
					name: item.name,
					artistId: item.artist.id,
					artistName: item.artist.name,
					routerPath: '/altumDetail',
				})
			);
		});
		setSquareItems(squareItems);
		setArea(area);
	};

	return (
		<div className={styles.recAlbumlist_container}>
			<div className={styles.head}>
				<h2>{t('home.newAlbum')}</h2>
			</div>
			<div className={styles.nav}>
				<a onClick={selectAreatoAll} className={area == 'ALL' ? styles.active : ''}>
					精彩推荐
				</a>
				{albumAreas.map((item: AlbumArea) => {
					return (
						<a key={item.key} className={area == item.key ? styles.active : ''} onClick={changeArea}>
							{item.value}
						</a>
					);
				})}
				<div className={styles.showAll}>
					<Link to="/allAltumList">{t('home.seeMore')}</Link>
				</div>
			</div>
			<SquareItem squareItems={squareItems}></SquareItem>
		</div>
	);
};

export default RecNewAlbum;
