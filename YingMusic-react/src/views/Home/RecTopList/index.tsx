import React, { useState, useEffect } from 'react';
import SquareItem from '@/components/SquareItem';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getPlayListTrack, getTopList } from '@/apis';
import styles from './style.module.scss';

const RecTopList = () => {
	const { t } = useTranslation();
	const [squareItems, setSquareItems] = useState<SquareItemProps[]>([]);

	useEffect(() => {
		getTopMusicList();
	}, []);

	const getTopMusicList = async () => {
		const res = await getTopList();
		const topListInfo = res.list.slice(0, 5);
		const squareItems: SquareItemProps[] = [];
		topListInfo.forEach(item => {
			squareItems.push(
				Object.freeze({
					id: item.id,
					type: 'toplist',
					picUrl: item.coverImgUrl,
					name: item.name,
				})
			);
		});

		setSquareItems(squareItems);
	};

	return (
		<div className={styles.toplist_container}>
			<div className={styles.head}>
				<h2>{t('home.charts')}</h2>
				<div className={styles.showAll}>
					<Link to="/discover/allTopList" style={{ letterSpacing: 'normal' }}>
						{t('home.seeMore')}
					</Link>
				</div>
			</div>
			<SquareItem squareItems={squareItems} />
		</div>
	);
};

export default RecTopList;
