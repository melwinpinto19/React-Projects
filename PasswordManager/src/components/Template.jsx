import React, { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Auth from "../appwrite/Auth";

function Template() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    Auth.get().then((res) => {
      if (res) setLoggedIn(true);
      else navigate("/login");
    });
  }, []);

  if (loggedIn) {
    return (
      <>
        <Header />
        <Outlet></Outlet>
        <Footer />
      </>
    );
  } else return <></>;
}

export default Template;
