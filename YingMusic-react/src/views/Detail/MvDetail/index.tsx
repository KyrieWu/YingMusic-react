import React, { useState, useEffect, useRef } from 'react';
import MVItem, { MVProps } from '@/components/MVItem';
import { useParams, Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { getMVUrl, getMVDetail, getArtistMV } from '@/apis';
import styles from './styles.module.scss';
import Plyr from 'plyr';

interface ArtistMv {
	code: number;
	hasMore: boolean;
	mvs: ArtistMvInfo[];
	time: number;
}

interface MVURLData {
	code: number;
	expi: number;
	fee: number;
	id: number;
	md5: string;
	msg: string;
	mvFee: number;
	promotionVo: null;
	r: number;
	size: number;
	st: number;
	url: string;
}
let videoOptions = {
	settings: ['quality'],
	autoplay: false,
	quality: {
		default: 1080,
		options: [1080, 720, 480, 240],
	},
};

const MVDetail: React.FC = () => {
	const { id } = useParams();
	const [mvUrl, setMvUrl] = useState<string>();
	const [mvDetail, setMvDetail] = useState({} as MVInfo);
	const [mvList, setMvList] = useState<MVProps[]>([]);
	//const videoPlayer = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		// let player = new Plyr(videoPlayer.current as HTMLVideoElement, videoOptions);
		// getData(Number(id), player);
		getmvurl(Number(id));
		// getartMV(Number(id));
	}, [id]);

	const getmvurl = async (id: number) => {
		let res = await getMVUrl({ id });

		setMvUrl(res.data.url.replace('http:', 'https:'));
		getartMV(id);
	};

	// const getData = (id: number, player: Plyr) => {
	// 	getMVDetail(id).then(data => {
	// 		let mv = data;
	// 		let requests = data.data.brs.map(br => {
	// 			return getMVUrl({ id, r: br.br });
	// 		});
	// 		Promise.all(requests).then(results => {
	// 			let sources = results.map(result => {
	// 				return {
	// 					src: result.data.url.replace(/^http:/, 'https:'),
	// 					type: 'video/mp4',
	// 					size: result.data.r,
	// 				};
	// 			});
	// 			player.source = {
	// 				type: 'video',
	// 				title: mv.data.name,
	// 				sources: sources,
	// 				poster: mv.data.cover.replace(/^http:/, 'https:'),
	// 			};
	// 		});
	// 	});
	// 	getartMV(id);
	// };

	const getartMV = async (id: number) => {
		let mvD = await getMVDetail(id);

		setMvDetail(mvD.data);
		let artistMV = (await getArtistMV(mvD.data.artistId, 5, 0)) as unknown as ArtistMv;
		let mvList: MVProps[] = [];
		artistMV.mvs.forEach(item => {
			mvList.push(
				Object.freeze({
					id: item.id,
					name: item.name,
					picUrl: item.imgurl,
					artistId: item.artist?.id,
					artistName: item.artist?.name,
				})
			);
		});
		setMvList(mvList);
	};

	return (
		<div className={styles.mv_container}>
			<div className={styles.mv_video}>
				<video className={styles.video} src={mvUrl} controls></video>
			</div>
			<div className={styles.mv_info}>
				<div className={styles.mv_name}>
					<Link to={`/artistDetail/${mvDetail.artistId}`}>{mvDetail.artistName}</Link>&nbsp;—&nbsp;{mvDetail.name}
					<div className={styles.mv_icon}>
						<HeartOutlined className={styles.mv_like_icon} title="收藏" />
					</div>
				</div>

				<div className={styles.playCount}>
					<span>播放量:&nbsp;{(mvDetail.playCount / 10000).toFixed(1)}万</span>
					<span>发行时间:&nbsp;{mvDetail.publishTime}</span>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.title}>相关推荐：</div>
				<MVItem mvList={mvList}></MVItem>
			</div>
		</div>
	);
};

export default MVDetail;
