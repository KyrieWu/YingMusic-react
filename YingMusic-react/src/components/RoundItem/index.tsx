import React from 'react';

import { Link } from 'react-router-dom';

import styles from './style.module.scss';

type Props = {
	artistsInfos: ArtistsInfo[];
};

const RoundItem: React.FC<Props> = (props: Props) => {
	const { artistsInfos } = props;
	return (
		<div className={styles.roundItem_content}>
			{artistsInfos.map((rtistsInfo: ArtistsInfo) => {
				return (
					<div className={styles.item} key={rtistsInfo.id}>
						<Link to="{ path: '/artistDetail', query: { id: item.id } }">
							<div className={styles.play}>
								<div className={styles.img}>
									<img src={rtistsInfo.picUrl} alt={rtistsInfo.name} loading="lazy" />
								</div>
							</div>
						</Link>
						<div className={styles.discription}>
							<Link to="{ path: '/artistDetail', query: { id: item.id } }">{rtistsInfo.name}</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default RoundItem;
