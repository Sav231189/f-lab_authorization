function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var s = {"Authorization":"_3Pst_","mode__login":"_1rzPq","mode__registration":"_2-d5N","mode__reset":"_qKZaN","header":"_1J4aN","header__login":"_3f8O4","header__link":"_3Y6RY","main":"_2DeOL","main__error":"_2cmLq","main__btn":"_2Tanz","regBtn":"_33SGF","bottom":"_1PQWS","bottom_remember":"_1iWl9","bottom_resetPassword":"_3FP_5","googleLogin":"_11ZB1","or":"_2Y0kr","googleLoginBtn":"_1QRA5","loading":"_3RXdv","ldsRing":"_1FT4O","lds-ring":"_1TG0p","closeWindow":"_28o95"};

var Authorization = function Authorization(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'email' : _ref$type,
      _ref$startWindow = _ref.startWindow,
      startWindow = _ref$startWindow === void 0 ? 'login' : _ref$startWindow,
      _ref$isRememberMe = _ref.isRememberMe,
      isRememberMe = _ref$isRememberMe === void 0 ? true : _ref$isRememberMe,
      _ref$isLogin = _ref.isLogin,
      isLogin = _ref$isLogin === void 0 ? true : _ref$isLogin,
      _ref$isRegister = _ref.isRegister,
      isRegister = _ref$isRegister === void 0 ? true : _ref$isRegister,
      _ref$isResetPassword = _ref.isResetPassword,
      isResetPassword = _ref$isResetPassword === void 0 ? true : _ref$isResetPassword,
      _ref$isCloseWindowBtn = _ref.isCloseWindowBtn,
      isCloseWindowBtn = _ref$isCloseWindowBtn === void 0 ? true : _ref$isCloseWindowBtn,
      _ref$isGoogleLogin = _ref.isGoogleLogin,
      isGoogleLogin = _ref$isGoogleLogin === void 0 ? false : _ref$isGoogleLogin,
      _ref$closeWindow = _ref.closeWindow,
      closeWindow = _ref$closeWindow === void 0 ? function () {} : _ref$closeWindow,
      _ref$callback = _ref.callback,
      callback = _ref$callback === void 0 ? function () {} : _ref$callback,
      _ref$clickGoogleBtn = _ref.clickGoogleBtn,
      clickGoogleBtn = _ref$clickGoogleBtn === void 0 ? function () {} : _ref$clickGoogleBtn;

  var _useState = React.useState('error'),
      messageType = _useState[0],
      setMessageType = _useState[1];

  var _useState2 = React.useState(''),
      messageText = _useState2[0],
      setMessageText = _useState2[1];

  var _useState3 = React.useState(false),
      loading = _useState3[0],
      setLoading = _useState3[1];

  var _useState4 = React.useState(startWindow),
      mode = _useState4[0],
      setMode = _useState4[1];

  var _useState5 = React.useState(''),
      login = _useState5[0],
      setLogin = _useState5[1];

  var _useState6 = React.useState(''),
      email = _useState6[0],
      setEmail = _useState6[1];

  var _useState7 = React.useState(''),
      password = _useState7[0],
      setPassword = _useState7[1];

  var _useState8 = React.useState(''),
      confirm = _useState8[0],
      setConfirm = _useState8[1];

  var _useState9 = React.useState(false),
      remember = _useState9[0],
      setRemember = _useState9[1];

  var _useState10 = React.useState(false),
      errorLoginInput = _useState10[0],
      setErrorLoginInput = _useState10[1];

  var _useState11 = React.useState(false),
      errorEmailInput = _useState11[0],
      setErrorEmailInput = _useState11[1];

  var _useState12 = React.useState(false),
      errorPasswordInput = _useState12[0],
      setErrorPasswordInput = _useState12[1];

  var _useState13 = React.useState(false),
      errorConfirmInput = _useState13[0],
      setErrorConfirmInput = _useState13[1];

  var feedback = function feedback(_ref2) {
    var type = _ref2.type,
        message = _ref2.message;
    setLoading(false);
    setMessageText(message);
    setMessageType(type);
  };

  var callBackCloseWindow = function callBackCloseWindow() {
    closeWindow();
    setErrorLoginInput(false);
    setErrorEmailInput(false);
    setErrorPasswordInput(false);
    setErrorConfirmInput(false);
    setMessageText('');
    setPassword('');
  };

  var changeMode = function changeMode(mode) {
    setMode(mode);
    setErrorLoginInput(false);
    setErrorEmailInput(false);
    setErrorPasswordInput(false);
    setErrorConfirmInput(false);
    setMessageText('');
    setPassword('');
  };

  var checkLogin = function checkLogin() {
    if (login.length < 4 || login.length > 30) {
      setErrorLoginInput(true);
      setMessageText('Логин может быть от 4-х до 30 символов.');
      return false;
    }

    setErrorLoginInput(false);
    return true;
  };

  var checkEmail = function checkEmail() {
    function validateEmail(e) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  var checkPassword = function checkPassword() {
    if (password.length < 4 || password.length > 30) {
      setMessageText('Пароль должен сожержать от 4 до 30 символов.');
      setErrorPasswordInput(true);
      return false;
    }

    setErrorPasswordInput(false);
    return true;
  };

  var checkConfirm = function checkConfirm() {
    if (password.length !== confirm.length || !password.includes(confirm)) {
      setMessageText('Пароли не совпадают.');
      setErrorConfirmInput(true);
      return false;
    }

    setErrorConfirmInput(false);
    return true;
  };

  var loginIn = function loginIn() {
    if (callback && checkPassword() && checkLogin() && (type === 'email' ? checkEmail() : true)) {
      callback({
        type: "loginIn",
        login: login,
        password: password,
        remember: remember,
        feedback: feedback
      });
      setLoading(true);
    } else {
      checkPassword();
      checkLogin();
      if (type === 'email') checkEmail();
    }
  };

  var regAccount = function regAccount() {
    if (callback && checkLogin() && checkPassword() && checkConfirm() && (type !== 'login' ? checkEmail() : true)) {
      callback({
        type: "registration",
        login: login,
        email: email,
        password: password,
        feedback: feedback
      });
      setLoading(true);
    } else {
      checkConfirm();
      checkPassword();
      if (type !== 'login') checkEmail();
      checkLogin();
    }
  };

  var resetPassword = function resetPassword() {
    if (callback && checkEmail()) {
      callback({
        type: "resetPassword",
        email: email,
        feedback: feedback
      });
      setLoading(true);
    } else {
      checkEmail();
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: s.Authorization
  }, loading && /*#__PURE__*/React__default.createElement("div", {
    className: s.loading
  }, /*#__PURE__*/React__default.createElement("div", {
    className: s.ldsRing
  }, /*#__PURE__*/React__default.createElement("div", null), /*#__PURE__*/React__default.createElement("div", null), /*#__PURE__*/React__default.createElement("div", null), /*#__PURE__*/React__default.createElement("div", null))), isCloseWindowBtn && /*#__PURE__*/React__default.createElement("div", {
    className: s.closeWindow,
    onClick: callBackCloseWindow
  }, /*#__PURE__*/React__default.createElement("div", null), /*#__PURE__*/React__default.createElement("div", null)), mode === 'login' && /*#__PURE__*/React__default.createElement("div", {
    className: s.mode__login
  }, /*#__PURE__*/React__default.createElement("div", {
    className: s.header
  }, /*#__PURE__*/React__default.createElement("span", {
    className: s.header__login
  }, "\u0412\u043E\u0439\u0442\u0438"), isRegister && /*#__PURE__*/React__default.createElement("span", {
    className: s.header__link,
    onClick: function onClick() {
      return changeMode('registration');
    }
  }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F")), /*#__PURE__*/React__default.createElement("div", {
    className: s.main
  }, /*#__PURE__*/React__default.createElement("div", {
    className: s.main__error
  }, " ", messageText, " "), /*#__PURE__*/React__default.createElement("div", {
    className: s.main__login
  }, type === 'email-login' && /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 e-mail",
    value: login,
    onBlur: checkLogin,
    style: {
      border: (errorLoginInput ? 'red' : 'gray') + " solid 1px"
    },
    onChange: function onChange(e) {
      setLogin(e.target.value);
      setMessageText('');
    }
  }), type === 'email' && /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 e-mail",
    value: login,
    onBlur: checkEmail,
    style: {
      border: (errorLoginInput ? 'red' : 'gray') + " solid 1px"
    },
    onChange: function onChange(e) {
      setLogin(e.target.value);
      setEmail(e.target.value);
      setMessageText('');
    }
  }), type === 'login' && /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D",
    value: login,
    onBlur: checkLogin,
    style: {
      border: (errorLoginInput ? 'red' : 'gray') + " solid 1px"
    },
    onChange: function onChange(e) {
      setLogin(e.target.value);
      setMessageText('');
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: s.main__password
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "password",
    placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C",
    value: password,
    onBlur: checkPassword,
    style: {
      border: (errorPasswordInput ? 'red' : 'gray') + " solid 1px"
    },
    onChange: function onChange(e) {
      setPassword(e.target.value);
      setMessageText('');
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: s.main__btn,
    onClick: loginIn
  }, " \u0412\u043E\u0439\u0442\u0438")), /*#__PURE__*/React__default.createElement("div", {
    className: s.bottom,
    style: {
      gridTemplateColumns: "" + (!isRememberMe ? "1fr" : "1fr 1fr")
    }
  }, isRememberMe && /*#__PURE__*/React__default.createElement("div", {
    className: s.bottom_remember
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "checkbox",
    value: remember,
    onChange: function onChange() {
      setRemember(!remember);
    }
  }), /*#__PURE__*/React__default.createElement("span", null, "\u0417\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C")), isResetPassword && type !== 'login' && /*#__PURE__*/React__default.createElement("div", {
    className: s.bottom_resetPassword
  }, /*#__PURE__*/React__default.createElement("span", {
    onClick: function onClick() {
      return changeMode('reset');
    }
  }, " \u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C? "))), isGoogleLogin && /*#__PURE__*/React__default.createElement("div", {
    className: s.googleLogin
  }, /*#__PURE__*/React__default.createElement("div", {
    className: s.or
  }, /*#__PURE__*/React__default.createElement("span", null, " or ")), /*#__PURE__*/React__default.createElement("span", {
    id: "googleBtn",
    className: s.googleLoginBtn,
    onClick: clickGoogleBtn
  }, " \u0432\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 Google "))), mode === 'registration' && /*#__PURE__*/React__default.createElement("div", {
    className: s.mode__registration
  }, /*#__PURE__*/React__default.createElement("div", {
    className: s.header
  }, /*#__PURE__*/React__default.createElement("span", {
    className: s.header__login
  }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"), isLogin && /*#__PURE__*/React__default.createElement("span", {
    className: s.header__link,
    onClick: function onClick() {
      return changeMode('login');
    }
  }, " \u0412\u0445\u043E\u0434 ")), /*#__PURE__*/React__default.createElement("div", {
    className: s.main
  }, /*#__PURE__*/React__default.createElement("div", {
    className: s.main__error
  }, messageText), (type === 'login' || type === 'email-login') && /*#__PURE__*/React__default.createElement("div", {
    className: s.main__login
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    placeholder: "login",
    value: login,
    onBlur: checkLogin,
    style: {
      border: (errorLoginInput ? 'red' : 'gray') + " solid 1px"
    },
    onChange: function onChange(e) {
      setLogin(e.target.value);
      setMessageText('');
    }
  })), (type === 'email' || type === 'email-login') && /*#__PURE__*/React__default.createElement("div", {
    className: s.main__email
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "email",
    placeholder: "e-mail",
    value: email,
    onBlur: checkEmail,
    style: {
      border: (errorEmailInput ? 'red' : 'gray') + " solid 1px"
    },
    onChange: function onChange(e) {
      setEmail(e.target.value);
      setMessageText('');
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: s.main__password
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "password",
    placeholder: "password",
    value: password,
    onBlur: checkPassword,
    style: {
      border: (errorPasswordInput ? 'red' : 'gray') + " solid 1px"
    },
    onChange: function onChange(e) {
      setPassword(e.target.value);
      setMessageText('');
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: s.main__confirm
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "password",
    placeholder: "confirm password",
    value: confirm,
    onBlur: checkConfirm,
    style: {
      border: (errorConfirmInput ? 'red' : 'gray') + " solid 1px"
    },
    onChange: function onChange(e) {
      setConfirm(e.target.value);
      setMessageText('');
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: s.main__btn + ' ' + s.regBtn,
    onClick: regAccount
  }, " \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"))), mode === 'reset' && /*#__PURE__*/React__default.createElement("div", {
    className: s.mode__reset
  }, /*#__PURE__*/React__default.createElement("div", {
    className: s.header
  }, /*#__PURE__*/React__default.createElement("span", {
    className: s.header__login
  }, "\u0412\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435"), isLogin && /*#__PURE__*/React__default.createElement("span", {
    className: s.header__link,
    onClick: function onClick() {
      return changeMode('login');
    }
  }, "\u0412\u0445\u043E\u0434")), /*#__PURE__*/React__default.createElement("div", {
    className: s.main
  }, /*#__PURE__*/React__default.createElement("div", {
    className: s.main__error,
    style: {
      color: "" + (messageType === 'error' ? 'red' : 'green')
    }
  }, " ", messageText, " "), /*#__PURE__*/React__default.createElement("div", {
    className: s.main__email
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "email",
    placeholder: "e-mail",
    value: email,
    style: {
      border: (errorEmailInput ? 'red' : 'gray') + " solid 1px"
    },
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    },
    onBlur: checkEmail
  })), /*#__PURE__*/React__default.createElement("div", {
    className: s.main__btn + ' ' + s.regBtn,
    onClick: resetPassword
  }, " \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"))));
};

module.exports = Authorization;
//# sourceMappingURL=index.js.map
