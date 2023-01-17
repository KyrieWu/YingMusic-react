import React from 'react';
import { Spin } from 'antd';
import styles from './style.module.scss';

const SpinPage: React.FC = () => {
	return (
		<div className={styles.spin_container}>
			<Spin tip="Loading" size="large">
				<div className="content" />
			</Spin>
		</div>
	);
};

export default SpinPage;
