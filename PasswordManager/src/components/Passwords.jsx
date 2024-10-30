import React, { useEffect, useRef, useState } from "react";
import crudService from "../appwrite/CRUD";
import EachPassword from "./EachPassword";
import { useLoaderData } from "react-router-dom";
import Banner from "./Banner";

function Passwords() {
  console.log("Rendering Passwords");
  const [passwords, setPasswords] = useState([]);
  const [banner, setBanner] = useState("");
  const [flag, setFlag] = useState(true);

  if (flag) {
    if (useLoaderData() == null) {
      setBanner(
        <Banner
          setBanner={setBanner}
          msg="No internet connection"
          color="red-600"
        />
      );
    } else setPasswords(useLoaderData());
    setFlag(false);
  }

  const fun = async () => {
    let data = await crudService.getAllPasswords();
    return data ? setPasswords(data.documents) : setPasswords([]);
  };

  const remove = (id) => {
    crudService.removeDocument(id).then((res) => {
      if (!res)
        setBanner(
          <Banner
            setBanner={setBanner}
            msg="No internet connection"
            color="red-600"
          />
        );
      else {
        setBanner(
          <Banner
            setBanner={setBanner}
            msg="Pasword was removed sucessfully "
          />
        );
        console.log(res);
        fun();
      }
    });
  };

  const save = ($id, data) => {
    try {
      crudService
        .update($id, data)
        .then((res) => {
          console.log(res);
          if (res)
            setBanner(
              <Banner
                setBanner={setBanner}
                msg="Passwrod updated sucessfullly !!"
              />
            );
          else {
            setBanner(
              <Banner
                setBanner={setBanner}
                msg="Something went wrong please check you internet connection !!"
              />
            );
          }
        })
        .catch(() => {});
    } catch (error) {}
  };

  return (
    <div
      className="bg-blue-200 min-h-screen "
      style={{ background: "#36C2CE" }}
    >
      <div className="flex gap-8 p-4 flex-wrap justify-center relative pt-8">
        {banner}
        {passwords.map((obj) => (
          <EachPassword data={obj} save={save} remove={remove} key={obj.$id} />
        ))}
      </div>
    </div>
  );
}

export default Passwords;
