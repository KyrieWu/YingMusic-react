import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { getAltumDetail } from '@/apis';
import { timestampToTime, timestampToDate } from '@/utils/utils';
import styles from './style.module.scss';
import nProgress from 'nprogress';

interface AltumDetailResult {
	album: AlbumInfo;
	code: number;
	resourceState: boolean;
	songs: SongInfo[];
}

const AlbumDetail: React.FC = () => {
	const { t } = useTranslation();
	const navigateTo = useNavigate();
	const { id } = useParams();
	const [albumInfo, setAlbumInfo] = useState({} as AlbumInfo);
	const [trackInfos, setTrackInfos] = useState<SongInfo[]>([]);
	const [playlistlikestatus, setPlaylistlikestatus] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		nProgress.start();

		getsongLists(Number(id));
	}, [id]);

	const getsongLists = async (id: number) => {
		let res = (await getAltumDetail(id)) as unknown as AltumDetailResult;
		let albumInfo = res.album;
		let trackInfos = res.songs;
		setAlbumInfo(albumInfo);
		setTrackInfos(trackInfos);
		nProgress.done();
	};

	const getImageUrl = (item: any) => {
		let img = item.img1v1Url || item.picUrl || item.coverImgUrl;
		return `${img?.replace('http://', 'https://')}?param=512y512`;
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

	return (
		<>
			<div className={styles.albumDetail_container}>
				<div className={styles.album_main}>
					<div className={styles.album_img}>
						<img src={getImageUrl(albumInfo)} alt={albumInfo.name} />
					</div>
					<div className={styles.album_detail}>
						<div className={styles.title}>
							<h1>{albumInfo.name}</h1>
						</div>
						<div className={styles.art}>
							<i className={styles.icon_singer}></i>
						</div>
						<ul className={styles.data_info}>
							<li className={styles.data_info_item}>
								<div className={styles.data_tag_box}>
									歌手:&nbsp;
									<a className={styles.data_info_tags}>{albumInfo.artist?.name}</a>
								</div>
							</li>
							<li className={styles.data_info_item}>
								<div className={styles.data_tag_box}>发行时间:&nbsp; {timestampToDate(albumInfo.publishTime)}</div>
							</li>
							<li className={styles.data_info_item}>
								<div className={styles.data_tag_box}>
									发行公司:&nbsp;
									{albumInfo.company}
								</div>
							</li>
						</ul>
						<div className={styles.mod_about}>
							<h3 className={styles.about_tit}>简介:</h3>
							<div className={styles.about_cont} onClick={showModal}>
								{albumInfo.description}
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
								<li className={styles.songlist__header_time}>{t('songItem.songTime')}</li>
							</ul>
							<ul className={styles.songlist__list}>
								{trackInfos.map((item, index) => {
									return (
										<li key={item.id}>
											<div className={styles.songlist__item}>
												<div className={styles.songlist__number}>{index + 1}</div>
												<div className={styles.songlist__play}>
													<a
														className={`${styles.list_menu__item} ${styles.list_menu__play}`}
														title={`${t('songItem.play')}`}
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
					</div>
				</div>
			</div>
			<Modal title={t('album.albumDesc')} centered open={isModalOpen} onCancel={handleCancel} footer={null}>
				{albumInfo.description}
			</Modal>
		</>
	);
};

export default AlbumDetail;
