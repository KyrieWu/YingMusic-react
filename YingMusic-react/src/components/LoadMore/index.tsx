import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface IProps {
	clickHandler: React.MouseEventHandler;
}

const LoadMore: React.FC<IProps> = props => {
	const { t } = useTranslation();
	const { clickHandler } = props;
	return (
		<div className={styles.show_more}>
			<div className={styles.line}></div>
			<div className={styles.btn} onClick={clickHandler}>
				{t('footer.loadMore')}
			</div>
			<div className={styles.line}></div>
		</div>
	);
};

export default LoadMore;
