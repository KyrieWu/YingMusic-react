import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import sample from 'lodash/sample';
import { getPersonalFm, getDailyRecommendSongs } from '@/apis';
import styles from './style.module.scss';
import play from '@/assets/icons/播放 (2).png';
import next from '@/assets/icons/下一曲.png';

interface PersonFM {
	code: number;
	data: PerosnFMInfo[];
	popAdjust: boolean;
}

const defaultCovers = [
	'https://p2.music.126.net/0-Ybpa8FrDfRgKYCTJD8Xg==/109951164796696795.jpg',
	'https://p2.music.126.net/QxJA2mr4hhb9DZyucIOIQw==/109951165422200291.jpg',
	'https://p1.music.126.net/AhYP9TET8l-VSGOpWAKZXw==/109951165134386387.jpg',
];

const DailyRec: React.FC = () => {
	const [fmList, setFmList] = useState<PerosnFMInfo[]>([]);
	const [fmindex, setFmIndex] = useState(0);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { isLogin } = useSelector((state: RootType) => ({
		isLogin: state.handleUser.isLogin,
	}));

	useEffect(() => {
		getPersonFM();
	}, []);

	const nextSong = async () => {
		if (fmindex >= fmList.length - 1) {
			let fmresult = (await getPersonalFm()) as unknown as PersonFM;
			setFmList(fmresult.data);

			//fmindex.value = 0
		} else {
			setFmIndex(fmindex + 1);
		}
	};

	const getPersonFM = async () => {
		let fmresult = (await getPersonalFm()) as unknown as PersonFM;

		setFmList(fmresult.data);
	};

	const coverUrl = (): string => {
		return `${sample(defaultCovers)}?param=1024y1024`;
	};

	const getImageUrl = (item: any) => {
		let img = item?.img1v1Url || item?.picUrl || item?.coverImgUrl;
		return `${img?.replace('http://', 'https://')}?param=200y200`;
	};

	const playAllSong = async () => {
		if (!isLogin) {
			message.warning(`${t('toast.needToLogin')}`);
		} else {
			let res = await getDailyRecommendSongs();
			if (res.code == 200) {
				dispatch({ type: 'updatePlayList', val: res.data.dailySongs });
			}
		}
	};

	return (
		<div className={styles.recomend_container}>
			<div className={styles.head}>
				<h2>{t('home.forYou')}</h2>
			</div>
			<div className={styles.content}>
				<div className={styles.com_sons}>
					<div className={styles.com_bg}>
						<img src={coverUrl()} alt="" loading="lazy" />
						<div className={styles.com_text}>每日推荐</div>
					</div>
					<div className={styles.play_icon} onClick={() => playAllSong()}>
						<img src="https://y.qq.com/ryqq/static/media/cover_play@2x.53a26efb.png?max_age=2592000" alt="" />
					</div>
				</div>
				<div className={styles.block}></div>
				<div className={styles.person_FM}>
					<div className={styles.bg}>
						<img src={fmList[fmindex]?.album.picUrl} alt="" loading="lazy" />
					</div>
					<div className={styles.left}>
						<img src={getImageUrl(fmList[fmindex]?.album)} alt="" loading="lazy" />
					</div>
					<div className={styles.middle}>
						<span className={styles.songname}>{fmList[fmindex]?.name}</span>
						<Link to={`/artistDetail/${fmList[fmindex]?.artists[0]?.id}`} className={styles.artname}>
							{fmList[fmindex]?.artists[0]?.name}
						</Link>
						<div className={styles.playsong}>
							<div className={styles.playicon}>
								<img src={play} alt="" />
							</div>
							<div className={styles.nextsong} onClick={nextSong}>
								<img src={next} alt="" />
							</div>
						</div>
					</div>
					<div className={styles.right}>
						<span>私人FM</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DailyRec;
