import React, { useState, useEffect } from 'react';
import SquareItem from '@/components/SquareItem';
import { Pagination, PaginationProps, Modal } from 'antd';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getArtistDetail, getArtistHotSong, getSimitArtist, getArtAlbum, getArtistMV } from '@/apis';
import { timestampToTime } from '@/utils/utils';
import styles from './style.module.scss';
import './pagination.less';
import MVItem, { MVProps } from '@/components/MVItem';

interface HotSong {
	artist: object;
	code: number;
	hotSongs: SongInfo[];
	more: boolean;
}

interface ArtistMv {
	code: number;
	hasMore: boolean;
	mvs: ArtistMvInfo[];
	time: number;
}

interface ArtistAlbum {
	artist: object;
	code: number;
	hotAlbums: AlbumInfo[];
	more: boolean;
}

interface SimitArtist {
	artists: ArtistsInfo[];
	code: number;
}

interface ArtDetailData {
	artist: ArtistsInfo;
	blacklist: boolean;
	identify: {
		actionUrl: string;
		imageDesc: string;
		imageUrl?: string;
	};
	preferShow: number;
	secondaryExpertIdentiy: [];
	showPriMsg: boolean;
	videoCount: number;
}

const ArtistDetail: React.FC = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const [artistData, setArtistData] = useState({} as ArtDetailData);
	const [trackInfos, setTrackInfos] = useState<SongInfo[]>([]);
	const [squareItems, setSquareItems] = useState<SquareItemProps[]>([]);
	const [mvList, setMvList] = useState<MVProps[]>([]);
	const [simiartistsInfos, useSimiartistInfos] = useState<ArtistsInfo[]>([]);
	const [songListPrev, setSongListPrev] = useState(0);
	const [songListNext, setSongListNext] = useState(10);
	const [mvListPrev, setMVListPrev] = useState(0);
	const [mvListNext, setMVListNext] = useState(10);
	const [albumListPrev, setAlbumListPrev] = useState(0);
	const [albumListNext, setAlbumListNext] = useState(10);
	const [songListCurrent, setSongListCurrent] = useState(1);
	const [mvListCurrent, setMVListCurrent] = useState(1);
	const [albumListCurrent, setAlbumListCurrent] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		getArtDetail(Number(id));
		getArtHotSong(Number(id));
		getArtMV(Number(id));
		getArtAlbums(Number(id));
		//getsimitArtist(Number(id));
	}, [id]);

	const getArtDetail = async (id: number) => {
		let res = await getArtistDetail(id);
		setArtistData(res.data);
	};

	const getArtHotSong = async (id: number) => {
		let res2 = (await getArtistHotSong(id)) as unknown as HotSong;
		let hotSongDetail = res2.hotSongs;
		setTrackInfos(hotSongDetail);
	};

	const getArtMV = async (id: number) => {
		let artMV = (await getArtistMV(id, 1000, 0)) as unknown as ArtistMv;
		let mvList: MVProps[] = [];
		artMV.mvs.forEach(item => {
			mvList.push(
				Object.freeze({
					id: item.id,
					name: item.name,
					picUrl: item.imgurl,
					artistId: item.artist?.id,
					playCount: item.playCount,
				})
			);
		});
		setMvList(mvList);
	};

	const getArtAlbums = async (id: number) => {
		let res = (await getArtAlbum(id, 1000, 0)) as unknown as ArtistAlbum;
		let squareItems: SquareItemProps[] = [];
		res.hotAlbums.forEach(item => {
			squareItems.push(
				Object.freeze({
					id: item.id,
					name: item.name,
					picUrl: item.picUrl,
					routerPath: '/albumDetail',
					artistId: item.artist.id,
					publishTime: item.publishTime,
				})
			);
		});
		setSquareItems(squareItems);
	};

	const getImageUrl = (item: any) => {
		if (item.img1v1Url) {
			let img1v1ID = item.img1v1Url.split('/');
			img1v1ID = img1v1ID[img1v1ID.length - 1];
			if (img1v1ID === '5639395138885805.jpg') {
				// 没有头像的歌手，网易云返回的img1v1Url并不是正方形的 😅😅😅
				return 'https://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=512y512';
			}
		}
		let img = item.img1v1Url || item.picUrl || item.coverImgUrl || item.cover;
		return `${img?.replace('http://', 'https://')}?param=512y512`;
	};

	const onSongListChange: PaginationProps['onChange'] = page => {
		setSongListCurrent(page);
		setSongListPrev((page - 1) * 10);
		setSongListNext(page * 10);
	};

	const onMVListChange: PaginationProps['onChange'] = page => {
		setMVListCurrent(page);
		setMVListPrev((page - 1) * 10);
		setMVListNext(page * 10);
	};

	const onAlbumListChange: PaginationProps['onChange'] = page => {
		setAlbumListCurrent(page);
		setAlbumListPrev((page - 1) * 10);
		setAlbumListNext(page * 10);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const playSong = (item: SongInfo) => {
		dispatch({ type: 'playSong', val: item });
	};

	const playAllSong = (songs: SongInfo[]): void => {
		dispatch({ type: 'updatePlayList', val: songs });
	};

	const addToPlaylist = (song: SongInfo) => {
		dispatch({ type: 'addToPlayList', val: song });
	};

	// const getsimitArtist = async (id: number) => {
	// 	if (store.state.isLogin) {
	// 		let res = (await getSimitArtist(id)) as unknown as SimitArtist;
	// 		simiartistsInfos.value = res.artists.slice(0, 6);
	// 	}
	// };

	return (
		<>
			<div className={styles.artistDetail_container}>
				<div className={styles.artist_main}>
					<div className={styles.artist_img}>
						<img src={artistData.artist && getImageUrl(artistData.artist)} alt={artistData.artist?.name} />
					</div>
					<div className={styles.artist_detail}>
						<div className={styles.title}>
							<h1>{artistData.artist?.name}</h1>
						</div>
						<div className={styles.art}>
							<i className={styles.icon_singer}></i>
						</div>
						<ul className={styles.data_info}>
							<li className={styles.data_info_item}>
								<div className={styles.data_tag_box}>
									职业:&nbsp;<a className={styles.data_info_tags}>{artistData.identify?.imageDesc}</a>
								</div>
							</li>
							<li className={styles.data_info_item}>
								<div className={styles.data_tag_box}>
									单曲:&nbsp;
									<a className={styles.data_info_tags}>{artistData.artist?.musicSize}</a>
								</div>
							</li>
							<li className={styles.data_info_item}>
								<div className={styles.data_tag_box}>
									专辑:&nbsp; <a className={styles.data_info_tags}>{artistData.artist?.albumSize}</a>
								</div>
							</li>
						</ul>
						<div className={styles.mod_about}>
							<h3 className={styles.about_tit}>简介:</h3>
							<div className={styles.about_cont} onClick={showModal}>
								{artistData.artist?.briefDesc}
							</div>
						</div>
						<div className={styles.data_actions}>
							<a className={styles.mod_btn_green} onClick={() => playAllSong(trackInfos)}>
								<i className={styles.mod_btn_green__icon_play}></i>
								<span>{t('artist.playAllPopularSongs')}</span>
							</a>
							<a className={styles.mod_btn}>
								<UserAddOutlined className={styles.mod_btn__icon_like} />
								<span>{t('artist.follow')}</span>
							</a>
						</div>
					</div>
				</div>
				<div className={styles.detail_layout}>
					<div className={styles.title}>{t('artist.popularSongs')}:</div>
					<div className={styles.detail_layout__main}>
						<div className={styles.mod_songlist}>
							<ul className={styles.songlist__header}>
								<li className={styles.songlist__header_empty}></li>
								<li className={styles.songlist__header_name}>{t('songItem.songName')}</li>
								<li className={styles.songlist__header_album}>{t('songItem.album')}</li>
								<li className={styles.songlist__header_time}>{t('songItem.songTime')}</li>
							</ul>
							<ul className={styles.songlist__list}>
								{trackInfos.slice(songListPrev, songListNext).map((item, index) => {
									return (
										<li key={item.id}>
											<div className={styles.songlist__item}>
												<div className={styles.songlist__number}>{songListPrev + index + 1}</div>
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
														onClick={() => addToPlaylist(item)}
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
							<div className={styles.songlist_pagination + ' pagination '}>
								<Pagination
									current={songListCurrent}
									onChange={onSongListChange}
									total={trackInfos.length}
									responsive={true}
									showSizeChanger={false}
								/>
							</div>
						)}
					</div>
				</div>
				{mvList.length > 0 && (
					<div className={styles.related_playlist}>
						<div className={styles.title}>{'MVs'}:</div>
						<MVItem mvList={mvList.slice(mvListPrev, mvListNext)} />
						{mvList.length > 10 && (
							<div style={{ textAlign: 'center' }}>
								<Pagination
									className={'pagination'}
									current={mvListCurrent}
									onChange={onMVListChange}
									total={mvList.length}
									responsive={true}
									showSizeChanger={false}
								/>
							</div>
						)}
					</div>
				)}
				{squareItems.length > 0 && (
					<div className={styles.related_playlist}>
						<div className={styles.title}>{t('profile.albums')}:</div>
						<SquareItem squareItems={squareItems.slice(albumListPrev, albumListNext)}></SquareItem>
						{squareItems.length > 10 && (
							<div style={{ textAlign: 'center' }}>
								<Pagination
									className={'pagination'}
									current={albumListCurrent}
									onChange={onAlbumListChange}
									total={squareItems.length}
									responsive={true}
									showSizeChanger={false}
								/>
							</div>
						)}
					</div>
				)}
			</div>
			<Modal title={t('artist.artistDesc')} open={isModalOpen} centered onCancel={handleCancel} footer={null}>
				{artistData.artist?.briefDesc}
			</Modal>
		</>
	);
};

export default ArtistDetail;
