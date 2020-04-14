import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import foot from "./assets/foot.jpg";
import "bulma/css/bulma.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    Cookies.remove("auth-cookie");
    this.props.history.push("/login");
  };

  render() {
    return (
      <nav
        class="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a class="navbar-item">
            <img src={foot} width="150" height="110"></img>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a
              class="navbar-item"
              onClick={() => {
                this.props.history.push({
                  pathname: `/home`,
                });
              }}
            >
              Dashboard
            </a>
            <a class="navbar-item">Tasks</a>
            <a class="navbar-item">Timesheets</a>
            <a
              class="navbar-item"
              onClick={() => {
                this.props.history.push({
                  pathname: `/chat`,
                });
              }}
            >
              Chat
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button
                  onClick={() => this.logout()}
                  class="button is-light"
                  type="submit"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
