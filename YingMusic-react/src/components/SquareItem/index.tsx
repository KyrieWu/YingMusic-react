import React, { useState } from 'react';
import Img from '../Img';
import { timestampToDate } from '@/utils/fonmatDate';

import styles from './style.module.scss';
import { Link } from 'react-router-dom';

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
								{item.routerPath ? (
									<Link to={`${item.routerPath}/${item.id}`}>
										<Img src={item.picUrl} name={item.name} />
									</Link>
								) : (
									<Img src={item.picUrl} name={item.name} />
								)}
							</div>
						</div>
						<div className={styles.discription}>
							{item.routerPath ? (
								<Link to={`${item.routerPath}/${item.id}`} className={styles.des_title} title={item.name}>
									{item.name}
								</Link>
							) : (
								<a className={styles.des_title} title={item.name}>
									{item.name}
								</a>
							)}

							{item.artistName && item.artistId && (
								<Link to={`/artistDetail/${item.artistId}`} style={{ fontSize: '12px', opacity: '0.7' }}>
									{item.artistName}
								</Link>
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
