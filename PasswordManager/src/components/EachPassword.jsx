import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

function EachPassword({ data, save, remove }) {
  const { url, username, password, $id } = data;
  const [Url, setUrl] = useState(url);
  const [Username, setUsername] = useState(username);
  const [Password, setPassword] = useState(password);
  const [toggle, setToggle] = useState("Edit");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // password strength caluclator:
  useEffect(() => {
    let lengthScore = Password.length >= 8 ? 1 : 0;
    let lowercaseScore = /[a-z]/.test(Password) ? 1 : 0;
    let uppercaseScore = /[A-Z]/.test(Password) ? 1 : 0;
    let numberScore = /\d/.test(Password) ? 1 : 0;
    let specialCharScore = /[!@#$%^&*(),.?":{}|<>]/.test(Password) ? 1 : 0;

    let totalScore =
      lengthScore +
      lowercaseScore +
      uppercaseScore +
      numberScore +
      specialCharScore;

    switch (totalScore) {
      case 5:
        setPasswordStrength(<div className="text-green-800">Very Strong</div>);
        break;
      case 4:
        setPasswordStrength(<div className="text-green-800">Strong</div>);
        break;
      case 3:
        setPasswordStrength(<div className="text-yellow-600">Moderate</div>);
        break;
      case 2:
        setPasswordStrength(<div className="text-red-700">Weak</div>);
        break;
      default:
        setPasswordStrength(<div className="text-red-700">Very weak</div>);
    }
  }, [Password]);

  let ref1 = useRef();
  let ref2 = useRef();
  let ref3 = useRef();
  let mainRef = useRef(null);

  useGSAP(() => {
    gsap.from(mainRef.current, {
      scale: 0,
      duration: 1,
    });
  });

  const edit = () => {
    if (toggle == "Edit") {
      ref1.current.readOnly = false;
      ref2.current.readOnly = false;
      ref3.current.readOnly = false;

      setToggle("Save");
    } else {
      save($id, { Url, Username, Password });
    }
  };

  return (
    <>
      {/* <div className="">{`${url}->${$id}`}</div> */}
      <div
        className="bg-red-200 m-h-60 w-96 rounded-lg p-4 flex flex-col gap-6 text-pretty text-xl font-sans"
        key={$id}
        ref={mainRef}
      >
        <div className="">
          URL :{" "}
          <input
            type="url"
            className="bg-transparent w-4/5"
            value={Url}
            onChange={(e) => setUrl(e.target.value)}
            ref={ref1}
            readOnly={true}
          />{" "}
        </div>
        <div className="">
          username :{" "}
          <input
            type="text"
            className="bg-transparent w-4/5"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            ref={ref2}
            readOnly={true}
          />
        </div>
        <div className="">
          password :{" "}
          <input
            type="password"
            className="bg-transparent w-4/5"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            ref={ref3}
            readOnly={true}
          />
        </div>
        <div className="">{passwordStrength}</div>
        <div className="flex gap-4">
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
          <button
            className="bg-blue-600 rounded-sm w-52 py-1 px-2 flex items-center justify-center"
            onClick={edit}
          >
            <lord-icon
              src="https://cdn.lordicon.com/wuvorxbv.json"
              trigger="loop"
              style={{ width: "30px", height: "30px" }}
            ></lord-icon>{" "}
            {toggle}
          </button>
          <button
            className="bg-red-600 rounded-sm w-52 py-1 px-2 flex items-center justify-center gap-4"
            onClick={() => remove($id)}
          >
            <lord-icon
              src="https://cdn.lordicon.com/drxwpfop.json"
              trigger="loop"
              style={{ width: "30px", height: "30px" }}
            ></lord-icon>{" "}
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

export default EachPassword;
