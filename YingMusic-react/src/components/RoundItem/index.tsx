import React from 'react';
import Img from '../Img';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';

type Props = {
	artistsInfos: ArtistsInfo[];
};

const RoundItem: React.FC<Props> = (props: Props) => {
	const { artistsInfos } = props;
	return (
		<div className={styles.roundItem_content}>
			{artistsInfos.map((rtistsInfo: ArtistsInfo, index) => {
				return (
					<div className={styles.item} key={index}>
						<Link to={`/artistDetail/${rtistsInfo.id}`}>
							<div className={styles.play}>
								<div className={styles.img}>
									<Img src={rtistsInfo.picUrl} name={rtistsInfo.name} />
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
