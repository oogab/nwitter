import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Navigation = ({ userObj, userDisplayName }) => <nav>
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/profile">{userDisplayName}의 Profile</Link>
        </li>
    </ul>
</nav>

export default Navigation