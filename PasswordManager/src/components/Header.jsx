import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Auth from "../appwrite/Auth";
import { useNavigate } from "react-router-dom";

function Header() {
  console.log("Rendering Header");
  const [user, setUser] = useState("");

  useEffect(() => {
    (async () => {
      const data = await Auth.get();
      setUser(
        <li className="flex items-center gap-3">
          <lord-icon
            src="https://cdn.lordicon.com/bgebyztw.json"
            trigger="hover"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
          {data?.email}
        </li>
      );
    })();
  }, []);

  const navigate = useNavigate();
  return (
    <div
      className="h-16 w-full flex items-center justify-between px-8"
      style={{ background: "#77E4C8" }}
    >
      <div className="font-bold text-2xl">PSX</div>
      <ul className="flex gap-8 justify-center items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-blue-800" : "text-black"}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/passwords"
            className={({ isActive }) =>
              `${isActive ? "text-blue-800" : "text-black"}`
            }
          >
            Passwords
          </NavLink>
        </li>
        <li>About</li>
        <li
          onClick={() => {
            Auth.logout().then((res) => navigate("/login"));
          }}
        >
          Logout
        </li>
        {user}
      </ul>
    </div>
  );
}

export default Header;
