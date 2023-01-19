import React, { useState, useRef } from 'react';

import {
	SearchOutlined,
	LoginOutlined,
	LogoutOutlined,
	TranslationOutlined,
	UserOutlined,
	BulbOutlined,
	BulbFilled,
	SettingOutlined,
} from '@ant-design/icons';
import { Switch, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { changeAppearance } from '@/utils/common';

import styles from './style.module.scss';
import ContextMenu from '../ContextMenu';

const Header: React.FC = () => {
	const location = useLocation();
	const navigateTo = useNavigate();
	const [inputFocus, setInputFocus] = useState(false);
	const [keyWord, setKeyWord] = useState('');
	const contextMenuRef: any = useRef(null);
	const transContextRef: any = useRef(null);
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const { isLogin } = useSelector((state: RootType) => ({
		isLogin: state.handleUser.isLogin,
	}));

	// 处理 input 的 onFocus 事件
	const focusHandler = () => {
		setInputFocus(true);
	};

	// 处理 input 的 onBlur 事件
	const blurHandler = () => {
		setInputFocus(false);
	};

	const showOrHideContextMenu = (event: React.MouseEvent<HTMLImageElement>): void => {
		if (!contextMenuRef.current?.showMenu) {
			contextMenuRef.current?.openMenu(event);
		} else {
			contextMenuRef.current?.closeMenu();
		}
	};

	const showOrHideTransContextMenu = (event: React.MouseEvent<HTMLDivElement>): void => {
		if (!transContextRef.current?.showMenu) {
			transContextRef.current?.openMenu(event);
		} else {
			transContextRef.current?.closeMenu();
		}
	};

	const toHome = () => {
		navigateTo('/');
	};

	const toLogout = () => {
		dispatch({ type: 'updateIsLogin', val: false });
	};

	const changLangToZH = () => {
		i18n.changeLanguage('zh');
		message.success(t('common.switchLang'));
	};
	const changLangToEN = () => {
		i18n.changeLanguage('en');
		message.success(t('common.switchLang'));
	};

	const changeTheme = (checked: boolean) => {
		let theme = checked ? 'light' : 'dark';

		changeAppearance(theme);
		localStorage.setItem('data-theme', theme);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyWord(event.currentTarget.value);
	};

	const toSearch = async (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			dispatch({ type: 'updateKeyword', val: keyWord });
			navigateTo(`/search/${keyWord}`);
		}
		e.preventDefault();
	};

	return (
		<>
			<header>
				<div className={styles.navigation_logo}>
					<img src="/music.png" alt="" onClick={toHome} />
					<p onClick={toHome}>YingMusic</p>
				</div>
				<div className={styles.naviagtion_links}>
					<Link to={'/'} className={location.pathname === '/' ? styles.active : ''}>
						{t('header.home')}
					</Link>
					<Link to={'/discover/allPlayList'} className={location.pathname.includes('/discover') ? styles.active : ''}>
						{t('header.discover')}
					</Link>
					<Link to={'/library'} className={location.pathname === '/library' ? styles.active : ''}>
						{t('header.profile')}
					</Link>
				</div>
				<div className={styles.right_part}>
					<div className={styles.search_box}>
						<div className={[styles.container, inputFocus === true ? styles.active : ''].join(' ')}>
							<div className={styles.input}>
								<input
									type="search"
									placeholder={`${inputFocus ? '' : t('header.search')}`}
									value={keyWord}
									onChange={e => handleChange(e)}
									onFocus={focusHandler}
									onBlur={blurHandler}
									onKeyDown={e => toSearch(e)}
								/>
							</div>
							<SearchOutlined className={styles.searchIcon} />
						</div>
					</div>
					<UserOutlined
						className={styles.avator}
						alt="loginIcon"
						onClick={showOrHideContextMenu}
						style={{ color: 'var(--color-text)', fontSize: '28px' }}
					/>
					<div className={styles.translate} onClick={showOrHideTransContextMenu}>
						<TranslationOutlined style={{ color: 'var(--color-text)', fontSize: '28px' }} />
					</div>
					<Switch
						style={{
							marginLeft: '20px',
						}}
						checkedChildren={<BulbFilled style={{ fontSize: '15px' }} />}
						unCheckedChildren={<BulbOutlined style={{ fontSize: '15px' }} />}
						onChange={changeTheme}
						defaultChecked={localStorage.getItem('data-theme') === 'dark' ? false : true}
					/>
				</div>
			</header>
			<ContextMenu ref={contextMenuRef}>
				{!isLogin ? (
					<Link to={'/login'}>
						<LoginOutlined />
						{t('login.login')}
					</Link>
				) : (
					<div>
						<LogoutOutlined onClick={toLogout} />
						{t('profile.userProfileMenu.logout')}
					</div>
				)}
				<div>
					<SettingOutlined />
					{t('settings.settings')}
				</div>
			</ContextMenu>
			<ContextMenu ref={transContextRef}>
				<div onClick={changLangToEN}>English</div>
				<div onClick={changLangToZH}>简体中文</div>
			</ContextMenu>
		</>
	);
};

export default Header;
