import React, { useState, useEffect } from 'react';
import MVItem, { MVProps } from '@/components/MVItem';
import LoadMore from '@/components/LoadMore';
import SpinPage from '@/components/Spin';
import { getAllMV } from '@/apis';
import styles from './style.module.scss';
import nProgress from 'nprogress';

const mvArea = ['内地', '港台', '欧美', '日本', '韩国'];
const mvType = ['官方版', '现场版', '网易出品'];
const mvOrder = ['最热', '最新'];
interface ALLMvResult {
	code: number;
	count: number;
	data: MVInfo[];
	hasMore: boolean;
}

const AllMvList: React.FC = () => {
	const [area, setArea] = useState('');
	const [type, setType] = useState('');
	const [order, setOrder] = useState('');
	const [mvList, setMvList] = useState<MVInfo[]>([]);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		setOffset(0);
		setMvList([]);
		getMVS();
	}, [type, area, order]);

	useEffect(() => {
		offset > 0 && getMVS();
	}, [offset]);

	const loadMoreSquareItemHandler = () => {
		setOffset(offset + 1);
	};

	const getMVS = async () => {
		nProgress.start();
		let res = (await getAllMV(area, type, order, offset)) as unknown as ALLMvResult;

		let artistmvs = res.data;
		offset == 0 ? setMvList(artistmvs) : setMvList([...mvList, ...artistmvs]);
		nProgress.done();
	};

	return (
		<div className={styles.allMV_container}>
			<div className={styles.head}>
				<div className={styles.panel}>
					<div className={styles.categorie_content}>
						<div className={styles.categories}>地区</div>
						<div className={styles.categories_list}>
							<div className={styles.item}>
								<a className={`${styles.item_name} ${area === '' ? styles.active : ''}`} onClick={() => setArea('')}>
									热门
								</a>
							</div>
							<div className={styles.item}>
								{mvArea.map((item, index) => {
									return (
										<a
											className={`${styles.item_name} ${area === `${item}` ? styles.active : ''}`}
											key={index}
											onClick={() => setArea(item)}
										>
											{item}
										</a>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.panel}>
					<div className={styles.categorie_content}>
						<div className={styles.categories}>分类</div>
						<div className={styles.categories_list}>
							<div className={styles.item}>
								<a className={`${styles.item_name} ${type === '' ? styles.active : ''}`} onClick={() => setType('')}>
									热门
								</a>
							</div>
							<div className={styles.item}>
								{mvType.map((item, index) => {
									return (
										<a
											className={`${styles.item_name} ${type === `${item}` ? styles.active : ''}`}
											key={index}
											onClick={() => setType(item)}
										>
											{item}
										</a>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.order_panel}>
					<div className={`${styles.order} ${order == '' ? styles.active : ''}`} onClick={() => setOrder('')}>
						上升最快
					</div>
					{mvOrder.map((item, index) => {
						return (
							<div
								className={`${styles.order} ${order == item ? styles.active : ''}`}
								key={index}
								onClick={() => setOrder(item)}
							>
								{item}
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.title}>全部MV:</div>
				{mvList.length === 0 ? <SpinPage /> : <MVItem mvList={mvList}></MVItem>}
			</div>
			<div>{mvList.length !== 0 && <LoadMore clickHandler={loadMoreSquareItemHandler} />}</div>
		</div>
	);
};

export default AllMvList;
