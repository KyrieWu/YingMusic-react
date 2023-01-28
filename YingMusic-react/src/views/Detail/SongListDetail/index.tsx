import React, { useState, useEffect, useRef } from 'react';
import SquareItem from '@/components/SquareItem';
import { Pagination, PaginationProps, Modal } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getSongListInfo, getRelatedPlayList } from '@/apis';
import { timestampToTime } from '@/utils/utils';
import styles from './style.module.scss';

interface relatedPlaylist {
	code: number;
	playlists: playlistsdata[];
}

interface playlistsdata {
	coverImgUrl: string;
	creator: creator;
	id: string;
	name: string;
}

interface creator {
	userId: string;
	nickname: string;
}

const SongListDetail: React.FC = () => {
	const { t } = useTranslation();

	const { id } = useParams();
	const [playListData, setPlayListData] = useState({} as ReccategoryPlaylistInfo);
	const [trackInfos, setTrackInfos] = useState<SongInfo[]>([]);
	const [squareItems, setSquareItems] = useState<SquareItemProps[]>([]);
	const [playlistlikestatus, setPlaylistlikestatus] = useState(1);
	const [prev, setPrev] = useState(0);
	const [next, setNext] = useState(10);
	const [current, setCurrent] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		getsongLists(Number(id));
		getrelatedPlayLists(Number(id));
	}, [id]);

	const getsongLists = async (id: number) => {
		let res = await getSongListInfo(id);
		let playListData = res.playlist;
		setPlayListData(playListData);
		let trackInfos: SongInfo[] = [];
		playListData.tracks?.forEach((item: SongInfo) => {
			trackInfos.push(item);
		});
		setTrackInfos(trackInfos);
	};

	const getrelatedPlayLists = async (id: number) => {
		let res = (await getRelatedPlayList(id)) as unknown as relatedPlaylist;
		let squareItems: SquareItemProps[] = [];
		res.playlists?.slice(0, 5).forEach((item: any) => {
			squareItems.push(
				Object.freeze({
					id: item.id,
					name: item.name,
					picUrl: item.coverImgUrl,
					routerPath: '/songlistDetail',
				})
			);
		});
		setSquareItems(squareItems);
	};

	const getImageUrl = (item: any) => {
		let img = item.img1v1Url || item.picUrl || item.coverImgUrl;
		return `${img?.replace('http://', 'https://')}?param=512y512`;
	};

	const onChange: PaginationProps['onChange'] = page => {
		setCurrent(page);
		setPrev((page - 1) * 10);
		setNext(page * 10);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const playSong = (item: SongInfo) => {
		dispatch({ type: 'playSong', val: item });
	};

	return (
		<>
			<div className={styles.playlistDetail_container}>
				<div className={styles.playlist_main}>
					<div className={styles.playlist_img}>
						<img src={getImageUrl(playListData)} alt={playListData.name} />
					</div>
					<div className={styles.playlist_detail}>
						<div className={styles.title}>
							<h1>{playListData.name}</h1>
						</div>
						<div className={styles.art}>
							<i className={styles.icon_singer}></i>
						</div>
						<ul className={styles.data_info}>
							<li className={styles.data_info_item}>
								<div className={styles.data_tag_box}>
									标签:&nbsp;
									{playListData.tags?.map((item, index) => {
										return (
											<a className={styles.data_info_tags} key={index}>
												{item}
											</a>
										);
									})}
								</div>
							</li>
							<li className={styles.data_info_item}>
								<div className={styles.data_tag_box}>播放量:&nbsp; {(playListData.playCount / 10000).toFixed(1)}万</div>
							</li>
							<li className={styles.data_info_item}>
								<div className={styles.data_tag_box}>
									收藏量:&nbsp;
									{(playListData.subscribedCount / 10000).toFixed(1)}万
								</div>
							</li>
						</ul>
						<div className={styles.mod_about}>
							<h3 className={styles.about_tit}>简介:</h3>
							<div className={styles.about_cont} onClick={showModal}>
								{playListData.description}
							</div>
						</div>

						<div className={styles.data_actions}>
							<a className={styles.mod_btn_green}>
								<i className={styles.mod_btn_green__icon_play}></i>
								<span>播放全部</span>
							</a>
							<a className={styles.mod_btn}>
								<i className={styles.mod_btn__icon_like}></i>
								<span>收藏</span>
							</a>
						</div>
					</div>
				</div>
				<div className={styles.detail_layout}>
					<div className={styles.detail_layout__main}>
						<div className={styles.mod_songlist}>
							<ul className={styles.songlist__header}>
								<li className={styles.songlist__header_empty}></li>
								<li className={styles.songlist__header_name}>{t('songItem.songName')}</li>
								<li className={styles.songlist__header_author}>{t('songItem.singer')}</li>
								<li className={styles.songlist__header_album}>{t('songItem.album')}</li>
								<li className={styles.songlist__header_time}>{t('songItem.songTime')}</li>
							</ul>
							<ul className={styles.songlist__list}>
								{trackInfos.slice(prev, next).map((item, index) => {
									return (
										<li key={item.id}>
											<div className={styles.songlist__item}>
												<div className={styles.songlist__number}>{prev + index + 1}</div>
												<div className={styles.songlist__play}>
													<a
														className={`${styles.list_menu__item} ${styles.list_menu__play}`}
														title={`${t('songItem.play')}`}
														onClick={() => playSong(item)}
													>
														<i className={styles.list_menu__icon_play}></i>
													</a>
												</div>
												<div className={styles.songlist__songname}>
													<span className={styles.songlist__songname_txt}>{item.name}</span>
												</div>
												<div className={styles.songlist__artist}>
													<Link
														to={`/artistDetail/ ${item.ar[0].id}`}
														className={styles.playlist__author}
														title={item.ar[0].name}
													>
														{item.ar[0].name}
													</Link>
												</div>
												<div className={styles.songlist__album}>
													<Link to={`/albumDetail/${item.al.id}`} title={item.al.name}>
														{item.al.name}
													</Link>
												</div>
												<div className={styles.songlist__time}>{timestampToTime(item.dt)}</div>
												<div className={styles.songlist__add}>
													<a
														className={`${styles.list_menu__item} ${styles.list_menu__add}`}
														title={`${t('songItem.add')}`}
													>
														<i className={styles.list_menu__icon_add}></i>
													</a>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
						{trackInfos.length > 10 && (
							<div className={styles.songlist_pagination}>
								<Pagination
									className={'pagination'}
									current={current}
									onChange={onChange}
									total={trackInfos.length}
									responsive={true}
								/>
							</div>
						)}
					</div>
				</div>
				<div className={styles.related_playlist}>
					<div className={styles.title}>{t('songListDetail.similarPlaylist')}:</div>
					<SquareItem squareItems={squareItems}></SquareItem>
				</div>
			</div>
			<Modal title={t('playlist.playlistDesc')} centered open={isModalOpen} onCancel={handleCancel} footer={null}>
				{playListData.description}
			</Modal>
		</>
	);
};

export default SongListDetail;
