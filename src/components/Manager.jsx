import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuid4 } from "uuid";
import useSize from "../hooks/useSize";

const Manager = () => {
  const windowSize = useSize();
  const eyeRef = useRef();
  const knightRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleEye = (e) => {
    if (e.target.src.includes("eye-closed")) {
      eyeRef.current.type = "text";
      e.target.src = "eye-open.svg";
      e.target.classList.add(`top-[5px] `);
    } else {
      eyeRef.current.type = "password";
      e.target.src = "eye-closed.svg";
      e.target.classList.remove(`top-[5px]`);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // ISKO BAAR BAAR DEKH KE ACHE SE LOGIC SAMAJHO AUR SMART BANO
  };

  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      toast.warn("Please enter valid data!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setPasswordArray([...passwordArray, { ...form, id: uuid4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuid4() }])
    );
    toast.success("Password Saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setForm({ site: "", username: "", password: "" });
    knightRef.current.classList.add("knight");
    setTimeout(() => {
      knightRef.current.classList.remove("knight");
    }, 2500);
    console.log([...passwordArray, form]);
  };

  const copyTOClipboard = (text) => {
    toast("🦄 text copied!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const editPassword = (id) => {
    if (form.site || form.username || form.password) {
      setPasswordArray(passwordArray.push(form));
      // setPasswordArray([...passwordArray, form]);
    }
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast.success("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />

      <div className="absolute inset-0 -z-10 overflow-auto h-[100vh] w-full bg-white [background:radial-gradient(125%_125%_at_50%_40%,#fff_40%,#63e_100%)]">
        <div className="px-4 py-8 flex flex-col gap-24">
          <div className="upper md:px-44 lg:px-56 xl:px-32 mt-5">
            <header className="hero text-center mb-4">
              <div className="logo text-3xl font-bold flex flex-col justify-center items-center">
                <img
                  ref={knightRef}
                  src="pk-golo.png"
                  alt="logo"
                  className="w-[76px] md:w-24 md:opacity-0"
                />
                <div>
                  <span className="text-purple-600">&lt;</span>Pass
                  <span className="text-purple-600">Knight/&gt;</span>
                </div>
              </div>
              <p className="info text-sm">Your own Password Manager</p>
            </header>
            <div className="formArea flex flex-col gap-4 text-base lg:px-20 xl:px-64 items-center">
              <input
                value={form.site}
                name="site"
                onChange={handleFormChange}
                placeholder="Enter Website URL:"
                type="text"
                className="w-full rounded-full border border-purple-600 px-3 py-0.5 md:pb-1"
              />
              <div className="flex flex-col md:flex-row w-full gap-4">
                <input
                  value={form.username}
                  name="username"
                  onChange={handleFormChange}
                  placeholder="Enter Username:"
                  type="text"
                  className="w-full rounded-full border border-purple-600 px-3 py-0.5 md:pb-1"
                />
                <div className="relative w-full">
                  <input
                    ref={eyeRef}
                    value={form.password}
                    name="password"
                    onChange={handleFormChange}
                    placeholder="Enter Password:"
                    type="password"
                    className="w-full rounded-full border border-purple-600 px-3 py-0.5 md:pb-1"
                  />
                  <img
                    src="eye-closed.svg"
                    alt="eye-closed"
                    className="absolute cursor-pointer top-2 right-1.5 w-5"
                    onClick={(e) => handleEye(e)}
                  />
                </div>
              </div>
              <button
                onClick={savePassword}
                className="addPassword bg-purple-600 text-white rounded-full px-6 py-1 flex items-center gap-0.5 active:bg-purple-500 text-base scale-[0.96] hover:scale-100 transition-transform"
              >
                <lord-icon
                  id="addIcon"
                  src="https://cdn.lordicon.com/zrkkrrpl.json"
                  trigger="loop-on-hover"
                  stroke="bold"
                  colors="primary:#121331,secondary:#ffffff"
                ></lord-icon>
                Save
              </button>
            </div>
          </div>

          <div className="passwords text-center">
            <h2 className="text-xl md:text-2xl mb-3">Your Passwords</h2>
            {passwordArray.length ? (
              windowSize[1] >= 800 ? (
                <table className="table-auto mx-auto w-full md:w-[90vw] lg:w-[80vw] xl:w-[65vw] overflow-hidden rounded-xl text-sm md:text-base">
                  <thead className="bg-purple-600 text-white">
                    <tr className="">
                      <th className="px-2 py-1">Website URL</th>
                      <th className="px-2 py-1">Username</th>
                      <th className="px-2 py-1">Password</th>
                      <th className="px-2 py-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-purple-300/60">
                    {passwordArray.map((data, key) => (
                      <tr
                        key={key}
                        className={`${
                          key === passwordArray.length - 1 ? "" : "border-b"
                        } border-gray-400/60`}
                      >
                        <td className="px-2 [&>img]:hover:opacity-100">
                          <a href={data.site} target="_blank">
                            {data.site}
                          </a>
                          <img
                            onClick={() => copyTOClipboard(data.site)}
                            src="copy.png"
                            alt="copy"
                            className="w-4 inline ml-2 top-3.5 right-0 cursor-pointer opacity-0 transition"
                          />
                        </td>
                        <td className="px-2 [&>img]:hover:opacity-100">
                          {data.username}
                          <img
                            onClick={() => copyTOClipboard(data.username)}
                            src="copy.png"
                            alt="copy"
                            className="w-4 inline ml-2 top-3.5 right-0 cursor-pointer opacity-0 transition"
                          />
                        </td>
                        <td className="px-2 [&>img]:hover:opacity-100">
                          <i className="text-gray-500 font-semibold">secret</i>
                          <img
                            onClick={() => copyTOClipboard(data.password)}
                            src="copy.png"
                            alt="copy"
                            className="w-4 inline ml-2 top-3.5 right-0 cursor-pointer opacity-0 transition"
                          />
                        </td>
                        <td className="px-2">
                          <button
                            onClick={() => editPassword(data.id)}
                            className="edit mr-1"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/wuvorxbv.json"
                              trigger="loop-on-hover"
                              stroke="bold"
                              state="hover-line"
                              colors="primary:#6c16c7,secondary:#9333ea"
                              style={{ width: "27px" }}
                            ></lord-icon>
                          </button>
                          <button
                            onClick={() => deletePassword(data.id)}
                            className="delete ml-1"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/wpyrrmcq.json"
                              trigger="loop-on-hover"
                              colors="primary:#6c16c7"
                              style={{ width: "22px" }}
                            ></lord-icon>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="passwordTable flex flex-col gap-4 sm:px-16 text-sm">
                  {passwordArray.map((data, index) => (
                    <div
                      key={index}
                      className=" border-2 border-purple-400 rounded-lg"
                    >
                      <div className="w-full h-full">
                        <div className="passHead text-white font-bold bg-purple-600 gap-1.5 py-2 cursor-pointer flex justify-center items-center rounded-t-md">
                          <a href={data.site}>{data.site}</a>
                          <button
                            onClick={() => copyTOClipboard(data.username)}
                            className="flex items-center"
                          >
                            <img
                              src="copy-black.png"
                              alt="copy"
                              className="w-3.5 inline cursor-pointer opacity-1 transition invert"
                            />
                          </button>
                        </div>
                        <div className="bg-purple-300/60 w-full">
                          <div className="flex gap-1.5 border-b-[0.5px] border-gray-500/25 p-1 justify-center">
                            <p>username:</p>
                            <button
                              onClick={() => copyTOClipboard(data.username)}
                              className="flex gap-1.5 justify-center items-center"
                            >
                              <p className="font-bold">{data.username}</p>
                              <img
                                src="copy.png"
                                alt="copy"
                                className="w-3.5 inline top-3.5 right-0 cursor-pointer opacity-1 transition"
                              />
                            </button>
                          </div>
                          <div className="border-t-[0.5px] border-gray-500/25 flex justify-center gap-1.5 items-center py-1">
                            <p>password:</p>
                            <button
                              onClick={() => copyTOClipboard(data.site)}
                              className="flex gap-1.5 justify-center items-center"
                            >
                              <p className="text-gray-500 font-bold">
                                <i>secret</i>
                              </p>
                              <img
                                src="copy.png"
                                alt="copy"
                                className="w-3.5 inline top-3.5 right-0 cursor-pointer opacity-1 transition"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className="bg-white/40 flex sm:flex-row border-t border-purple-600 rounded-b-md">
                        <button
                          onClick={() => editPassword(data.id)}
                          className="edit p-1 flex items-center justify-center w-1/2 border-r border-purple-600 active:bg-purple-600/50"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="loop-on-hover"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#6c16c7,secondary:#9333ea"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </button>
                        <button
                          onClick={() => deletePassword(data.id)}
                          className="delete p-1 flex items-center justify-center w-1/2 border-l border-purple-600 active:bg-purple-600/50"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="loop-on-hover"
                            colors="primary:#6c16c7"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <h2 className="text-center text-lg text-red-500">
                add passwords to view them
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
