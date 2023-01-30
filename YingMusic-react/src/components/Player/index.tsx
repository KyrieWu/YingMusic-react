import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useWatch from '@/hooks/useWatch';
import { message } from 'antd';
import {
	StepBackwardOutlined,
	StepForwardOutlined,
	PlayCircleFilled,
	PauseCircleFilled,
	HeartOutlined,
	HeartFilled,
	SoundOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import styles from './style.module.scss';
import { timestampToTime, uptateTime } from '@/utils/utils';
import { getLyric, checkMusic } from '@/apis';

const Player: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const player = useRef<HTMLMediaElement>(null);
	const lyric_content = useRef<HTMLDivElement>(null);
	const progress = useRef<HTMLInputElement>(null);
	const [isPlay, setIsPlay] = useState(false);
	const [showPlaylist, setShowPlaylist] = useState(false);
	const [_currenttime, setCurrentTime] = useState('00:00');
	const [_volumeRange, setVolumeRange] = useState<number>(0.5);

	const { playList, playIndex, currentTime, lyric, duration, volumeRange } = useSelector((state: RootType) => ({
		playList: state.handlePlayer.playList as SongInfo[],
		playIndex: state.handlePlayer.playIndex as number,
		currentTime: state.handlePlayer.currentTime as number,
		lyric: state.handlePlayer.lyric as any[],
		duration: state.handlePlayer.duration as number,
		volumeRange: state.handlePlayer.volumeRange as number,
	}));

	useEffect(() => {
		dispatch({ type: 'updateVolumeRange', val: _volumeRange });
	}, []);

	useEffect(() => {
		checkMusic(playList[playIndex]?.id).then(res => {
			if (res.success) {
				lyric_content.current && (lyric_content.current.scrollTop = 0);
				dispatch({ type: 'updateDuration', val: player.current?.duration });
				updataCurrenttime();
				getLyric(playList[playIndex].id).then(res => {
					dispatch({ type: 'getLyric', val: res.lrc.lyric });
				});
				setIsPlay(true);
				progress.current && (progress.current.step = '0.01');
			} else {
				message.warning(`${t('player.warning')}`);
				setIsPlay(false);
				setTimeout(() => {
					nextSong();
				}, 2000);
			}
		});
	}, [playIndex]);

	// useEffect(() => {
	// 	dispatch({ type: 'updateDuration', val: player.current?.duration });
	// 	updataCurrenttime();
	// 	getLyric(playList[playIndex].id).then(res => {
	// 		dispatch({ type: 'getLyric', val: res.lrc });
	// 	});
	// 	let arr = sortLyric(lyricList?.lyric);
	// 	setLyric(arr);
	// 	setIsPlay(true);
	// }, [playList]);

	useEffect(() => {
		if (currentTime == duration) {
			nextSong();
		} else {
			let pactive = document.querySelector(`${styles.lyricActive}`) as HTMLElement;

			if (pactive?.offsetTop > 500) {
				lyric_content.current && (lyric_content.current.scrollTop = pactive.offsetTop - 500);
			}
		}
	}, [currentTime]);

	const getImageUrl = (item: any) => {
		let img = item.img1v1Url || item.picUrl || item.coverImgUrl;
		return `${img?.replace('http://', 'https://')}?param=120y120`;
	};
	const getBigImageUrl = (item: any) => {
		let img = item.img1v1Url || item.picUrl || item.coverImgUrl;
		return `${img?.replace('http://', 'https://')}?param=250y250`;
	};
	let interval: any;
	const updataCurrenttime = () => {
		interval = setInterval(() => {
			dispatch({ type: 'updateCurrentTime', val: player.current?.currentTime });
			if (player.current?.duration && player.current?.currentTime) {
				setCurrentTime(uptateTime(player.current?.duration * 1000, player.current?.currentTime * 1000));
			}
		}, 1000);
	};
	const clearnterval = () => {
		if (interval != null) {
			clearInterval(interval);
		}
	};

	const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
		clearnterval();
		player.current && (player.current.currentTime = Number(e.currentTarget.value));
		if (isPlay) {
			updataCurrenttime();
		}
	};

	const changeVolumn = (e: ChangeEvent<HTMLInputElement>) => {
		setVolumeRange(Number(e.currentTarget.value));
		player.current && (player.current.volume = Number(e.currentTarget.value));
		dispatch({ type: 'updateVolumeRange', val: Number(e.currentTarget.value) });
	};

	const playOrPause = () => {
		if (playList.length != 0) {
			if (isPlay) {
				player.current && player.current.pause();
				clearnterval();
			} else {
				dispatch({ type: 'updateDuration', val: player.current?.duration });
				player.current && player.current.play();
				updataCurrenttime();
			}
			setIsPlay(!isPlay);
		}
	};

	const prevSong = () => {
		if (playList.length != 0) {
			dispatch({ type: 'updatePlayIndex', val: playIndex - 1 });

			if (playIndex <= 0) {
				dispatch({ type: 'updatePlayIndex', val: playList.length - 1 });
			}
			lyric_content.current && (lyric_content.current.scrollTop = 0);
			getLyric(playList[playIndex].id).then(res => {
				dispatch({ type: 'getLyric', val: res.lrc.lyric });
			});
		}
	};

	const nextSong = () => {
		if (playList.length != 0) {
			dispatch({ type: 'updatePlayIndex', val: playIndex + 1 });

			if (playIndex >= playList.length) {
				dispatch({ type: 'updatePlayIndex', val: 0 });
			}

			lyric_content.current && (lyric_content.current.scrollTop = 0);
			getLyric(playList[playIndex].id).then(res => {
				dispatch({ type: 'getLyric', val: res.lrc.lyric });
			});
			setIsPlay(true);
		}
	};

	const playSong = (item: any): void => {
		lyric_content.current && (lyric_content.current.scrollTop = 0);
		dispatch({ type: 'playSong', val: item });
		getLyric(playList[playIndex].id).then(res => {
			dispatch({ type: 'getLyric', val: res.lrc.lyric });
		});
	};
	const deletePlaylist = () => {
		dispatch({ type: 'deletePlayList' });
	};

	const deleteSong = (song: SongInfo) => {
		dispatch({ type: 'deleteSongFormPlayList', val: song });
	};

	return (
		<div className={styles.player}>
			<div className={styles.left}>
				<button className={styles.prevSong} onClick={() => prevSong()} title={`${t('player.previous')}`}>
					<StepBackwardOutlined className={styles.prev_icon} />
				</button>
				<button className={styles.playOrPause} onClick={() => playOrPause()}>
					{isPlay ? (
						<PauseCircleFilled className={styles.pauseOrPlay_icon} title={`${t('player.pause')}`} />
					) : (
						<PlayCircleFilled className={styles.pauseOrPlay_icon} title={`${t('player.play')}`} />
					)}
				</button>
				<button className={styles.nextSong} onClick={() => nextSong()} title={`${t('player.next')}`}>
					<StepForwardOutlined className={styles.next_icon} />
				</button>
			</div>
			<div className={styles.middle}>
				<div className={styles.img}>
					<img src={playList[playIndex] && getImageUrl(playList[playIndex]?.al)} alt="" />
				</div>
				<div className={styles.middle_top}>
					<div className={styles.play_name}>
						{' '}
						{playList[playIndex]?.name} -{' '}
						<Link
							to={`/artistDetail/ ${playList[playIndex]?.ar[0].id}`}
							className={styles.playlist__author}
							title={playList[playIndex]?.ar[0].name}
						>
							{playList[playIndex]?.ar[0].name}
						</Link>
					</div>
					<div className={styles.play_time}>
						<span>
							{_currenttime}&nbsp;/&nbsp;{timestampToTime(playList[playIndex]?.dt)}
						</span>
					</div>
				</div>
				<div className={styles.nprogress}>
					<input
						ref={progress}
						type="range"
						className={styles.range}
						min="0"
						step="0.01"
						max={String(duration)}
						value={currentTime}
						onChange={e => {
							changeCurrentTime(e);
						}}
					/>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.like}>
					<HeartOutlined title={`${t('player.like')}`} />
				</div>
				<div
					className={`${styles.playlist} ${showPlaylist ? styles.active : ''}`}
					onClick={() => setShowPlaylist(!showPlaylist)}
					title={`${t('player.nextUp')}`}
				>
					<UnorderedListOutlined />
				</div>
				<div className={styles.volume}>
					<SoundOutlined className={styles.volume_icon} title={`${t('player.mute')}`} />
					<div className={styles.volume_range}>
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={_volumeRange}
							onChange={e => {
								changeVolumn(e);
							}}
						/>
					</div>
				</div>
			</div>
			{showPlaylist && (
				<div className={styles.playList}>
					<div className={styles.bg}>
						<img src={playList[playIndex]?.al.picUrl} />
					</div>
					<div className={styles.playList_top}>
						<span className={styles.top_play_list}>播放列表{playList.length}</span>
						<div className={styles.deletelist}>
							<i className={styles.delete_icon}></i>
							<span className={styles.delete_title}>清空列表</span>
						</div>
						<span className={styles.close} onClick={() => setShowPlaylist(false)}>
							×
						</span>
					</div>
					<div className={styles.playList_left}>
						<div className={styles.mod_songlist}>
							<ul className={styles.songlist__header}>
								<li className={styles.songlist__header_empty}></li>
								<li className={styles.songlist__header_name}>{t('songItem.songName')}</li>
								<li className={styles.songlist__header_author}>{t('songItem.singer')}</li>
								<li className={styles.songlist__header_time}>{t('songItem.songTime')}</li>
							</ul>
							<ul className={styles.songlist__list}>
								{playList.map((item, index) => {
									return (
										<li className={playIndex == index ? styles.songlist_active : ''} key={index}>
											<div className={styles.songlist__item}>
												<div className={styles.songlist__number}>{index + 1}</div>
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
														onClick={() => setShowPlaylist(false)}
													>
														{item.ar[0].name}
													</Link>
												</div>
												<div className={styles.songlist__time}>{timestampToTime(item.dt)}</div>
												<div className={styles.songlist__add}>
													<a
														className={`${styles.list_menu__item} ${styles.list_menu__add}`}
														title={`${t('songItem.delete')}`}
														onClick={() => deleteSong(item)}
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
					<div className={styles.playList_right}>
						<div className={styles.song_img}>
							<img
								src={playList[playIndex] && getBigImageUrl(playList[playIndex]?.al)}
								alt={playList[playIndex]?.al.name}
							/>
						</div>
						<div className={styles.lyric} ref={lyric_content}>
							{lyric?.map((item, index) => {
								return (
									<p
										key={index}
										className={
											(currentTime * 1000 >= item.time && currentTime * 1000 < item.pre) ||
											(currentTime * 1000 >= item.time && item.pre == 0)
												? styles.lyricActive
												: ''
										}
									>
										{item.lrc}
									</p>
								);
							})}
						</div>
					</div>
				</div>
			)}

			<audio
				ref={player}
				src={`https://music.163.com/song/media/outer/url?id=${playList[playIndex]?.id}.mp3`}
				autoPlay
			></audio>
		</div>
	);
};

export default Player;
