import React, { useState, useEffect } from 'react';
import RoundItem from '@/components/RoundItem';
import LoadMore from '@/components/LoadMore';
import SpinPage from '@/components/Spin';
import { Initial, TypeKey, TypeValue, AreaValue, AreeKey } from '@/utils/cateArtistInfo';
import { getCateArtist } from '@/apis/artists';
import nProgress from 'nprogress';
import styles from './styles.module.scss';

const AllArtists: React.FC = () => {
	const [artistsInfos, setArtistsInfos] = useState<ArtistsInfo[]>([]);
	const [type, setType] = useState(-1);
	const [area, setArea] = useState(-1);
	const [init, setinit] = useState('-1');
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		setOffset(0);
		setArtistsInfos([]);
		getArtists();
	}, [type, area, init]);

	useEffect(() => {
		offset > 0 && getArtists();
	}, [offset]);

	const loadMoreSquareItemHandler = () => {
		setOffset(offset + 1);
	};

	let getArtists = async () => {
		nProgress.start();
		let res = await getCateArtist(type, area, init, offset);
		let artistsArr: ArtistsInfo[] = [];
		res.artists.forEach(item => {
			artistsArr.push(Object.freeze(item));
		});
		offset == 0 ? setArtistsInfos(artistsArr) : setArtistsInfos([...artistsInfos, ...artistsArr]);
		nProgress.done();
	};

	return (
		<div className={styles.allartists_container}>
			<div className={styles.head}>
				<div className={styles.panel}>
					<div className={styles.categorie_content}>
						<div className={styles.categories_list}>
							<div className={styles.item}>
								<a
									className={`${styles.item_name} ${init === '-1' ? styles.active : ''}`}
									onClick={() => setinit('-1')}
								>
									热门
								</a>
							</div>
							{Initial.map((item, index) => {
								return (
									<div className={styles.item} key={index}>
										<a
											className={`${styles.item_name} ${init === `${item}` ? styles.active : ''}`}
											onClick={() => setinit(`${item}`)}
										>
											{item}
										</a>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className={styles.panel}>
					<div className={styles.categorie_content}>
						<div className={styles.categories_list}>
							{TypeValue.map((item, index) => {
								return (
									<div className={styles.item} style={{ marginRight: '2rem' }} key={index}>
										<a
											className={`${styles.item_name} ${type === TypeKey[index] ? styles.active : ''}`}
											onClick={() => setType(TypeKey[index])}
										>
											{item}
										</a>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className={styles.panel}>
					<div className={styles.categorie_content}>
						<div className={styles.categories_list}>
							{AreaValue.map((item, index) => {
								return (
									<div className={styles.item} style={{ marginRight: '2rem' }} key={index}>
										<a
											className={`${styles.item_name} ${area === AreeKey[index] ? styles.active : ''}`}
											onClick={() => setArea(AreeKey[index])}
										>
											{item}
										</a>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				{artistsInfos.length == 0 ? <SpinPage /> : <RoundItem artistsInfos={artistsInfos}></RoundItem>}
			</div>
			<div>{artistsInfos.length !== 0 && <LoadMore clickHandler={loadMoreSquareItemHandler} />}</div>
		</div>
	);
};

export default AllArtists;
