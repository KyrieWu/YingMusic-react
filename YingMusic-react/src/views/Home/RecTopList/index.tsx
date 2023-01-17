import React, { useState, useEffect } from 'react';
import SquareItem from '@/components/SquareItem';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getPlayListTrack, getTopList } from '@/apis';
import styles from './style.module.scss';

const RecTopList = () => {
	const { t } = useTranslation();
	const [topMusicList, setTopMusicList] = useState<Map<string, SongInfo[]>>(new Map());
	const [squareItems, setSquareItems] = useState<SquareItemProps[]>([]);

	// const backColorList = [
	// 	'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
	// 	'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
	// 	'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
	// 	'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
	// 	'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
	// ];

	useEffect(() => {
		getTopMusicList();
	}, []);

	const getTopMusicList = async () => {
		const topMusicList: Map<string, SongInfo[]> = new Map();
		const res = await getTopList();
		const topListInfo = res.list.slice(0, 5);
		for (let i = 0; i < topListInfo.length; i++) {
			const result = await getPlayListTrack(topListInfo[i].id, 20);
			topMusicList.set(topListInfo[i].name, result.songs);
		}
		const squareItems: SquareItemProps[] = [];
		topListInfo.forEach(item => {
			squareItems.push(
				Object.freeze({
					id: item.id,
					picUrl: item.coverImgUrl,
					name: item.name,
				})
			);
		});

		setSquareItems(squareItems);
		setTopMusicList(topMusicList);
	};
	return (
		<div className={styles.toplist_container}>
			<div className={styles.head}>
				<h2>{t('home.charts')}</h2>
				<div className={styles.showAll}>
					<Link to="/allTopList" style={{ letterSpacing: 'normal' }}>
						{t('home.seeMore')}
					</Link>
				</div>
			</div>
			<SquareItem squareItems={squareItems} />
		</div>
	);
};

export default RecTopList;
