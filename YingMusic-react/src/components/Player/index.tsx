import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { sortLyric } from '@/utils/sortLyric';
import { timestampToTime, uptateTime } from '@/utils/utils';
import { getLyric } from '@/apis';

const Player: React.FC = () => {
	const dispatch = useDispatch();
	const player = useRef<HTMLAudioElement>(null);
	const [isPlay, setIsPlay] = useState(false);
	const [showPlaylist, setShowPlaylist] = useState(false);
	const [_currenttime, setCurrentTime] = useState('00:00');
	const [lyric, setLyric] = useState<any[]>([]);

	const { playList, playIndex, currentTime, lyricList } = useSelector((state: RootType) => ({
		playList: state.handlePlayer.playList as SongInfo[],
		playIndex: state.handlePlayer.playIndex as number,
		currentTime: state.handlePlayer.currentTime as number,
		lyricList: state.handlePlayer.lyricList,
	}));

	useEffect(() => {
		getLyric(playList[playIndex].id).then(res => {
			dispatch({ type: 'getLyric', val: res.lrc });
		});

		let arr = sortLyric(lyricList?.lyric);

		setLyric(arr);
	}, [playList, playIndex]);

	const getImageUrl = (item: any) => {
		let img = item.img1v1Url || item.picUrl || item.coverImgUrl;
		return `${img?.replace('http://', 'https://')}?param=120y120`;
	};

	return (
		<div className={styles.player}>
			<div className={styles.left}>
				<button className={styles.prevSong}>
					<StepBackwardOutlined className={styles.prev_icon} />
				</button>
				<button className={styles.playOrPause}>
					{isPlay ? (
						<PauseCircleFilled className={styles.pauseOrPlay_icon} />
					) : (
						<PlayCircleFilled className={styles.pauseOrPlay_icon} />
					)}
				</button>
				<button className={styles.nextSong}>
					<StepForwardOutlined className={styles.next_icon} />
				</button>
			</div>
			<div className={styles.middle}>
				<div className={styles.img}>
					<img src={getImageUrl(playList[playIndex]?.al)} alt="" />
				</div>
				<div className={styles.middle_top}>
					<div className={styles.play_name}>
						{' '}
						{playList[playIndex]?.name}-{playList[playIndex]?.ar[0].name}
					</div>
					<div className={styles.play_time}>
						<span>
							{_currenttime}&nbsp;/&nbsp;{timestampToTime(playList[playIndex]?.dt)}
						</span>
					</div>
				</div>
				<div className={styles.nprogress}>
					<input type="range" className={styles.range} min="0" max="duration" step="0.05" />
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.like}>
					<HeartOutlined />
				</div>
				<div className={`${styles.playlist} ${showPlaylist ? styles.active : ''}`}>
					<UnorderedListOutlined onClick={() => setShowPlaylist(!showPlaylist)} />
				</div>
				<div className={styles.volume}>
					<SoundOutlined className={styles.volume_icon} />
					<div className={styles.volume_range}>
						<input type="range" min="0" max="1" step="0.01" v-model="volumeRange" />
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
						<div className={styles.top_play_songname}>{playList[playIndex]?.name}</div>
						<span className={styles.close} onClick={() => setShowPlaylist(false)}>
							×
						</span>
					</div>
					<div className={styles.playList_left}>
						<div className={styles.mod_songlist}>
							<ul className={styles.songlist__header}>
								<li className={styles.songlist__header_name}>歌曲</li>
								<li className={styles.songlist__header_album}>歌手</li>
								<li className={styles.songlist__header_time}>时长</li>
							</ul>
							<ul className={styles.songlist__list}>
								{playList.map((item, index) => {
									return (
										<li key={item.id}>
											<div className={styles.songlist__item}>
												<div className={styles.songlist__number}>{index + 1}</div>
												<div className={styles.songlist__songname}>
													<span className={styles.songlist__songname_txt}>
														<a title="item.name">{item.name}</a>
													</span>

													{/* <div className={styles.mod_list_menu}>
											<a className={`styles.list_menu__item list_menu__play`} title="播放">
												<i className="list_menu__icon_play"></i>
											</a>
											<a className="list_menu__item list_menu__add" title="添加到歌单">
												<i className="list_menu__icon_add"></i>
											</a>
											<a className="list_menu__item list_menu__delete" title="从歌单中删除">
												<i className="list_menu__icon_delete"></i>
											</a>
										</div> */}
												</div>
												<div className={styles.songlist__album}>
													<Link to={`/artistDetail/${item.ar[0].id}`}>{item.ar[0].name}</Link>
												</div>
												<div className={styles.songlist__time}>{timestampToTime(item.dt)}</div>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
					<div className={styles.playList_right}>
						<div className={styles.song_img}>
							<img src={playList[playIndex]?.al.picUrl} alt={playList[playIndex]?.al.name} />
						</div>
						<div className={styles.lyric}>
							{lyric?.map((item, index) => {
								return <p key={index}>{item.lrc}</p>;
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
