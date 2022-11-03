import { NavLink } from "react-router-dom";
import {url} from '../Globals/constants';
import React from "react";
import Button from "@material-ui/core/Button";
import Logo from "../Img/black_white_logo.png";

function Error() {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        gap: "2rem",
        height: "100vh",
        textAlign: "center",
        background: "linear-gradient(45deg,blue,red",
        color: "white",
      }}
    >
      <div>
        <img
          src={Logo}
          alt="logo"
          style={{ width: "80%", borderBottom: "2px solid black" }}
        />
      </div>
      <div>
        <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
          404 Page Not Found
        </span>
      </div>
      <div>
        <NavLink to={`${url}/`} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary">
            Go to Homepage
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default Error;
