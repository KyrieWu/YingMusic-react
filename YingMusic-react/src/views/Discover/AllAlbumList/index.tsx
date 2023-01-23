import React, { useState, useEffect } from 'react';
import SquareItem from '@/components/SquareItem';
import LoadMore from '@/components/LoadMore';
import { getNewAlbum } from '@/apis';
import styles from './style.module.scss';

interface AlbumArea {
	ALL: string;
	ZH: string;
	EA: string;
	KR: string;
	JP: string;
}

interface Albums {
	albums: AlbumInfo[];
	code: number;
	total: number;
}

const areaArr = [
	['ALL', '全部'],
	['ZH', '华语'],
	['EA', '欧美'],
	['KR', '韩国'],
	['JP', '日本'],
];

const AllAlbum: React.FC = () => {
	const [area, setArea] = useState('ALL');
	const [squareItems, setSquareItems] = useState<SquareItemProps[]>([]);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		setOffset(0);
		getAlbumS();
	}, [area]);

	useEffect(() => {
		offset > 0 && getAlbumS();
	}, [offset]);

	const loadMoreSquareItemHandler = () => {
		setOffset(offset + 1);
	};

	const getAlbumS = async () => {
		let res = (await getNewAlbum(area, 30, offset)) as unknown as Albums;

		addSquareItem(res.albums);
	};

	const addSquareItem = (albums: AlbumInfo[]) => {
		let squareArr: SquareItemProps[] = [];
		albums.forEach(item => {
			squareArr.push(
				Object.freeze({
					id: item.id,
					picUrl: item.picUrl,
					name: item.name,
					artistId: item.artist.id,
					artistName: item.artist.name,
					routerPath: '/albumDetail',
					publishTime: item.publishTime,
				})
			);
		});
		offset == 0 ? setSquareItems(squareArr) : setSquareItems([...squareItems, ...squareArr]);
	};

	return (
		<div className={styles.allAlbum_container}>
			<div className={styles.head}>
				<div className={styles.panel}>
					<div className={styles.categorie_content}>
						<div className={styles.categories_list}>
							{areaArr.map(item => {
								return (
									<div className={styles.item} key={item[0]}>
										<a
											className={`${styles.item_name} ${area === item[0] ? styles.active : ''}`}
											onClick={() => setArea(item[0])}
										>
											{item[1]}
										</a>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.album_content}>
				<div className={styles.title}>全部新碟:</div>
				<SquareItem squareItems={squareItems} />
			</div>
			<div>
				<LoadMore clickHandler={loadMoreSquareItemHandler} />
			</div>
		</div>
	);
};

export default AllAlbum;
