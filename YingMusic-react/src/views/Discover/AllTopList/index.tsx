import React, { useEffect, useState } from 'react';
import SpinPage from '@/components/Spin';
import { useTranslation } from 'react-i18next';
import { getTopList, getPlayListTrack } from '@/apis';
import { timestampToDate, timestampToTime } from '@/utils/utils';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';

const AllTopList: React.FC = () => {
	const { t } = useTranslation();
	const [cateToplist, setCateTopList] = useState<TopListInfo[]>([]);
	const [toplistInfo, setTopListInfo] = useState<TopListInfo>();
	const [trackInfos, setTrackInfos] = useState<SongInfo[]>([]);

	useEffect(() => {
		gettopList();
	}, []);

	useEffect(() => {
		setTrackInfos([]);
		getTracks();
	}, [toplistInfo]);

	const gettopList = async () => {
		let topLists = await getTopList();
		setCateTopList(topLists.list);
		setTopListInfo(topLists.list[0]);
	};

	const getTracks = async () => {
		if (toplistInfo) {
			let trackLists = await getPlayListTrack(Number(toplistInfo?.id), 50);
			setTrackInfos(trackLists.songs);
		}
	};

	const getImageUrl = (item: any) => {
		let img = item.img1v1Url || item.picUrl || item.coverImgUrl;
		return `${img?.replace('http://', 'https://')}?param=120y120`;
	};
	const getBigImgUrl = (item: any) => {
		let img = item.img1v1Url || item.picUrl || item.coverImgUrl;
		return `${img?.replace('http://', 'https://')}?param=512y512`;
	};

	return (
		<div className={styles.topList_container}>
			<div className={styles.left}>
				<div className={styles.left_content}>
					<h2 className={styles.left_title}>云音乐特色榜</h2>
					<ul className={styles.left_ul}>
						{cateToplist.slice(0, 4).map(item => {
							return (
								<li
									className={`${styles.left_item} ${toplistInfo == item ? styles.active : ''}`}
									key={item.id}
									onClick={() => {
										setTopListInfo(item);
									}}
								>
									<div className={styles.item_left}>
										<img src={getImageUrl(item)} alt={item.name} loading="lazy" />
									</div>
									<div className={styles.item_right}>
										<p className={styles.name}>{item.name}</p>
										<p className={styles.update}>{item.updateFrequency}</p>
									</div>
								</li>
							);
						})}
					</ul>
					<h2 className={styles.left_title}>全球媒体榜</h2>
					<ul className={styles.left_ul}>
						{cateToplist.slice(4).map(item => {
							return (
								<li
									className={`${styles.left_item} ${toplistInfo == item ? styles.active : ''}`}
									key={item.id}
									onClick={() => {
										setTopListInfo(item);
									}}
								>
									<div className={styles.item_left}>
										<img src={getImageUrl(item)} alt={item.name} loading="lazy" />
									</div>
									<div className={styles.item_right}>
										<p className={styles.name}>{item.name}</p>
										<p className={styles.update}>{item.updateFrequency}</p>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.playlist_main}>
					<div className={styles.playlist_img}>
						<img src={toplistInfo && getBigImgUrl(toplistInfo)} alt={toplistInfo?.name} />
					</div>
					<div className={styles.playlist_detail}>
						<div className={styles.title}>
							<h1>{toplistInfo?.name}</h1>
						</div>
						<ul className={styles.data_info}>
							<li className={styles.data_info_item}>
								<div className={styles.data_tag_box} style={{ color: 'var(--color-text)' }}>
									最近更新:&nbsp;
									{timestampToDate(toplistInfo?.updateTime)}&nbsp;({toplistInfo?.updateFrequency})
								</div>
							</li>
						</ul>
						<div className={styles.data_actions}>
							<a className={styles.mod_btn_green}>
								<i className={styles.mod_btn_green__icon_play}></i>
								<span>播放全部</span>
							</a>
							<a className={styles.mod_btn}>
								<i className={styles.mod_btn__icon_like}></i>
								<span>添加到歌单</span>
							</a>
						</div>
					</div>
				</div>
				<div className={styles.detail_layout}>
					{trackInfos.length === 0 ? (
						<SpinPage />
					) : (
						<div className={styles.detail_layout__main}>
							<div className={styles.mod_songlist}>
								<ul className={styles.songlist__header}>
									<li className={styles.songlist__header_empty}></li>
									<li className={styles.songlist__header_empty}></li>
									<li className={styles.songlist__header_name}>{t('songItem.songName')}</li>
									<li className={styles.songlist__header_author}>{t('songItem.singer')}</li>
									<li className={styles.songlist__header_time}>{t('songItem.songTime')}</li>
								</ul>
								<ul className={styles.songlist__list}>
									{trackInfos.map((item, index) => {
										return (
											<li key={item.id}>
												<div className={styles.songlist__item}>
													<div className={styles.songlist__number}>{index + 1}</div>
													<div className={styles.songlist_play}>
														<a
															className={`${styles.list_menu__item} ${styles.list_menu__play}`}
															title={`${t('songItem.play')}`}
														>
															<i className={styles.list_menu__icon_play}></i>
														</a>
													</div>
													<div className={styles.songlist__songname}>
														<img className={styles.song_icon} src={getImageUrl(item.al)} loading="lazy" />
														<span className={styles.songlist__songname_txt}>{item.name}</span>
													</div>
													<div className={styles.songlist__artist}>
														<Link
															to={`/artistDetail/${item.ar[0].id}`}
															className={styles.playlist__author}
															title={item.ar[0].name}
														>
															{item.ar[0].name}
														</Link>
													</div>
													<div className={styles.songlist__time}>{timestampToTime(item.dt)}</div>
													<div className={styles.songlist_add}>
														<a
															className={`${styles.list_menu__item} ${styles.list_menu__add}`}
															title={`${t('songItem.add')}`}
														>
															{' '}
															<i className={styles.list_menu__icon_add}></i>
														</a>
													</div>
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AllTopList;
