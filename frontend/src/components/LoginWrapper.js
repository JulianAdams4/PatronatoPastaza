import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Login from './Login';
import 'react-toastify/dist/ReactToastify.min.css';

const NOTIFICATION_DELAY = 5000;

class LoginWrapper extends Component {
  constructor() {
    super();
    this.state = {
      inputEmail: {
        value: '',
        isValid: false,
      },
      inputPassword: {
        value: '',
        isValid: false,
      },
      submitButton: {
        isDisabled: true,
        isLoading: false,
      },
      successLogin: false,
    };
  }

  render() {
    return this.state.successLogin ? (
      <Redirect to="/home" />
    ) : (
      <div>
        <Login
          inputEmailValue={this.state.inputEmail.value}
          inputPasswordValue={this.state.inputPassword.value}
          isDisabledSubmitButton={this.state.submitButton.isDisabled}
          isInputEmailValid={this.state.inputEmail.isValid}
          isInputPasswordValid={this.state.inputPassword.isValid}
          isLoadingSubmitButton={this.state.submitButton.isLoading}
          onClickSubmitLoginForm={this.handleClickSubmitLoginForm}
          onChangeInputEmailValue={this.handleChangeInputEmailValue}
          onChangeInputPasswordValue={this.handleChangeInputPasswordValue}
        />
        <ToastContainer
          transition={Slide}
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover={false}
        />
      </div>

    );
  }

  checkDisableSubmitButton = () => {
    const isValidEmail = this.state.inputEmail.isValid;
    const isValidPass = this.state.inputPassword.isValid;
    const isDisabledSubmitButton = !isValidEmail || !isValidPass;
    this.setState({
      submitButton: {
        isDisabled: isDisabledSubmitButton,
        isLoading: false,
      },
    });
  };

  handleClickSubmitLoginForm = () => {
    this.setState({
      submitButton: {
        isDisabled: true,
        isLoading: true,
      },
    }, () => {
      const formValues = {
        email: this.state.inputEmail.value,
        password: this.state.inputPassword.value, // Need hash
      };
      setTimeout(() => {
        if (formValues.email !== 'jadams@espol.edu.ec') {
          this.setState({
            inputEmail: {
              ...this.state.inputEmail,
              isValid: false,
            },
            inputPassword: {
              ...this.state.inputPassword,
              isValid: false,
            },
            submitButton: {
              isDisabled: false,
              isLoading: false,
            },
          });
          toast.error('Usuario o contraseña incorrectos', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            className: 'custom-notification-background',
          });
        } else {
          this.setState({
            successLogin: true,
          });
        }
      }, NOTIFICATION_DELAY);
    });
  }

  handleChangeInputEmailValue = (ev) => {
    const inputValue = ev.target.value;
    const isValidInputValue = inputValue.length > 1; // temporal
    this.setState({
      inputEmail: {
        value: inputValue,
        isValid: isValidInputValue,
      },
    }, () => {
      this.checkDisableSubmitButton();
    });
  }

  handleChangeInputPasswordValue = (ev) => {
    const inputValue = ev.target.value;
    const isValidInputValue = inputValue.length > 1; // temporal
    this.setState({
      inputPassword: {
        value: inputValue,
        isValid: isValidInputValue,
      },
    }, () => {
      this.checkDisableSubmitButton();
    });
  }

  showNotify = () => {

  }
}

export default LoginWrapper;
