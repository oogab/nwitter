import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userDisplayName }) => <nav>
  <ul
    style={{
      display: "flex",
      fontSize: 12,
    }}
  >
    <li>
      <Link
        to="/"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        <span style={{ marginTop: 10 }}>
          Home
        </span>
      </Link>
    </li>
    <li>
      <Link
        to="/profile"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
        <span style={{ marginTop: 10 }}>
          {userDisplayName
            ? `${userDisplayName}의 Profile`
            : "Profile"}
        </span>
      </Link>
    </li>
  </ul>
</nav>

export default Navigation