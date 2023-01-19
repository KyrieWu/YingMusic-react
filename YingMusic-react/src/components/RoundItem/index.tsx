import React from 'react';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';

type Props = {
	artistsInfos: ArtistsInfo[];
};

const RoundItem: React.FC<Props> = (props: Props) => {
	const { artistsInfos } = props;
	const getImageUrl = (item: any) => {
		if (item.img1v1Url) {
			let img1v1ID = item.img1v1Url.split('/');
			img1v1ID = img1v1ID[img1v1ID.length - 1];
			if (img1v1ID === '5639395138885805.jpg') {
				// 没有头像的歌手，网易云返回的img1v1Url并不是正方形的 😅😅😅
				return 'https://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=512y512';
			}
		}
		let img = item.img1v1Url || item.picUrl || item.coverImgUrl;
		return `${img?.replace('http://', 'https://')}?param=512y512`;
	};

	return (
		<div className={styles.roundItem_content}>
			{artistsInfos.map((rtistsInfo: ArtistsInfo, index) => {
				return (
					<div className={styles.item} key={index}>
						<Link to={`/artistDetail/${rtistsInfo.id}`}>
							<div className={styles.play}>
								<div className={styles.img}>
									<img src={getImageUrl(rtistsInfo)} alt={rtistsInfo.name} loading="lazy" />
								</div>
							</div>
						</Link>
						<div className={styles.discription}>
							<Link to={`/artistDetail/${rtistsInfo.id}`}>{rtistsInfo.name}</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default RoundItem;
