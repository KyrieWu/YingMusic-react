import React, { ReactNode, useState, forwardRef, useImperativeHandle, ForwardRefRenderFunction } from 'react';

import styles from './style.module.scss';

export type IProps = {
	children?: ReactNode[];
	openMenu?: Function;
	closeMenu?: Function;
	showMenu?: boolean;
};

const contextMenu: ForwardRefRenderFunction<unknown, IProps> = (props, ref) => {
	const [top, setTop] = useState<number>(0);
	const [left, setLeft] = useState<number>(0);
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const { children } = props;

	const setMenu = (top: number, left: number): void => {
		setTop(top + 10);
		setLeft(left + 10);
	};

	useImperativeHandle(ref, () => ({
		showMenu,
		openMenu(e: React.MouseEvent<HTMLImageElement>) {
			setShowMenu(true);
			setMenu(e.clientY, e.clientX);
			e.preventDefault();
		},
		closeMenu() {
			setShowMenu(false);
		},
	}));

	const openOrCloseMenu = () => {
		if (showMenu) {
			setShowMenu(false);
		} else {
			setShowMenu(true);
		}
	};

	return (
		<div className={styles.context_menu}>
			{showMenu && (
				<div className={styles.menu} style={{ top: top + 'px', left: left + 'px' }}>
					{children?.length &&
						children?.map((item: ReactNode, index: number) => {
							return (
								<div className={styles.item} key={index} onClick={() => openOrCloseMenu()}>
									{item}
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
};

export default forwardRef(contextMenu);
