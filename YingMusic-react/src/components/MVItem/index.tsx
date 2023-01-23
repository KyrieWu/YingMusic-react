import React from 'react';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';

export interface MVProps {
	id: number;
	name: string;
	picUrl: string;
	artistId: number;
	artistName?: string;
	playCount?: number;
}

type Props = {
	mvList: MVInfo[] | MVProps[];
};

const MVItem: React.FC<Props> = (props: Props) => {
	const { mvList } = props;
	const getImageUrl = (mv: any) => {
		let url = mv.imgurl16v9 ?? mv.cover ?? mv.coverUrl ?? mv.picUrl;
		return url?.replace('http:', 'https:') + '?param=464y260';
	};

	return (
		<div className={styles.content}>
			{mvList.map((item, index) => {
				return (
					<div className={styles.item} key={index}>
						<Link to={`/mvDetail/${item.id} `}>
							<div className={styles.play}>
								<div className={styles.playIcon}>
									<img src="https://y.qq.com/ryqq/static/media/cover_play@2x.53a26efb.png?max_age=2592000" alt="" />
								</div>
								<div className={styles.img}>
									<img src={getImageUrl(item)} alt={item.name} loading="lazy" />
								</div>
							</div>
						</Link>

						<div className={styles.discription}>
							<Link className={styles.des_title} to={`/mvDetail/ ${item.id}`} title={item.name}>
								{item.name}
							</Link>
							{item.artistName && (
								<Link to={`/artistDetail/${item.artistId}`} style={{ fontSize: '12px', opacity: '0.7' }}>
									{item.artistName}
								</Link>
							)}
							{item.playCount && (
								<div className={styles.playCount}>
									<span>播放量:&nbsp;{(item.playCount / 10000).toFixed(1)}万</span>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default MVItem;
