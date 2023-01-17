import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getRecPlayList, getReccategoryPlayList } from '@/apis/playlist';
import SquareItem from '@/components/SquareItem';

import styles from './style.module.scss';

const RecPlaylist: React.FC = () => {
	const { t } = useTranslation();
	const [catTag, setCatTag] = useState('');
	const navList = ['华语', '流行', '摇滚', '民谣', '电子'];
	const [squareItems, setSquareItems] = useState<SquareItemProps[]>([]);

	useEffect(() => {
		getPlayListHandler();
	}, []);

	const getCatPlayListHandler = async (event: React.MouseEvent<HTMLAnchorElement>) => {
		const cat = event.currentTarget.text;
		const result = await getReccategoryPlayList(10, cat, 0);
		const playListData = result.playlists;
		const squareItems: SquareItemProps[] = [];
		playListData.forEach(item => {
			squareItems.push(
				Object.freeze({
					id: item.id,
					picUrl: item.coverImgUrl,
					name: item.name,
					routerPath: '/songlistDetail',
				})
			);
		});
		setSquareItems(squareItems);
		setCatTag(cat);

		event.stopPropagation();
	};

	const getPlayListHandler = async () => {
		const result = await getRecPlayList();
		const playListData = result.result;
		const squareItems: SquareItemProps[] = [];
		playListData.forEach(item => {
			squareItems.push(
				Object.freeze({
					id: item.id,
					picUrl: item.picUrl,
					name: item.name,
					routerPath: '/songlistDetail',
				})
			);
		});

		setSquareItems(squareItems);
		setCatTag('为你推荐');
	};

	return (
		<div className={styles.recPlaylist_container}>
			<div className={styles.recPlaylist_head}>
				<h2>{t('home.recommendPlaylist')}</h2>
			</div>
			<div className={styles.recPlaylist_nav}>
				<a className={catTag === '为你推荐' ? styles.active : ''} onClick={getPlayListHandler}>
					精彩推荐
				</a>
				{navList.map(item => {
					return (
						<a className={catTag === item ? styles.active : ''} key={item} onClick={getCatPlayListHandler}>
							{item}
						</a>
					);
				})}
				<div className={styles.showAll}>
					<Link to={'/allPlayList'}>{t('home.seeMore')}</Link>
				</div>
			</div>
			<SquareItem squareItems={squareItems} />
		</div>
	);
};

export default RecPlaylist;
