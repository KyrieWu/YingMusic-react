import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Md5 } from 'ts-md5';
import { message } from 'antd';
import { toLogin, getCaptcha, checkCaptcha } from '@/apis';
import mobile from '@/assets/icons/mobile.svg';
import lock from '@/assets/icons/lock.svg';
import captchaIcon from '@/assets/icons/验证码.png';
import styles from './style.module.scss';

const Login: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [captcha, setcaptcha] = useState('');
	const [logintype, setLogintype] = useState(1);
	const [enable, setEnable] = useState(true);
	const [time, setTime] = useState('60s');
	const [showCaptchaVaild, setShowCaptchaVaild] = useState(false);
	const [showPhoneVaild, setShowPhoneVaild] = useState(false);
	const dispatch = useDispatch();

	const pnhoneHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(event.currentTarget.value);
	};
	const passwordHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
	};
	const captchaHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setcaptcha(event.currentTarget.value);
	};

	const checkPhone = () => {
		if (phone.length > 0) {
			if (!/^1[3456789]\d{9}$/.test(phone)) {
				setShowPhoneVaild(true);
				return false;
			} else {
				setShowPhoneVaild(false);
				return true;
			}
		}
	};

	const showvaild = (isshow: boolean) => {
		setShowCaptchaVaild(isshow);
	};

	const login = async () => {
		if (phone.length == 0) {
			message.warning('请输入手机号!');
			return;
		}
		if (logintype == 2) {
			let loginRes = await toLogin(phone, Md5.hashStr(password));
			if (loginRes.code == 200) {
				// let from = route.query.from;
				// if (from) {
				// 	router.push(`${from}`);
				// 	return;
				// }
				dispatch({ type: 'updateIsLogin', val: true });
				navigate(`/`);
			} else {
				message.error('账号或密码错误!');
			}
		} else {
			let checkcaptcha = await checkCaptcha(phone, captcha);

			if (checkcaptcha) {
				let loginRes = await toLogin(phone, captcha);
				if (loginRes.code == 200) {
					// let from = route.query.from;
					// if (from) {
					// 	router.push(`${from}`);
					// 	return;
					// }
					navigate(`/`);
				} else {
					message.error('账号或密码错误!');
				}
			} else {
				message.error('验证码错误!');
			}
		}
	};

	const sendCode = async () => {
		try {
			// 检验手机号格式
			if (phone.length == 0) {
				showvaild(true);
				return;
			}
			// 发送验证码
			let res = (await getCaptcha(phone)) as any;

			if (res.code !== 200) {
				message.error('当前网络繁忙，请稍后再试哦~');
				return;
			}

			//开启倒计时
			setEnable(false);
			setTime('60s');
			let n = 60;
			let timer = setInterval(() => {
				n--;
				if (n == 0) {
					clearInterval(timer);
					setEnable(true);
					return;
				}
				setTime(`${n}s`);
			}, 1000);
		} catch (err) {}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.content}>
				<div className={styles.form_box}>
					<div className={styles.login_box}>
						<div className={styles.login_icon}>
							<img src="http://p3.music.126.net/tBTNafgjNnTL1KlZMt7lVA==/18885211718935735.jpg" alt="" />
						</div>
						<h2>{t('login.loginText')}</h2>
						<div className={styles.phoneNumber}>
							<div className={styles.img}>
								<img src={mobile} alt="" />
							</div>
							<input
								type="text"
								placeholder={`${t('login.phone')}`}
								value={phone}
								onChange={pnhoneHandleChange}
								onFocus={() => showvaild(false)}
								onBlur={() => checkPhone()}
							/>
							{showCaptchaVaild && <div className={styles.phone_vaild}>手机号码有误，请重填!</div>}
						</div>
						{logintype == 2 ? (
							<div className={styles.password}>
								<div className={styles.img}>
									<img src={lock} alt="" />
								</div>

								<input
									type="password"
									placeholder={`${t('login.password')}`}
									value={password}
									onChange={passwordHandleChange}
								/>
							</div>
						) : (
							<div className={styles.captcha}>
								<div className={styles.img}>
									<img src={captchaIcon} alt="" />
								</div>
								<input
									type="text"
									placeholder={`${t('login.captcha')}`}
									value={captcha}
									onChange={captchaHandleChange}
								/>
								<button
									type="button"
									className={`${styles.timeout} ${
										enable == false || phone.length == 0 || showPhoneVaild == true ? styles.disable : ''
									}`}
									disabled={enable == false || phone.length == 0 || showPhoneVaild == true}
									onClick={() => sendCode()}
								>
									{enable ? t('login.sendCaptcha') : time}
								</button>
								{showCaptchaVaild && <div className={styles.captcha_vaild}>请输入手机号!</div>}
							</div>
						)}

						<button className={styles.loginButton} onClick={() => login()}>
							{t('login.login')}
						</button>
					</div>
					<div className={styles.logintype}>
						{logintype == 1 ? (
							<span onClick={() => setLogintype(2)}>{t('login.loginWithPassword')}</span>
						) : (
							<span onClick={() => setLogintype(1)}>{t('login.loginWithCaptcha')}</span>
						)}
					</div>
				</div>
			</div>
			<div className={styles.notice}>
				<p>{t('login.notice')}</p>
			</div>
		</div>
	);
};

export default Login;
