import React, { useEffect, useState } from "react";
import crudService from "../appwrite/CRUD";
import Banner from "./Banner";
import Auth from "../appwrite/Auth";
import { redirect, useNavigate } from "react-router-dom";

function Home() {
  console.log("Rendering Home");

  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [banner, setBanner] = useState("");

  const save = async (e) => {
    e.preventDefault();

    if (url != "" && username != "" && password != "") {
      try {
        let res = await crudService.create(url, username, password);
        if (!res)
          setBanner(
            <Banner
              msg="something went wrong"
              setBanner={setBanner}
              color="red-500"
            />
          );
        else
          setBanner(
            <Banner
              msg="password is added successfully !!"
              setBanner={setBanner}
            />
          );
      } catch (error) {
        console.log(error);
      }
    } else {
      setBanner(
        <Banner
          msg={"fill in all the fields properly"}
          setBanner={setBanner}
          color="black"
        />
      );
    }
  };

  useEffect(() => {
    // Auth.login("random10@gmail.com", "12345678").then((res) =>
    //   console.log(res)
    // );
    // Auth.get().then((res) => console.log(res));
  });

  return (
    <>
      <div
        className=" h-4/5 grid place-items-center bg-orange-300 relative"
        style={{ background: "#36C2CE" }}
      >
        {banner}
        <div className="h-3/4 w-3/4 p-4 font-serif">
          <div className=" font-bold capitalize text-center text-4xl">
            Add Password
          </div>
          <div className="mt-8">
            <form action="" className="flex flex-col gap-4 w-3/4 input-box">
              <div className="flex gap-4  items-center justify-between">
                <label htmlFor="url" className="font-semibold text-xl">
                  Enter url :{""}
                </label>
                <input
                  type="url"
                  name=""
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="rounded-full py-2 px-4 w-96  ml-16 outline-none border-none focus:outline-green-600"
                />
              </div>
              <div className="flex gap-4  items-center justify-between">
                <label htmlFor="url" className="font-semibold text-xl">
                  Enter username :{" "}
                </label>
                <input
                  type="text"
                  name=""
                  id="url"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-full py-2 px-4 w-96 outline-none border-none focus:outline-green-600"
                />
              </div>
              <div className="flex gap-4  items-center justify-between">
                <label htmlFor="url" className="font-semibold text-xl">
                  Enter password :{" "}
                </label>
                <input
                  type="password"
                  name=""
                  id="url"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full py-2 px-4 w-96 outline-none border-none focus:outline-green-600"
                />
              </div>
              <input
                type="submit"
                className="bg-green-600 px-6 py-2 w-28 rounded-full"
                onClick={save}
                value={"save"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
