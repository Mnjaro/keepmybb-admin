import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <Link to="/users">
            <li>Utilisateurs</li>
          </Link>
          <Link to="/posts">
            <li>Publications</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
