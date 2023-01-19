import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getMVList } from '@/apis/mv';
import MVItem from '@/components/MVItem';

import styles from './style.module.scss';

const RecMVList: React.FC = () => {
	const { t } = useTranslation();
	const [mvType, setMVType] = useState('');
	const [mvList, setMVList] = useState<MVInfo[]>([]);
	const navList = ['内地', '港台', '欧美', '韩国', '日本'];

	useEffect(() => {
		getRecMV('');
	}, []);

	const changeMVTypeHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
		if (event.currentTarget.text == '精彩推荐') {
			getRecMV('');
		} else {
			getRecMV(event.currentTarget.text);
		}
	};

	const getRecMV = async (mvType: string) => {
		const result = await getMVList(mvType);
		const mvDatas = result.data;

		setMVType(mvType);
		setMVList(mvDatas);
	};

	return (
		<div className={styles.recMVList_container}>
			<div className={styles.head}>
				<h2>MV</h2>
			</div>
			<div className={styles.nav}>
				<a onClick={changeMVTypeHandler} className={mvType == '' ? styles.active : ''}>
					精彩推荐
				</a>
				{navList.map(item => {
					return (
						<a key={item} onClick={changeMVTypeHandler} className={mvType == item ? styles.active : ''}>
							{item}
						</a>
					);
				})}
				<div className={styles.showAll}>
					<Link to="/discover/allMVList">{t('home.seeMore')}</Link>
				</div>
			</div>
			<MVItem mvList={mvList}></MVItem>
		</div>
	);
};

export default RecMVList;
