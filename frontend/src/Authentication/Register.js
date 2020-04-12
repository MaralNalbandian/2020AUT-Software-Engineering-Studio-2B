import React, { Component } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getToken } from "./JwtConfig";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      RegistrationSuccessful: Boolean,
      userType: "Employee",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  componentDidMount() {
    const jwt = getToken();
    if (jwt) {
      this.props.history.push("/Home");
    }
  }

  form = {
    width: "40%",
    margin: "0 auto",
    marginTop: "2%",
  };

  formContainer = {
    width: "100%",
    textAlign: "center",
  };

  submitButton = {
    marginTop: "1%",
  };

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRegister() {
    axios
      .post("/registration", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        userType: this.state.userType
      })
      .then(
        (res) => {
          Cookies.set("auth-cookie", res.data.access_token);
          this.props.history.push("/Home");
        },
        (error) => {
          this.setState({ RegistrationSuccessful: false });
        }
      );
  }

  emptyFields() {
    return (
      this.state.name == "" ||
      this.state.email == "" ||
      this.state.password == ""
    );
  }

  onRadioChange = (e) => {
    this.setState({
      userType: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <div style={this.formContainer}>
          <div style={this.form}>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Name"
                  onChange={this.handleInputChange}
                  name="name"
                ></input>
              </div>
            </div>
            <div class="field">
              <input
                class="input"
                type="text"
                placeholder="Email"
                onChange={this.handleInputChange}
                name="email"
              ></input>
            </div>
            <div class="field">
              <input
                class="input"
                type="password"
                placeholder="Password"
                onChange={this.handleInputChange}
                name="password"
              ></input>
            </div>
            <div class="control">
              <label class="radio">
                <input
                  type="radio"
                  checked={this.state.userType === "Employee"}
                  onChange={this.onRadioChange}
                  value="Employee"
                />
                Employee
              </label>
              <label class="radio">
                <input
                  type="radio"
                  checked={this.state.userType === "Manager"}
                  onChange={this.onRadioChange}
                  value="Manager"
                />
                Manager
              </label>
            </div>
          </div>
          <button
            style={this.submitButton}
            onClick={this.handleRegister}
            disabled={this.emptyFields()}
            class="button is-primary"
          >
            Register
          </button>
          {this.state.RegistrationSuccessful == false && (
            <h1>Registration failed</h1>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
