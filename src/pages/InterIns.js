import React, { Component } from "react";
import { Link } from "react-router-dom";
import Instructions from "../Instructions";

export default class InterIns extends Component {
  render() {
    return (
      <div className="info">
        <p class="welcome-alert">
          Здравствуйте,{" "}
          <span>
            {localStorage.getItem("surname")} {localStorage.getItem("name")}
          </span>
          !
        </p>
        {Instructions.longInstruction()}
        <Link to="./inter">
          <button>Начать интервью</button>
        </Link>
      </div>
    );
  }
}
