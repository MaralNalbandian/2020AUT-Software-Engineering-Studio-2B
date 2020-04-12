import React, { Component } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getToken } from "./JwtConfig";
import { Button, Header, Grid, Form } from "semantic-ui-react";

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
        userType: this.state.userType,
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
      <div class="backgroundimg">
        <div className="container">
          <Grid className="card" style={{ width: "50%" }}>
            <Grid.Column width={16}>
              <Grid stackable style={{ width: "100%" }}>
                <Grid.Row>
                  <Grid.Column>
                    <Header className="htn">Register</Header>
                    <Form onSubmit={this.handleRegister}>
                      <Form.Field>
                        <input
                          className="regis_input_type2"
                          name="name"
                          type="text"
                          placeholder="Name"
                          style={{ width: "100%" }}
                          onChange={this.handleChange}
                          value={this.state.name}
                          onChange={this.handleInputChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <input
                          name="email"
                          className="regis_input_type2"
                          placeholder="Email"
                          style={{ width: "100%" }}
                          type="email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <input
                          name="password"
                          className="regis_input_type2"
                          placeholder="Password"
                          style={{ width: "100%" }}
                          type="password"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                        />
                      </Form.Field>
                      <Form.Field>
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
                      </Form.Field>
                      <Form.Field>
                        <Button className="btn_submit" type="submit"
                        disabled={this.emptyFields()}>
                          Sign Up
                        </Button>
                      </Form.Field>
                      <Form.Field>
                        <p
                          className="font-sm"
                          style={{ float: "right" }}
                          onClick={() => {
                            this.props.history.push({
                              pathname: `/Login`,
                            });
                          }}
                        >
                          Login
                        </p>
                      </Form.Field>
                      <Form.Field>
                        {this.state.RegistrationSuccessful == false && (
                          <h1>Registration failed</h1>
                        )}
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
