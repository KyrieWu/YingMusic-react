import React from 'react';

import { timestampToDate } from '@/utils/fonmatDate';

import styles from './style.module.scss';

// interface AltumDetail {
//     album: AlbumInfo,
//     code: number
//     resourceState: boolean
//     songs: SongInfo[]
//   }

type Props = {
	squareItems: SquareItemProps[];
};

const SquareItem: React.FC<Props> = (props: Props) => {
	const { squareItems } = props;
	return (
		<div className={styles.content}>
			{squareItems.map((item: SquareItemProps, index) => {
				return (
					<div className={styles.item} key={index}>
						<div className={styles.play}>
							<div className={styles.playIcon}>
								<img src="https://y.qq.com/ryqq/static/media/cover_play@2x.53a26efb.png?max_age=2592000" alt="cover" />
							</div>
							<div className={styles.img}>
								<img src={item.picUrl} alt={item.name} loading="lazy" />
							</div>
						</div>
						<div className={styles.discription}>
							<a className={styles.des_title} title={item.name}>
								{item.name}
							</a>
							{item.artistName && item.artistId && (
								<a style={{ fontSize: '12px', opacity: '0.7' }}>{item.artistName}</a>
							)}
							{item.playCount && (
								<div className={styles.playcount}>播放量:&nbsp;{(item.playCount / 10000).toFixed(1)}万</div>
							)}
							{item.publishTime && <div className={styles.publishTime}>{timestampToDate(item.publishTime)}</div>}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default SquareItem;
