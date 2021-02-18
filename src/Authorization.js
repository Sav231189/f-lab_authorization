import React, {useState} from 'react';
import s from './Authorization.module.scss'

export const Authorization = ({
																type = 'email',
																startWindow = 'login',
																isRememberMe = true,
																isLogin = true,
																isRegister = true,
																isResetPassword = true,
																isCloseWindowBtn = true,
																isGoogleLogin = false,
																closeWindow = () => {
																},
																callback = () => {
																},
																clickGoogleBtn = () => {
																}
															}) => {
	// текст ошибок и успеха
	const [messageType, setMessageType] = useState('error');
	// текст ошибок и успеха
	const [messageText, setMessageText] = useState('');
	// активация/деактивация лоадера (анимация загрузки)
	const [loading, setLoading] = useState(false);
	// мод содержимого окна (login / registration / resetPassword)
	const [mode, setMode] = useState(startWindow);

	// значения полей инпут
	const [login, setLogin] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [remember, setRemember] = useState(false);

	// указывает какие поля с ошибкой
	const [errorLoginInput, setErrorLoginInput] = useState(false);
	const [errorEmailInput, setErrorEmailInput] = useState(false);
	const [errorPasswordInput, setErrorPasswordInput] = useState(false);
	const [errorConfirmInput, setErrorConfirmInput] = useState(false);

	// функция передается в объекте в колбек функцию, для вызова после ответа сервера
	const feedback = ({type, message}) => {
		setLoading(false);
		setMessageText(message);
		setMessageType(type);
	};

	// функция вызывающая колбек при клике на сloseWindowBtn
	const callBackCloseWindow = () => {
      closeWindow();

      setErrorLoginInput(false);
      setErrorEmailInput(false);
      setErrorPasswordInput(false);
      setErrorConfirmInput(false);

      setMessageText('');
      setPassword('');
	};

	// изменяем мод (login / registration / resetPassword) и чистим errors на инпутах
	const changeMode = (mode) => {
		setMode(mode);

		setErrorLoginInput(false);
		setErrorEmailInput(false);
		setErrorPasswordInput(false);
		setErrorConfirmInput(false);

		setMessageText('');
		setPassword('');
	};

	// проверяем поля инпутов
	const checkLogin = () => {
		if (login.length < 4 || login.length > 30) {
			setErrorLoginInput(true);
			setMessageText('Логин может быть от 4-х до 30 символов.');
			return false;
		}
		setErrorLoginInput(false);
		return true
	};
	const checkEmail = () => {
		function validateEmail(e) {
			const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(e);
		}

		if (!validateEmail(email)) {
			setMessageText('Не корректный e-mail.');
			setErrorEmailInput(true);
			setMessageType('error');
			return false;
		} else {
			setErrorEmailInput(false);
			setMessageText('');
			return true;
		}
	};
	const checkPassword = () => {
		if (password.length < 4 || password.length > 30) {
			setMessageText('Пароль должен сожержать от 4 до 30 символов.');
			setErrorPasswordInput(true);
			return false;
		}
		setErrorPasswordInput(false);
		return true
	};
	const checkConfirm = () => {
		if (password.length !== confirm.length || !password.includes(confirm)) {
			setMessageText('Пароли не совпадают.');
			setErrorConfirmInput(true);
			return false;
		}
		setErrorConfirmInput(false);
		return true;
	};

	// обработчики отправки колбека (вход / регистрация / востановить пароль)
	const loginIn = () => {
		if (callback && checkPassword() && checkLogin() && (type === 'email' ? checkEmail() : true)) {
			callback({
				type: "loginIn",
				login: login,
				password: password,
				remember: remember,
				feedback: feedback,
			});
			setLoading(true);
		} else {
			checkPassword();
			checkLogin();
			if (type === 'email') checkEmail();
		}
	};
	const regAccount = () => {

		if (callback && checkLogin() && checkPassword() && checkConfirm() && (type !== 'login' ? checkEmail() : true)) {
			callback({
				type: "registration",
				login: login,
				email: email,
				password: password,
				feedback: feedback,
			});
			setLoading(true);
		} else {
			checkConfirm();
			checkPassword();
			if (type !== 'login') checkEmail();
			checkLogin();
		}
	};
	const resetPassword = () => {

		if (callback && checkEmail()) {
			callback({
				type: "resetPassword",
				email: email,
				feedback: feedback,
			});
			setLoading(true);
		} else {
			checkEmail();
		}
	};

	return (
		<div className={s.Authorization}>
			{/* ===== LOADING ====== */}
			{loading &&
			<div className={s.loading}>
				<div className={s.ldsRing}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>}

			{/* ====== CLOSE-WINDOW-BTN ======*/}
			{isCloseWindowBtn &&
			<div className={s.closeWindow} onClick={callBackCloseWindow}>
				<div></div>
				<div></div>
			</div>
			}

			{/* ====== LOGIN ======*/}
			{mode === 'login' &&
			<div className={s.mode__login}>
				<div className={s.header}>
					<span className={s.header__login}>Войти</span>
					{isRegister && <span className={s.header__link} onClick={() => changeMode('registration')}>
              Регистрация</span>}
				</div>
				<div className={s.main}>
					<div className={s.main__error}> {messageText} </div>
					<div className={s.main__login}>
						{type === 'email-login' &&
						<input type="text" placeholder='введите логин или e-mail' value={login} onBlur={checkLogin}
									 style={{border: `${errorLoginInput ? 'red' : 'gray'} solid 1px`}}
									 onChange={e => {
										 setLogin(e.target.value);
										 setMessageText('')
									 }}/>}
						{type === 'email' &&
						<input type="text" placeholder='введите e-mail' value={login} onBlur={checkEmail}
									 style={{border: `${errorLoginInput ? 'red' : 'gray'} solid 1px`}}
									 onChange={e => {
										 setLogin(e.target.value);
										 setEmail(e.target.value);
										 setMessageText('')
									 }}/>}
						{type === 'login' &&
						<input type="text" placeholder='введите логин' value={login} onBlur={checkLogin}
									 style={{border: `${errorLoginInput ? 'red' : 'gray'} solid 1px`}}
									 onChange={e => {
										 setLogin(e.target.value);
										 setMessageText('')
									 }}/>}
					</div>
					<div className={s.main__password}>
						<input type="password" placeholder='введите пароль' value={password} onBlur={checkPassword}
									 style={{border: `${errorPasswordInput ? 'red' : 'gray'} solid 1px`}}
									 onChange={e => {
										 setPassword(e.target.value);
										 setMessageText('');
									 }}/>
					</div>
					<div className={s.main__btn} onClick={loginIn}> Войти</div>
				</div>
				<div className={s.bottom} style={{gridTemplateColumns: `${!isRememberMe ? "1fr" : "1fr 1fr"}`}}>
					{isRememberMe &&
					<div className={s.bottom_remember}>
						<input type="checkbox" value={remember} onChange={() => {
							setRemember(!remember)
						}}/>
						<span>Запомнить</span>
					</div>}
					{isResetPassword && type !== 'login' &&
					<div className={s.bottom_resetPassword}>
						<span onClick={() => changeMode('reset')}> Забыли пароль? </span>
					</div>}
				</div>
				{isGoogleLogin &&
				<div className={s.googleLogin}>
					<div className={s.or}><span> or </span></div>
					<span id='googleBtn' className={s.googleLoginBtn} onClick={clickGoogleBtn}> войти через Google </span>
				</div>}
			</div>}

			{/* ===== REGISTRATION =====*/}
			{mode === 'registration' &&
			<div className={s.mode__registration}>
				<div className={s.header}>
					<span className={s.header__login}>Регистрация</span>
					{isLogin && <span className={s.header__link} onClick={() => changeMode('login')}> Вход </span>}
				</div>
				<div className={s.main}>
					<div className={s.main__error}>{messageText}</div>
					{(type === 'login' || type === 'email-login') &&
					<div className={s.main__login}>
						<input type="text" placeholder='login' value={login} onBlur={checkLogin}
									 style={{border: `${errorLoginInput ? 'red' : 'gray'} solid 1px`}}
									 onChange={e => {
										 setLogin(e.target.value);
										 setMessageText('')
									 }}/>
					</div>}
					{(type === 'email' || type === 'email-login') &&
					<div className={s.main__email}>
						<input type="email" placeholder='e-mail' value={email} onBlur={checkEmail}
									 style={{border: `${errorEmailInput ? 'red' : 'gray'} solid 1px`}}
									 onChange={e => {
										 setEmail(e.target.value);
										 setMessageText('')
									 }}/>
					</div>}
					<div className={s.main__password}>
						<input type="password" placeholder='password' value={password} onBlur={checkPassword}
									 style={{border: `${errorPasswordInput ? 'red' : 'gray'} solid 1px`}}
									 onChange={e => {
										 setPassword(e.target.value);
										 setMessageText('')
									 }}/>
					</div>
					<div className={s.main__confirm}>
						<input type="password" placeholder='confirm password' value={confirm} onBlur={checkConfirm}
									 style={{border: `${errorConfirmInput ? 'red' : 'gray'} solid 1px`}}
									 onChange={e => {
										 setConfirm(e.target.value);
										 setMessageText('')
									 }}/>
					</div>
					<div className={s.main__btn + ' ' + s.regBtn} onClick={regAccount}> Регистрация</div>
				</div>
			</div>}

			{/* ===== RESET PASSWORD =====*/}
			{mode === 'reset' &&
			<div className={s.mode__reset}>
				<div className={s.header}>
					<span className={s.header__login}>Востановление</span>
					{isLogin && <span className={s.header__link} onClick={() => changeMode('login')}>Вход</span>}
				</div>
				<div className={s.main}>
					<div className={s.main__error}
							 style={{color: `${messageType === 'error' ? 'red' : 'green'}`}}> {messageText} </div>
					<div className={s.main__email}>
						<input type="email" placeholder='e-mail' value={email}
									 style={{border: `${errorEmailInput ? 'red' : 'gray'} solid 1px`}}
									 onChange={e => setEmail(e.target.value)} onBlur={checkEmail}/>
					</div>
					<div className={s.main__btn + ' ' + s.regBtn} onClick={resetPassword}> Отправить</div>
				</div>
			</div>}
		</div>
	)
};

export default Authorization;
