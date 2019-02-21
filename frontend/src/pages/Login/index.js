import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import IsEmail from "isemail-es5";
import sha256 from "sha256";
import Login from "./Login";
import {
  getTokenFromStorage, 
  saveTokenInStorage, 
  getCurrentProject,
  saveUserName
} from "../../utils/storage";
import { sendLogin } from "../../services/requestsInterface";
import "react-toastify/dist/ReactToastify.min.css";


class LoginWrapper extends Component {
  constructor() {
    super();
    this.state = {
      inputEmail: {
        value: "",
        isValid: false,
      },
      inputPassword: {
        value: "",
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
      <Redirect to="/proyectos" />
    ) : (
      <div className="wrapper-out">
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

  componentDidMount() {
    if (getCurrentProject()) {
      this.setState({ successLogin: true });
    }
    else {
      if (getTokenFromStorage()) {
        this.setState({ successLogin: true });
      }
    }
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
    }, async () => {
      const formValues = {
        correo: this.state.inputEmail.value,
        contrasena: sha256(this.state.inputPassword.value),
      };
      const { status, body } = await sendLogin(formValues);
      if (status === 200) {
        saveTokenInStorage(body.token);
        saveUserName(body.nombres);

        setTimeout(() => {
          this.setState({ successLogin: true });
        }, 2000);
      } else {
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
        toast.error(body.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          className: "custom-notification-background",
        });
      }
    });
  }

  handleChangeInputEmailValue = (ev) => {
    const inputValue = ev.target.value;
    const isValidInputValue = IsEmail.validate(inputValue);
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
}

export default LoginWrapper;
