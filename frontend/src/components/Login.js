import React from 'react';
import PropTypes from 'prop-types';
import './login.scss';

const Login = (props) => {
  const {
    isInputEmailValid,
    inputEmailValue,
    isInputPasswordValid,
    inputPasswordValue,
    onClickSubmitLoginForm,
    isDisabledSubmitButton,
    onChangeInputEmailValue,
    onChangeInputPasswordValue,
    isLoadingSubmitButton,
  } = props;

  const isValidEmailClass = inputEmailValue.length > 0
    ? isInputEmailValid ? '' : 'input-invalid'
    : '';

  const isValidPasswordClass = inputPasswordValue.length > 0
    ? isInputPasswordValid ? '' : 'input-invalid'
    : '';

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <div className="patronato-logo" />
          <input
            className={`input-email ${isValidEmailClass}`}
            type="text"
            placeholder="Email"
            value={inputEmailValue}
            onChange={onChangeInputEmailValue}
          />
          <input
            className={`input-password ${isValidPasswordClass}`}
            type="password"
            placeholder="Contraseña"
            value={inputPasswordValue}
            onChange={onChangeInputPasswordValue}
          />
          <button
            className="button-submit"
            type="submit"
            onClick={onClickSubmitLoginForm}
            disabled={isDisabledSubmitButton}
          >
            {isLoadingSubmitButton ? (
              <Loader />
            ) : (
              <span>Entrar</span>
            )}
          </button>
          <span className="forgot-password">
            ¿Olvidó su contraseña?
          </span>
        </div>
      </div>
      <div className="login-footer" />
    </div>
  );
};

const Loader = () => (
  <div className="login-loader">
    <div />
    <div />
    <div />
    <div />
  </div>
);

Login.propTypes = {
  isInputEmailValid: PropTypes.bool,
  inputEmailValue: PropTypes.string,
  isInputPasswordValid: PropTypes.bool,
  isLoadingSubmitButton: PropTypes.bool,
  inputPasswordValue: PropTypes.string,
  onClickSubmitLoginForm: PropTypes.func,
  isDisabledSubmitButton: PropTypes.bool,
  onChangeInputEmailValue: PropTypes.func,
  onChangeInputPasswordValue: PropTypes.func,
};

export default Login;
