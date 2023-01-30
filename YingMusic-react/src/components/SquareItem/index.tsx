import React, { useState } from 'react';
import { timestampToDate } from '@/utils/fonmatDate';
import { useDispatch } from 'react-redux';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { getAltumDetail, getPlayListTrack, getSongListInfo } from '@/apis';

interface AltumDetail {
	album: AlbumInfo;
	code: number;
	resourceState: boolean;
	songs: SongInfo[];
}

type Props = {
	squareItems: SquareItemProps[];
};

const SquareItem: React.FC<Props> = (props: Props) => {
	const { squareItems } = props;
	const dispatch = useDispatch();

	const getImageUrl = (item: any) => {
		let img = item.img1v1Url || item.picUrl || item.coverImgUrl;
		return `${img?.replace('http://', 'https://')}?param=512y512`;
	};

	const playAllSong = async (item: SquareItemProps) => {
		let trackInfos: SongInfo[] = [];
		switch (item.type) {
			case 'songlist':
				let playlistRes = await getSongListInfo(item.id);
				trackInfos = playlistRes.playlist.tracks;
				break;
			case 'album':
				let albumRes = (await getAltumDetail(item.id)) as unknown as AltumDetail;
				trackInfos = albumRes.songs;
				break;
			case 'toplist':
				const result = await getPlayListTrack(item.id, 50);
				trackInfos = result.songs;
				break;
			default:
				break;
		}

		dispatch({ type: 'updatePlayList', val: trackInfos });
	};

	return (
		<div className={styles.content}>
			{squareItems.map((item: SquareItemProps, index) => {
				return (
					<div className={styles.item} key={index}>
						<div className={styles.play}>
							<div className={styles.playIcon} onClick={() => playAllSong(item)}>
								<img src="https://y.qq.com/ryqq/static/media/cover_play@2x.53a26efb.png?max_age=2592000" alt="cover" />
							</div>
							<div className={styles.img}>
								{item.routerPath ? (
									<Link to={`${item.routerPath}/${item.id}`}>
										<img src={getImageUrl(item)} alt={item.name} />
									</Link>
								) : (
									<img src={getImageUrl(item)} alt={item.name} />
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
