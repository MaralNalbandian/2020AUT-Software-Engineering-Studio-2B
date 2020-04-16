import React, { Component } from "react";
import axios from "axios";
import { getHeaderToken } from "./Authentication/JwtConfig";
import Navbar from "./NavBar";
//import baby from "./assets/baby.gif";
//import relatable from "./assets/relatable.jpg";
//import fire from "./assets/fire.jpg";
//import toe from "./assets/toe.jpg";

import "./Task/Home.scss";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };

    axios
      .get("/protected", { headers: { Authorization: getHeaderToken() } })
      .then((res) => {
        this.setState({
          user: res.data,
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div>
          <section class="hero">
            <div class="hero-body">
              <div>
                <h1 class="title">
                  You are now logged in. This is the listing of teams!
                </h1>
                <p>Here you can view the lists of teams you are involved with. If you are a manager you can edit them and assign people to teams.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
