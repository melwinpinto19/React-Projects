import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Auth from "../appwrite/Auth";
import Msg from "./Msg";

function Login({ type = "Login" }) {
  console.log("render", Math.random());

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let switchComponent = "";
  let switchSubmitBtn = "";
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => setMsg(""), []);

  const login = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg(<Msg msg="Please fill in all the fields" />);
    } else {
      Auth.login(email, password).then((res) => {
        if (res) {
          navigate("/");
        } else {
          navigate("/login");
        }
      });
    }
  };

  const register = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg(<Msg msg="Please fill in all the fields" />);
    } else {
      Auth.createAccount(email, password).then((res) => {
        if (res) {
          Auth.login(email, password).then((res) => {
            if (res) navigate("/");
          });
        } else {
          navigate("/register");
        }
      });
    }
  };

  // switching signup signin link component:
  if (type == "Login") {
    switchComponent = (
      <NavLink to="/register">
        <div className="text-center mt-8">Sign Up</div>
      </NavLink>
    );
    switchSubmitBtn = (
      <button
        className="mt-3 w-full text-center bg-gradient-to-r from-cyan-500 to-blue-500 py-2 rounded-full "
        onClick={login}
      >
        {type}
      </button>
    );
  } else {
    switchComponent = (
      <NavLink to="/login">
        <div className="text-center mt-8">Sign In</div>
      </NavLink>
    );
    switchSubmitBtn = switchSubmitBtn = (
      <button
        className="mt-3 w-full text-center bg-gradient-to-r from-cyan-500 to-blue-500 py-2 rounded-full "
        onClick={register}
      >
        {type}
      </button>
    );
  }

  return (
    <>
      <div className="h-screen w-full  bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-evenly">
        <div className="text-6xl font-bold">PSX</div>
        <div className="bg-white h-2/4 w-96 p-3 pt-7 rounded-lg">
          <h2 className="text-center text-3xl ">{type}</h2>
          <form action="">
            <div className="flex flex-col">
              {msg}
              <label htmlFor="">Email :</label>
              <input
                type="email"
                className="border-2 border-black outline-none px-2 py-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="random@gmail.com"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="">Password :</label>
              <input
                type="password"
                className="border-2 border-black outline-none px-2 py-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {switchSubmitBtn}
            <input
              type="reset"
              value="reset"
              className="mt-3 w-full text-center bg-black text-white py-2 rounded-full"
              onClick={() => {
                setEmail("");
                setPassword("");
              }}
            />
          </form>
          {switchComponent}
        </div>
      </div>
    </>
  );
}

export default Login;
