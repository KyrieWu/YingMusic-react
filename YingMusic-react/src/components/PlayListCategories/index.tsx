import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getPlayListCategory } from '@/apis/playlist';

import styles from './style.module.scss';

interface Categorie {
	all: object;
	categories: Categories;
	code: number;
	sub: CategorieInfo[];
}
interface Categories {
	'0': string;
	'1': string;
	'2': string;
	'3': string;
	'4': string;
}

const PlayListCategories: React.FC = () => {
	const [cat, setCat] = useState('全部');
	const [isOpen, setIsOpen] = useState(false);
	const [categories, setCategories] = useState({} as Categories);
	const [categorieItems, setCategorieItems] = useState<CategorieInfo[]>([]);
	const { playListCat } = useSelector((state: RootType) => ({
		playListCat: state.handlePlayList.playListCat,
	}));
	// 通过useDispath修改仓库
	const dispatch = useDispatch();

	useEffect(() => {
		getCategories();
		dispatch({ type: 'updatePlayListCat', val: '全部' });
	}, []);

	const getCategories = async () => {
		const res = (await getPlayListCategory()) as unknown as Categorie;
		const categories = res.categories;
		const categorieItems = res.sub;
		setCategories(categories);
		setCategorieItems(categorieItems);
	};

	const updateCat = (event: React.MouseEvent<HTMLAnchorElement>) => {
		dispatch({ type: 'updatePlayListCat', val: event.currentTarget.text });
	};

	const findItem = (index: any): CategorieInfo[] => {
		index = Number(index);
		const items: CategorieInfo[] = categorieItems.filter((item: CategorieInfo) => item.category == index);
		return items;
	};

	return (
		<div className={styles.categorie_container}>
			<div
				className={`${styles.head} ${playListCat === '全部' ? styles.active : ''}`}
				onClick={() => {
					dispatch({ type: 'updatePlayListCat', val: '全部' });
				}}
			>
				全部
			</div>
			<div onClick={() => setIsOpen(!isOpen)} className={`${styles.open_btn} ${isOpen === true ? styles.active : ''}`}>
				...
			</div>
			{isOpen && (
				<div className={styles.panel}>
					{Object.values(categories).map((item: string, index: number) => {
						return (
							<div className={styles.categorie_content} key={index}>
								<div className={styles.categories}>{item}</div>
								<div className={styles.categories_list}>
									{findItem(index).map(item2 => {
										return (
											<div className={styles.item} key={item2.name}>
												<a
													className={`${styles.item_name} ${playListCat === `${item2.name}` ? styles.active : ''}`}
													onClick={updateCat}
												>
													{item2.name}
												</a>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default PlayListCategories;
