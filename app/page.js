"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import back from "@/app/Visual.png";
// import Templates from "@/app/Templates.png";
// import Settings from "@/app/Settings.png";
// import Elements from "@/app/Elements.png";
// import textt from "@/app/text.png";
import { CiMobile2 } from "react-icons/ci";
import Loader from "@/app/Loader.png";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IoFlashOutline, IoSettingsOutline } from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";
import { RxDoubleArrowLeft, RxText } from "react-icons/rx";
import { FaBuromobelexperte, FaCrown } from "react-icons/fa6";
import { MdAnimation, MdOutlineCloudUpload, MdSearch } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";
import Fontss from "./Components/Font";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
import {
  setPerf,
  setPremium,
  setReduxActive,
  setRemovePremium,
  setimage,
  showabout,
  switchbg_color,
} from "./redux/reducer/prosite_data";
import style from "./pages/CustomScrollbar.module.css";
import ReactDOMServer from "react-dom/server";
import Button from "./Components/Button";
import Styles from "./Components/Styles";
import Pic from "./assets/pic.json";
import m from "./assets/Main.png";
import Background from "./Components/Background";
import html2canvas from "html2canvas";
import { API, APIPRO } from "@/Essentials";

function page() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [pic1, setPic1] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [text1, setText1] = useState(false);
  const [active, setActive] = useState("");
  const webRef = useRef();
  const [search, setSearch] = useState("");
  const [temp, setTemp] = useState();
  // const h1 = useRef(null);
  // const h2 = useRef(null);
  // const h3 = useRef(null);

  const [limg, setLimg] = useState([]);

  useEffect(() => {
    const i = localStorage.getItem("image");
    const a = JSON.parse(i);
    setLimg(a);
  }, []);

  useEffect(() => {
    const data = sessionStorage.getItem("data");
    const parseData = JSON.parse(data);
    setData(parseData);
    setId(parseData._id);
  }, []);

  // useEffect(() => {
  //   axios.get(`${API}/v1/templates/64b84197281876c462d40978`).then((res) => {
  //     setTemp(res.data.temp);
  //   });
  // }, []);

  const {
    background_color,
    primeimage,
    textcolor,
    font1,
    font2,
    font3,
    color1,
    color2,
    buttoncss,
    bgimage,
    buttoncolor,
    premium,
    perf,
    Linkes,
    Name,
    Clic,
  } = useSelector((state) => state.prosite_data);
  const [changetemp, setChangetemp] = useState(0); // Template or styles
  // Sidebar
  const [change, setChange] = useState(0);
  const [bgimg, setBgimg] = useState("");
  const [component, setComponent] = useState(3);
  const [components, setComponents] = useState(false);
  const [switcher, setSwitcher] = useState(true);
  const [template, setTemplate] = useState(1);
  const [header1, setHeader1] = useState("Main long header with several lines");
  const [Button1, setButton1] = useState("Click now");
  const [Link1, setLink1] = useState("");
  const [header2, setHeader2] = useState(
    "This is subheader. Stormi is a dog. She is dark grey and has long legs. Her eyes are expressive and are able to let her humans know what she is thinking."
  );
  const [file, setFile] = useState();
  const [close, setClose] = useState(Clic);
  const [link, setLink] = useState([]);
  const uploadcont = useCallback(async (d) => {
    try {
      const form = new FormData();
      form.append("file", d);
      const res = await axios.post(
        `${API}/v1/uploaddata/${id}`,
        form
      );
      if (res.data.success) {
        console.log(res.data.link);
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log("File not uploaded");
    }
  }, []);

  const getitems = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API}/v1/uploaddata/${id}`
      );
      if (res.data.success) {
        setLink(res.data.links);
      }
    } catch (e) {
      console.log("Items not fetched");
    }
  }, []);

  useEffect(() => {
    if(id){

      getitems();
    }
  }, [id]);
  let tempWed;
  let tempPhone;

  const textareaRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    adjustTextareaHeight();
    const elm = document.getElementById(active); // assuming 'active' is defined somewhere
    if (elm) {
      elm.innerText = event.target.value;
      setText(event.target.value);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const pic = useCallback(async () => {
    try {
      // const res = await axios.get(`https://pros.grovyo.xyz/api/getdata`);
      const res = await axios.get(`${APIPRO}/getdata`);
      if (res.data?.success) {
        setPic1(res.data.img);
        setBgimg(res.data.bgimg);
      } else {
        console.log(res.data.message);
      }
    } catch (e) {
      console.log("Items not fetched");
    }
  });

  useEffect(() => {
    if(id){
      pic();

    }
  }, [id]);

  console.log(Name, "Name");
  console.log(font1, "font1");
  console.log(font2, "font2");

  const savetemplate = useCallback(
    async (i) => {
      try {
        let tempWed;
        let tempPhone;
        if (template === 1) {
          tempWed = (
            <div
              style={{
                backgroundImage: bgimage ? `url(${bgimage})` : null,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: background_color || "transparent",
              }}
              className="w-[100%] h-[100%] flex flex-row"
            >
              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="">
                    <link rel="stylesheet" href={Linkes} />
                    <div
                      id="h1"
                      onClick={() => {
                        dispatch(setReduxActive("h1"));
                        setComponent(2);
                        setComponents(false);
                        const h1 = document.getElementById("h1");
                        setText(h1.innerText);
                        setActive("h1");
                        setText1(true);
                      }}
                      style={{
                        fontFamily: font1 ? font1 : Name,
                        color: color1 ? color1 : textcolor,
                        fontSize: "30px",
                        maxWidth: "80%",
                        fontWeight: "bold",
                      }}
                    >
                      {header1}
                    </div>
                    <link rel="stylesheet" href={Linkes} />
                    <div
                      id="h2"
                      onClick={() => {
                        dispatch(setReduxActive("h2"));
                        setComponent(2);
                        setComponents(false);
                        const h2 = document.getElementById("h2");
                        setText(h2.innerText);
                        setActive("h2");
                        setText1(true);
                      }}
                      style={{
                        fontFamily: font2 ? font2 : Name,
                        color: color2 ? color2 : textcolor,
                        fontSize: "20px",
                        maxWidth: "100%",
                        fontWeight: "medium",
                      }}
                    >
                      {header2}
                    </div>
                    <div
                      onClick={() => dispatch(setReduxActive("h3"))}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        marginTop: "6px",
                      }}
                    >
                      <a href={Link1}>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          style={{
                            ...buttoncss,
                            fontSize: "1",
                          }}
                        >
                          <div style={{ fontFamily: font3 ? font3 : Name }}>
                            {Button1}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={primeimage}
                  alt="pic"
                  style={{
                    objectFit: "contain",
                    height: "300px",
                    width: "300px",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          );
          tempPhone = (
            <div
              style={{
                backgroundColor: background_color,
                width: "100%",
                height: "100%",
                backgroundColor: background_color,
              }}
              className="w-[100%] h-[100%] bg-slate-100 flex flex-col"
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "96%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <link rel="stylesheet" href={Linkes} />
                  <div
                    id="h1"
                    onClick={() => {
                      setComponent(2);
                      setComponents(false);
                      const h1 = document.getElementById("h1");
                      setText(h1.innerText);
                      setActive("h1");
                      setText1(true);
                    }}
                    style={{
                      fontFamily: font1,
                      color: textcolor,
                      fontSize: "24px",
                      hover: { backgroundColor: "#e6e6e6" },
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    {header1}
                  </div>
                  <link rel="stylesheet" href={Linkes} />
                  <div
                    id="h2"
                    onClick={() => {
                      setComponent(2);
                      setComponents(false);
                      const h2 = document.getElementById("h2");
                      setText(h2.innerText);
                      setActive("h2");
                      setText1(true);
                    }}
                    style={{
                      fontFamily: font2,
                      color: textcolor,
                      fontSize: "14px",
                      height: "90px",
                      fontWeight: "bold",
                      width: "100%",
                      marginTop: "2%",
                    }}
                  >
                    {header2}
                  </div>
                  <div style={{ width: "100%", display: "flex" }}>
                    <a href={Link1}>
                      <link rel="stylesheet" href={Linkes} />
                      <div
                        style={{
                          ...buttoncss,
                          // backgroundColor: buttoncolor,
                          // color: textcolor,
                          // fontFamily: font2,
                        }}
                      >
                        {console.log(buttoncss, "buttoncss")}
                        <div style={{ fontFamily: font3 }}>{Button1}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={primeimage}
                  alt="pic"
                  className="object-contain h-[100%] w-[100%]"
                />
              </div>
            </div>
          );
        } else if (template === 2) {
          tempWed = (
            <div
              style={{
                backgroundImage: bgimage ? `url(${bgimage})` : null,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: background_color || "transparent",
              }}
              className="w-[100%] h-[100%] flex flex-row"
            >
              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="">
                    <link rel="stylesheet" href={Linkes} />
                    <div
                      id="h1"
                      onClick={() => {
                        dispatch(setReduxActive("h1"));
                        setComponent(2);
                        setComponents(false);
                        const h1 = document.getElementById("h1");
                        setText(h1.innerText);
                        setActive("h1");
                        setText1(true);
                      }}
                      style={{
                        fontFamily: font1 ? font1 : Name,
                        color: color1 ? color1 : textcolor,
                        fontSize: "30px",
                        maxWidth: "80%",
                        fontWeight: "bold",
                      }}
                    >
                      {header1}
                    </div>
                    <link rel="stylesheet" href={Linkes} />
                    <div
                      id="h2"
                      onClick={() => {
                        dispatch(setReduxActive("h2"));
                        setComponent(2);
                        setComponents(false);
                        const h2 = document.getElementById("h2");
                        setText(h2.innerText);
                        setActive("h2");
                        setText1(true);
                      }}
                      style={{
                        fontFamily: font2 ? font2 : Name,
                        color: color2 ? color2 : textcolor,
                        fontSize: "20px",
                        maxWidth: "100%",
                        fontWeight: "medium",
                      }}
                    >
                      {header2}
                    </div>
                    <div
                      onClick={() => dispatch(setReduxActive("h3"))}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        marginTop: "6px",
                      }}
                    >
                      <a href={Link1}>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          style={{
                            ...buttoncss,
                            fontSize: "1",
                          }}
                        >
                          <div style={{ fontFamily: font3 ? font3 : Name }}>
                            {Button1}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={primeimage}
                  alt="pic"
                  style={{
                    objectFit: "contain",
                    height: "300px",
                    width: "300px",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          );
          tempPhone = (
            <div
              style={{
                backgroundColor: background_color,
                width: "100%",
                height: "100%",
                backgroundColor: background_color,
              }}
              className="w-[100%] h-[100%] bg-slate-100 flex flex-col"
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "96%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <link rel="stylesheet" href={Linkes} />
                  <div
                    id="h1"
                    onClick={() => {
                      setComponent(2);
                      setComponents(false);
                      const h1 = document.getElementById("h1");
                      setText(h1.innerText);
                      setActive("h1");
                      setText1(true);
                    }}
                    style={{
                      fontFamily: font1,
                      color: textcolor,
                      fontSize: "24px",
                      hover: { backgroundColor: "#e6e6e6" },
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    {header1}
                  </div>
                  <link rel="stylesheet" href={Linkes} />
                  <div
                    id="h2"
                    onClick={() => {
                      setComponent(2);
                      setComponents(false);
                      const h2 = document.getElementById("h2");
                      setText(h2.innerText);
                      setActive("h2");
                      setText1(true);
                    }}
                    style={{
                      fontFamily: font2,
                      color: textcolor,
                      fontSize: "14px",
                      height: "90px",
                      fontWeight: "bold",
                      width: "100%",
                      marginTop: "2%",
                    }}
                  >
                    {header2}
                  </div>
                  <div style={{ width: "100%", display: "flex" }}>
                    <a href={Link1}>
                      <link rel="stylesheet" href={Linkes} />
                      <div
                        style={{
                          ...buttoncss,
                          // backgroundColor: buttoncolor,
                          // color: textcolor,
                          // fontFamily: font2,
                        }}
                      >
                        {console.log(buttoncss, "buttoncss")}
                        <div style={{ fontFamily: font3 }}>{Button1}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={primeimage}
                  alt="pic"
                  className="object-contain h-[100%] w-[100%]"
                />
              </div>
            </div>
          );
        } else if (template === 3) {
          tempWed = (
            <div
              style={{
                backgroundImage: bgimage ? `url(${bgimage})` : null,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: background_color || "transparent",
              }}
              className="w-[100%] h-[100%] flex flex-row"
            >
              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="">
                    <link rel="stylesheet" href={Linkes} />
                    <div
                      id="h1"
                      onClick={() => {
                        dispatch(setReduxActive("h1"));
                        setComponent(2);
                        setComponents(false);
                        const h1 = document.getElementById("h1");
                        setText(h1.innerText);
                        setActive("h1");
                        setText1(true);
                      }}
                      style={{
                        fontFamily: font1 ? font1 : Name,
                        color: color1 ? color1 : textcolor,
                        fontSize: "30px",
                        maxWidth: "80%",
                        fontWeight: "bold",
                      }}
                    >
                      {header1}
                    </div>
                    <link rel="stylesheet" href={Linkes} />
                    <div
                      id="h2"
                      onClick={() => {
                        dispatch(setReduxActive("h2"));
                        setComponent(2);
                        setComponents(false);
                        const h2 = document.getElementById("h2");
                        setText(h2.innerText);
                        setActive("h2");
                        setText1(true);
                      }}
                      style={{
                        fontFamily: font2 ? font2 : Name,
                        color: color2 ? color2 : textcolor,
                        fontSize: "20px",
                        maxWidth: "100%",
                        fontWeight: "medium",
                      }}
                    >
                      {header2}
                    </div>
                    <div
                      onClick={() => dispatch(setReduxActive("h3"))}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        marginTop: "6px",
                      }}
                    >
                      <a href={Link1}>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          style={{
                            ...buttoncss,
                            fontSize: "1",
                          }}
                        >
                          <div style={{ fontFamily: font3 ? font3 : Name }}>
                            {Button1}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={primeimage}
                  alt="pic"
                  style={{
                    objectFit: "contain",
                    height: "300px",
                    width: "300px",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          );
          tempPhone = (
            <div
              style={{
                backgroundColor: background_color,
                width: "100%",
                height: "100%",
                backgroundColor: background_color,
              }}
              className="w-[100%] h-[100%] bg-slate-100 flex flex-col"
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "96%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <link rel="stylesheet" href={Linkes} />
                  <div
                    id="h1"
                    onClick={() => {
                      setComponent(2);
                      setComponents(false);
                      const h1 = document.getElementById("h1");
                      setText(h1.innerText);
                      setActive("h1");
                      setText1(true);
                    }}
                    style={{
                      fontFamily: font1,
                      color: textcolor,
                      fontSize: "24px",
                      hover: { backgroundColor: "#e6e6e6" },
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    {header1}
                  </div>
                  <link rel="stylesheet" href={Linkes} />
                  <div
                    id="h2"
                    onClick={() => {
                      setComponent(2);
                      setComponents(false);
                      const h2 = document.getElementById("h2");
                      setText(h2.innerText);
                      setActive("h2");
                      setText1(true);
                    }}
                    style={{
                      fontFamily: font2,
                      color: textcolor,
                      fontSize: "14px",
                      height: "90px",
                      fontWeight: "bold",
                      width: "100%",
                      marginTop: "2%",
                    }}
                  >
                    {header2}
                  </div>
                  <div style={{ width: "100%", display: "flex" }}>
                    <a href={Link1}>
                      <link rel="stylesheet" href={Linkes} />
                      <div
                        style={{
                          ...buttoncss,
                          // backgroundColor: buttoncolor,
                          // color: textcolor,
                          // fontFamily: font2,
                        }}
                      >
                        {console.log(buttoncss, "buttoncss")}
                        <div style={{ fontFamily: font3 }}>{Button1}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={primeimage}
                  alt="pic"
                  className="object-contain h-[100%] w-[100%]"
                />
              </div>
            </div>
          );
        } else if (template === 4) {
          tempWed = (
            <div
              style={{
                backgroundImage: bgimage ? `url(${bgimage})` : null,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: background_color || "transparent",
              }}
              className="w-[100%] h-[100%] flex flex-row"
            >
              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="">
                    <link rel="stylesheet" href={Linkes} />
                    <div
                      id="h1"
                      onClick={() => {
                        dispatch(setReduxActive("h1"));
                        setComponent(2);
                        setComponents(false);
                        const h1 = document.getElementById("h1");
                        setText(h1.innerText);
                        setActive("h1");
                        setText1(true);
                      }}
                      style={{
                        fontFamily: font1 ? font1 : Name,
                        color: color1 ? color1 : textcolor,
                        fontSize: "30px",
                        maxWidth: "80%",
                        fontWeight: "bold",
                      }}
                    >
                      {header1}
                    </div>
                    <link rel="stylesheet" href={Linkes} />
                    <div
                      id="h2"
                      onClick={() => {
                        dispatch(setReduxActive("h2"));
                        setComponent(2);
                        setComponents(false);
                        const h2 = document.getElementById("h2");
                        setText(h2.innerText);
                        setActive("h2");
                        setText1(true);
                      }}
                      style={{
                        fontFamily: font2 ? font2 : Name,
                        color: color2 ? color2 : textcolor,
                        fontSize: "20px",
                        maxWidth: "100%",
                        fontWeight: "medium",
                      }}
                    >
                      {header2}
                    </div>
                    <div
                      onClick={() => dispatch(setReduxActive("h3"))}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        marginTop: "6px",
                      }}
                    >
                      <a href={Link1}>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          style={{
                            ...buttoncss,
                            fontSize: "1",
                          }}
                        >
                          <div style={{ fontFamily: font3 ? font3 : Name }}>
                            {Button1}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={primeimage}
                  alt="pic"
                  style={{
                    objectFit: "contain",
                    height: "300px",
                    width: "300px",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          );
          tempPhone = (
            <div
              style={{
                backgroundColor: background_color,
                width: "100%",
                height: "100%",
                backgroundColor: background_color,
              }}
              className="w-[100%] h-[100%] bg-slate-100 flex flex-col"
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "96%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <link rel="stylesheet" href={Linkes} />
                  <div
                    id="h1"
                    onClick={() => {
                      setComponent(2);
                      setComponents(false);
                      const h1 = document.getElementById("h1");
                      setText(h1.innerText);
                      setActive("h1");
                      setText1(true);
                    }}
                    style={{
                      fontFamily: font1,
                      color: textcolor,
                      fontSize: "24px",
                      hover: { backgroundColor: "#e6e6e6" },
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    {header1}
                  </div>
                  <link rel="stylesheet" href={Linkes} />
                  <div
                    id="h2"
                    onClick={() => {
                      setComponent(2);
                      setComponents(false);
                      const h2 = document.getElementById("h2");
                      setText(h2.innerText);
                      setActive("h2");
                      setText1(true);
                    }}
                    style={{
                      fontFamily: font2,
                      color: textcolor,
                      fontSize: "14px",
                      height: "90px",
                      fontWeight: "bold",
                      width: "100%",
                      marginTop: "2%",
                    }}
                  >
                    {header2}
                  </div>
                  <div style={{ width: "100%", display: "flex" }}>
                    <a href={Link1}>
                      <link rel="stylesheet" href={Linkes} />
                      <div
                        style={{
                          ...buttoncss,
                          // backgroundColor: buttoncolor,
                          // color: textcolor,
                          // fontFamily: font2,
                        }}
                      >
                        {console.log(buttoncss, "buttoncss")}
                        <div style={{ fontFamily: font3 }}>{Button1}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={primeimage}
                  alt="pic"
                  className="object-contain h-[100%] w-[100%]"
                />
              </div>
            </div>
          );
        } else if (template === 5) {
          tempWed = (
            <div
              style={{
                backgroundImage: bgimage ? `url(${bgimage})` : null,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: background_color || "transparent",
              }}
              className="w-[100%] h-[100%] flex flex-row"
            >
              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="">
                    <link rel="stylesheet" href={Linkes} />
                    <div
                      id="h1"
                      onClick={() => {
                        dispatch(setReduxActive("h1"));
                        setComponent(2);
                        setComponents(false);
                        const h1 = document.getElementById("h1");
                        setText(h1.innerText);
                        setActive("h1");
                        setText1(true);
                      }}
                      style={{
                        fontFamily: font1 ? font1 : Name,
                        color: color1 ? color1 : textcolor,
                        fontSize: "30px",
                        maxWidth: "80%",
                        fontWeight: "bold",
                      }}
                    >
                      {header1}
                    </div>
                    <link rel="stylesheet" href={Linkes} />
                    <div
                      id="h2"
                      onClick={() => {
                        dispatch(setReduxActive("h2"));
                        setComponent(2);
                        setComponents(false);
                        const h2 = document.getElementById("h2");
                        setText(h2.innerText);
                        setActive("h2");
                        setText1(true);
                      }}
                      style={{
                        fontFamily: font2 ? font2 : Name,
                        color: color2 ? color2 : textcolor,
                        fontSize: "20px",
                        maxWidth: "100%",
                        fontWeight: "medium",
                      }}
                    >
                      {header2}
                    </div>
                    <div
                      onClick={() => dispatch(setReduxActive("h3"))}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        marginTop: "6px",
                      }}
                    >
                      <a href={Link1}>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          style={{
                            ...buttoncss,
                            fontSize: "1",
                          }}
                        >
                          <div style={{ fontFamily: font3 ? font3 : Name }}>
                            {Button1}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={primeimage}
                  alt="pic"
                  style={{
                    objectFit: "contain",
                    height: "300px",
                    width: "300px",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          );
          tempPhone = (
            <div
              style={{
                backgroundColor: background_color,
                width: "100%",
                height: "100%",
                backgroundColor: background_color,
              }}
              className="w-[100%] h-[100%] bg-slate-100 flex flex-col"
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "96%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <link rel="stylesheet" href={Linkes} />
                  <div
                    id="h1"
                    onClick={() => {
                      setComponent(2);
                      setComponents(false);
                      const h1 = document.getElementById("h1");
                      setText(h1.innerText);
                      setActive("h1");
                      setText1(true);
                    }}
                    style={{
                      fontFamily: font1,
                      color: textcolor,
                      fontSize: "24px",
                      hover: { backgroundColor: "#e6e6e6" },
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    {header1}
                  </div>
                  <link rel="stylesheet" href={Linkes} />
                  <div
                    id="h2"
                    onClick={() => {
                      setComponent(2);
                      setComponents(false);
                      const h2 = document.getElementById("h2");
                      setText(h2.innerText);
                      setActive("h2");
                      setText1(true);
                    }}
                    style={{
                      fontFamily: font2,
                      color: textcolor,
                      fontSize: "14px",
                      height: "90px",
                      fontWeight: "bold",
                      width: "100%",
                      marginTop: "2%",
                    }}
                  >
                    {header2}
                  </div>
                  <div style={{ width: "100%", display: "flex" }}>
                    <a href={Link1}>
                      <link rel="stylesheet" href={Linkes} />
                      <div
                        style={{
                          ...buttoncss,
                          // backgroundColor: buttoncolor,
                          // color: textcolor,
                          // fontFamily: font2,
                        }}
                      >
                        {console.log(buttoncss, "buttoncss")}
                        <div style={{ fontFamily: font3 }}>{Button1}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={primeimage}
                  alt="pic"
                  className="object-contain h-[100%] w-[100%]"
                />
              </div>
            </div>
          );
        }

        const web = webRef.current;
        const canvas = await html2canvas(web);
        const webt = canvas.toDataURL();
        localStorage.setItem("image", JSON.stringify([primeimage]));
        localStorage.setItem("bgimage", JSON.stringify([bgimage]));
        const tempWeb = ReactDOMServer.renderToString(tempWed);
        const tempmob = ReactDOMServer.renderToString(tempPhone);
        const res = await axios.post(
          `${API}/v1/savetemppro/${id}`,
          {
            curr_template1: tempWeb,
            curr_template2: tempmob,
            webt,
            community: perf.community,
            store: perf.store,
            about: perf.about,
          }
        );
        if (res.data.success) {
          console.log(res.data);
        } else {
          console.log("Error");
        }
      } catch (e) {
        console.log("Template not saved");
      }
    },
    [
      header1,
      header2,
      background_color,
      textcolor,
      template,
      Button1,
      buttoncss,
      Link1,
      primeimage,
      text,
      active,
      font1,
      font2,
      font3,
      Name,
      Linkes,
    ]
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-[#424242]">
      {/* Header */}
      <div className="h-[50px] w-[100%] border-b-2  bg-white flex flex-row justify-between pn:max-sm:fixed pn:max-sm:top-0 items-center">
        <div
          onClick={() => {
            setClose(Clic);
          }}
          className="flex justify-center items-center"
        >
          <Image
            src={back}
            alt="back"
            className="object-contain h-[100%] w-[30px]"
          />
          <div className="text-[#424242] font-semibold px-2">Customization</div>
        </div>
        <div className="pn:max-sm:hidden w-[50%] flex items-center justify-center gap-2">
          <div
            onClick={() => {
              setSwitcher(true);
            }}
            className={` py-1 w-[100px] flex justify-center items-center rounded-lg gap-2 select-none cursor-pointer duration-100 ${
              switcher === true ? "bg-[#EEF2FF]" : "bg-[#f7f7f7]"
            }`}
          >
            <HiOutlineDesktopComputer
              className={`${
                switcher === true ? "text-[#6366F1]" : "text-[#424242]"
              }`}
            />
            <div
              className={`${
                switcher === true ? "text-[#6366F1]" : "text-[#424242]"
              }`}
            >
              Web
            </div>
          </div>
          <div
            onClick={() => {
              setSwitcher(false);
            }}
            className={` py-1 w-[100px] flex justify-center items-center rounded-lg gap-2 select-none cursor-pointer duration-100 ${
              switcher === false ? "bg-[#EEF2FF]" : "bg-[#f7f7f7]"
            }`}
          >
            <CiMobile2
              className={`${
                switcher === false ? "text-[#6366F1]" : "text-[#424242]"
              }`}
            />
            <div
              className={`${
                switcher === false ? "text-[#6366F1]" : "text-[#424242]"
              }`}
            >
              Mobile
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            if (premium.ispremium) {
              console.log("Membership Kharid");
            } else {
              const a = primeimage?.toString();
              savetemplate(a);
            }
          }}
          // onClick={() => {
          //   setComponents(false);
          // }}
          className={` select-none text-white px-4 py-1 hover:bg-[#6366F1] flex rounded-xl gap-1 mr-2 cursor-pointer font-semibold items-center ${
            savetemplate ? " bg-[#6366F1] " : "bg-[#7476ec]"
          }`}
        >
          <IoFlashOutline className="font-semibold" />
          <div>Set Live</div>
        </div>
      </div>
      <div className="h-[95%] w-[100%] flex flex-row pn:max-sm:flex-col-reverse bg-[#f1f1f1]">
        {/* Sidebar */}
        <div className="h-[100%] z-10 sm:w-[80px] pn:max-sm:fixed pn:max-sm:bottom-0 flex justify-center items-center pn:max-sm:w-[100%] pn:max-sm:h-[60px]">
          <div className="h-[100%] bg-white pn:max-sm:rounded-t-xl px-1 w-[100%] flex flex-col sm:gap-2 sm:pt-10  pn:max-sm:justify-between items-center pn:max-sm:flex-row sm:border-r-[2px] sm:border-[#e7e7e7] ">
            {/* Components*/}
            <div
              onClick={() => {
                setComponent(1);
                setComponents(false);
              }}
              className={`${
                component === 1
                  ? "flex flex-col bg-[#f6f6f6] rounded-xl w-[60px] sm:w-[60px] h-[54px] sm:h-[60px] justify-center items-center "
                  : "flex flex-col sm:rounded-xl w-[60px] sm:w-[60px] h-[54px] sm:h-[60px] justify-center items-center "
              }`}
            >
              {/* <Image
                src={Templates}
                alt="Templates"
                className="object-contain h-[25px] w-[25px]"
              /> */}
              <LuLayoutTemplate className="h-[25px] w-[25px] text-[#424242]" />
              <div className="text-[10px] text-[#424242] my-1">Templates</div>
            </div>
            <div
              onClick={() => {
                setComponent(2);
                setComponents(false);
              }}
              className={`${
                component === 2
                  ? "flex flex-col bg-[#f6f6f6] rounded-xl w-[60px] sm:w-[60px] h-[54px] sm:h-[60px] justify-center items-center "
                  : "flex flex-col sm:rounded-xl w-[60px] sm:w-[60px] h-[54px] sm:h-[60px] justify-center items-center "
              }`}
            >
              {/* <Image
                src={textt}
                alt="Text"
                className="object-contain h-[25px] w-[25px]"
              /> */}
              <RxText className="h-[25px] w-[25px] text-[#424242]" />
              <div className="text-[10px] text-[#424242] my-1">Text</div>
            </div>
            <div
              onClick={() => {
                setComponent(3);
                setComponents(false);
              }}
              className={`${
                component === 3
                  ? "flex flex-col bg-[#f6f6f6] rounded-xl w-[60px] sm:w-[60px] h-[54px] sm:h-[60px] justify-center items-center "
                  : "flex flex-col sm:rounded-xl w-[60px] sm:w-[60px] h-[54px] sm:h-[60px] justify-center items-center "
              }`}
            >
              {/* <Image
                src={Elements}
                alt="Elements"
                className="object-contain h-[25px] w-[25px]"
              /> */}
              <FaBuromobelexperte className="h-[25px] w-[25px] text-[#424242]" />
              <div className="text-[10px] text-[#424242] my-1">Elements</div>
            </div>
            <div
              onClick={() => {
                setComponent(4);
                setComponents(false);
              }}
              className={`${
                component === 4
                  ? "flex flex-col bg-[#f6f6f6] rounded-xl w-[60px] sm:w-[60px] h-[54px] sm:h-[60px] justify-center items-center "
                  : "flex flex-col sm:rounded-xl w-[60px] sm:w-[60px] h-[54px] sm:h-[60px] justify-center items-center "
              }`}
            >
              {/* <Image
                src={Loader}
                alt="Loader"
                className="object-contain h-[25px] w-[25px]"
              /> */}
              <MdOutlineCloudUpload className="h-[25px] w-[25px] text-[#424242]" />
              <div className="text-[10px] text-[#424242] my-1">Upload</div>
            </div>
            <div
              onClick={() => {
                setComponent(5);
                setComponents(false);
              }}
              className={`${
                component === 5
                  ? "flex flex-col bg-[#f6f6f6] rounded-xl w-[60px] sm:w-[60px] h-[54px] sm:h-[60px] justify-center items-center "
                  : "flex flex-col sm:rounded-xl w-[60px] sm:w-[60px] h-[54px] sm:h-[60px] justify-center items-center "
              }`}
            >
              {/* <Image
                src={Settings}
                alt="Settings"
                className="object-contain h-[25px] w-[25px]"
              /> */}
              <IoSettingsOutline className="h-[25px] w-[25px] text-[#424242]" />
              <div className="text-[10px] text-[#424242] my-1">Settings</div>
            </div>
          </div>
        </div>
        {/* side Components*/}
        <div
          className={` ${
            components
              ? "h-[100%] w-[0px] pn:max-sm:w-[100%] pn:max-sm:h-[0%] pn:max-sm:fixed duration-300"
              : "h-[100%] w-[500px] pn:max-sm:w-[100%] pn:max-sm:h-[70%] pn:max-sm:fixed duration-300"
          }`}
        >
          <div className="h-[100%] w-[100%] sm:flex sm:flex-row-reverse pn:max-sm:w-[100%] pn:max-sm:h-[100%] pn:max-sm:bg-[#fff] justify-end pn:max-sm:rounded-t-xl">
            <div
              className="w-full pn:max-sm:h-[10px] sm:w-[20px] flex pn:max-sm:items-end items-center justify-center"
              onClick={() => {
                setComponents(true);
              }}
            >
              <div
                className="pn:max-sm:hidden h-[80px] w-[100%] flex items-center justify-center rounded-r-xl bg-[#fff] "
                onClick={() => {
                  setComponents(true);
                }}
              >
                <RxDoubleArrowLeft className="text-[#424242] w-[16px] h-[16px]" />
              </div>

              <div
                className="sm:hidden h-[6px] w-[20%] rounded-full bg-[#f0f0f0] "
                onClick={() => {
                  setComponents(true);
                }}
              ></div>
            </div>
            {component === 1 ? (
              <div className="h-[100%] w-[98%] pn:max-sm:w-[100%] bg-[#fff] flex flex-col items-center pn:max-sm:rounded-t-3xl ">
                {/* Choose template or styles */}
                <div className="h-[6%] w-[90%] rounded-xl pn:max-sm:h-[40px] bg-[#f0f0f0] flex flex-row justify-evenly items-center mt-2">
                  <div
                    onClick={() => {
                      setChangetemp(0);
                    }}
                    className="h-[100%] w-[50%] flex justify-center items-center"
                  >
                    <div
                      className={`${
                        changetemp === 0
                          ? "text-[#868686] bg-[#dcdcdc] cursor-pointer font-medium rounded-xl w-[97%] flex h-[90%] justify-center items-center"
                          : "text-[#868686] cursor-pointer font-medium"
                      }`}
                    >
                      Templates
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setChangetemp(1);
                    }}
                    className="h-[100%] w-[50%] flex justify-center items-center"
                  >
                    <div
                      className={`${
                        changetemp === 1
                          ? "text-[#868686] bg-[#dcdcdc] cursor-pointer font-medium  rounded-xl w-[97%] flex h-[90%] justify-center items-center"
                          : " text-[#868686] cursor-pointer font-medium "
                      }`}
                    >
                      Styles
                    </div>
                  </div>
                </div>

                <div
                  className={`h-[80%] w-[90%] justify-evenly ${style.customScrollbar} overflow-auto mt-4`}
                >
                  {/* Templates */}
                  {changetemp === 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {temp && <img src={temp} alt="image" />}
                      <div
                        onClick={() => {
                          setTemplate(1);
                        }}
                        className="w-[100%] hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75 h-[100px] bg-red-100 my-2"
                      />
                      <div
                        onClick={() => {
                          setTemplate(2);
                        }}
                        className="w-[100%] h-[100px] hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75  bg-red-500 my-2"
                      ></div>
                      <div
                        onClick={() => {
                          setTemplate(3);
                        }}
                        className="w-[100%] h-[100px] hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75  bg-red-500 my-2"
                      ></div>
                      <div
                        onClick={() => {
                          setTemplate(4);
                        }}
                        className="w-[100%] h-[100px] hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75  bg-red-500 my-2"
                      ></div>
                      <div
                        onClick={() => {
                          setTemplate(5);
                        }}
                        className="w-[100%] h-[100px] hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75  bg-red-500 my-2"
                      ></div>
                    </div>
                  ) : null}
                  {/* Styles */}
                  {changetemp === 1 ? (
                    <>
                      <Styles />
                    </>
                  ) : null}
                </div>
              </div>
            ) : null}
            {component === 2 ? (
              <div className="h-[100%] w-[100%] pn:max-sm:w-[100%] overflow-auto bg-[#fff] items-center flex flex-col pn:max-sm:rounded-t-3xl ">
                <div
                  className={`${
                    text1 === false
                      ? "hidden"
                      : "w-[90%] flex flex-col items-center mt-2"
                  }`}
                >
                  <div className=" w-[100%] text-[#424242] ">Enter text</div>
                  <textarea
                    value={text}
                    placeholder="enter text what you need"
                    className=" bg-[#f7f7f7] font-semibold resize-none border rounded-xl text-[#424242] w-[100%] mt-2 p-1 outline-none "
                    ref={textareaRef}
                    onChange={handleTextareaChange}
                  />
                </div>
                <div
                  className={` ${
                    text1 === false
                      ? "h-[100%] w-[90%] justify-evenly mt-2"
                      : "h-[80%] w-[90%] justify-evenly mt-2"
                  }`}
                >
                  {" "}
                  <div className="bg-[#f7f7f7]  border rounded-xl my-2 h-[40px] flex justify-evenly overflow-hidden w-full">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-[#f7f7f7] text-[#424242] w-[80%] outline-none h-full p-2"
                      placeholder="Search"
                    />
                    <div className=" w-[10%] bg-[#f7f7f7] h-full">
                      <MdSearch className="text-[#d1d1d1] w-[100%] h-full" />
                    </div>
                  </div>
                  <Fontss search={search} />
                </div>
              </div>
            ) : null}
            {component === 3 ? (
              <div className="h-[100%] select-none w-[98%] pn:max-sm:w-[100%] bg-[#fff] flex flex-col items-center pn:max-sm:rounded-t-3xl">
                {/* Choose template or styles */}
                <div className="h-[6%] w-[90%] pn:max-sm:h-[40px] rounded-xl bg-[#f7f7f7] flex flex-row justify-evenly items-center mt-2">
                  <div
                    onClick={() => {
                      setChange(0);
                    }}
                    className="h-[100%] w-[50%] flex cursor-pointer justify-center items-center"
                  >
                    <div
                      className={`${
                        change === 0
                          ? "text-[#424242] text-[12px] bg-[#dcdcdc] rounded-xl w-[97%] flex h-[90%] justify-center items-center"
                          : " text-[#424242] text-[12px] "
                      }`}
                    >
                      Image
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setChange(1);
                    }}
                    className="h-[100%] w-[50%] flex cursor-pointer justify-center items-center"
                  >
                    <div
                      className={`${
                        change === 1
                          ? "text-[#424242] text-[12px] bg-[#dcdcdc] rounded-xl w-[97%] flex h-[90%] justify-center items-center"
                          : " text-[#424242] text-[12px] "
                      }`}
                    >
                      Background
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setChange(2);
                    }}
                    className="h-[100%] w-[50%] flex cursor-pointer justify-center items-center"
                  >
                    <div
                      className={`${
                        change === 2
                          ? "text-[#424242] text-[12px] bg-[#dcdcdc] rounded-xl w-[97%] flex h-[90%] justify-center items-center"
                          : " text-[#424242] text-[12px] "
                      }`}
                    >
                      Button
                    </div>
                  </div>
                </div>
                <div className="h-[80%] w-[90%] justify-evenly ">
                  {/* Image */}
                  {change === 0 ? (
                    <div className="h-[510px] w-[100%] ">
                      <div className="bg-[#f7f7f7] border my-2 h-[40px] flex justify-evenly rounded-xl overflow-hidden w-full">
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="bg-[#f7f7f7] text-[#424242] w-[80%] outline-none h-full p-2"
                          placeholder="Search"
                        />
                        <div className=" w-[10%] bg-[#f7f7f7] h-full">
                          <MdSearch className="text-[#cfcfcf] w-[100%] h-full" />
                        </div>
                      </div>
                      <div
                        className={`w-[100%] pn:max-sm:w-[100%] grid grid-cols-2 ${style.customScrollbar} overflow-auto h-[100%]`}
                      >
                        {search ? (
                          pic1.length > 0 &&
                          pic1
                            .filter((p, i) => {
                              return p.name.some((nameElement) =>
                                nameElement.includes(search)
                              );
                            })
                            .map((p, i) => (
                              <div
                                onClick={() => {
                                  if (!p.premium) {
                                    dispatch(setimage(p.link));
                                  } else {
                                    console.log("Aukat nhi Use Krne ki");
                                  }
                                }}
                                className={`flex items-center justify-center w-[140px] h-[140px] ${style.customScrollbar} overflow-auto hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75 select-none cursor-pointer bg-slate-200`}
                              >
                                <div className="w-[90%] h-[90%] relative">
                                  <img
                                    key={i}
                                    src={p.link}
                                    alt="pic"
                                    className="p-2 flex-row flex shadow-lg h-full w-full rounded-sm bg-slate-200 "
                                  />
                                  {p.premium && (
                                    <div className="absolute bottom-3 right-2 w-full">
                                      <FaCrown />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))
                        ) : (
                          <>
                            {" "}
                            {pic1.length > 0 &&
                              pic1.map((p, i) => (
                                <div
                                  onClick={() => {
                                    dispatch(setimage(p.link));
                                    if (p.premium) {
                                      dispatch(setPremium({ type: "image" }));
                                    } else {
                                      dispatch(
                                        setRemovePremium({ type: "image" })
                                      );
                                    }
                                  }}
                                  className={`flex items-center justify-center w-[140px] h-[140px] ${style.customScrollbar} overflow-auto hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75 select-none cursor-pointer bg-slate-200`}
                                >
                                  {console.log(premium)}

                                  <div className="w-[90%] h-[90%] relative">
                                    <img
                                      key={i}
                                      src={p.link}
                                      alt="pic"
                                      className="p-2 flex-row flex shadow-lg h-full w-full rounded-sm bg-slate-200 "
                                    />
                                    {p.premium && (
                                      <div className="absolute bottom-3 right-2 w-full">
                                        <FaCrown />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </>
                        )}
                      </div>
                      {/* <div>Recent Image</div>
                      <div className={`w-[100%] pn:max-sm:w-[100%] grid grid-cols-2 ${style.customScrollbar} overflow-auto h-[100%]`}>
                        {limg &&
                          limg.map((p, i) => (
                            <div
                              onClick={() => {
                                dispatch(setimage(p));
                              }}
                              className={`flex items-center justify-center w-[140px] h-[140px] ${style.customScrollbar} overflow-auto hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75 select-none cursor-pointer bg-slate-200`}
                            >

                              <div className="w-[90%] h-[90%]">
                                <img
                                  key={i}
                                  src={p}
                                  alt="pic"
                                  className="p-2 flex-row flex shadow-lg h-full w-full rounded-sm bg-slate-200 "
                                />
                              </div>
                            </div>
                          ))}
                      </div> */}
                    </div>
                  ) : null}
                  {/* backgrounds */}
                  {change === 1 ? (
                    <div
                      className={`h-[550px] w-[100%] ${style.customScrollbar} overflow-auto`}
                    >
                      <Background bgimg={bgimg} />
                    </div>
                  ) : null}
                  {/* Buttons */}
                  {change === 2 ? (
                    <div>
                      <div className="mt-2">
                        <div className="text-[#424242] text-[14px]">
                          Enter button Text
                        </div>
                        <input
                          value={Button1}
                          onChange={(e) => {
                            setButton1(e.target.value);
                          }}
                          placeholder="enter button text"
                          maxLength={50}
                          className=" bg-[#f7f7f7] border rounded-xl text-[#424242] w-[100%] p-1 max-h-[200px] outline-none "
                        />
                      </div>
                      <div className="mt-2">
                        <div className="text-[#424242]">Enter link</div>
                        <input
                          value={Link1}
                          onChange={(e) => {
                            setLink1(e.target.value);
                          }}
                          placeholder="Enter link "
                          className=" bg-[#f7f7f7] border rounded-xl text-[#424242] w-[100%] p-1 max-h-[200px] outline-none "
                        />
                      </div>
                      <div className="h-[450px] w-full">
                        <Button />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {component === 4 ? (
              <div className="h-[100%] select-none w-[98%] pn:max-sm:w-[100%] bg-[#fff] flex flex-col items-center pn:max-sm:rounded-t-3xl">
                <div className="h-[80%] w-[90%] justify-evenly mt-4">
                  {/* Image */}
                  <div className="h-[550px] w-[100%]">
                    <div className=" items-center flex justify-center">
                      <div className="grid bg-[#f4f4f4] text-[#424242] grid-col-1 gap-3 p-4 rounded-xl">
                        <div className="font-semibold ">Upload Photo</div>
                        <input
                          type="file"
                          name="myFile"
                          id="fileInput"
                          placeholder="Upload file"
                          value={file}
                          onChange={(e) => {
                            uploadcont(e.target.files[0]);
                          }}
                          className="w-[100%] self-start hidden text-[#424242]"
                        />
                        <label
                          htmlFor="fileInput"
                          className="flex flex-col gap-1 border-dashed border-2 rounded-md p-3 justify-center items-center"
                        >
                          <>
                            <div>
                              <MdOutlineCloudUpload className="text-4xl" />
                            </div>
                            <div className="text-xs mt-1 text-center">
                              Browse and chose the files you want to upload from
                              your computer
                            </div>
                          </>
                        </label>
                      </div>
                    </div>
                    <div className="text-[#424242] mt-2">Uploaded Images</div>
                    <div className="h-[350px] w-[290px] pn:max-sm:w-[100%] ">
                      <div
                        className={`w-[100%] pn:max-sm:w-[100%] ${style.customScrollbar} overflow-auto grid grid-cols-2 h-[100%]`}
                      >
                        {link &&
                          link.map((m, i) => (
                            <div
                              onClick={() => {
                                dispatch(setimage(m));
                              }}
                              className="flex items-center justify-center w-[130px] mt-1 h-[130px] hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75 select-none cursor-pointer bg-slate-200"
                            >
                              <div className="w-[90%] h-[90%]">
                                <img
                                  key={i}
                                  src={m}
                                  alt="pic"
                                  className="p-2 flex-row flex shadow-lg h-full w-full rounded-sm bg-slate-200 "
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/* backgrounds */}
                </div>
              </div>
            ) : null}
            {component === 5 ? (
              <div className="h-[100%] select-none w-[98%] pn:max-sm:w-[100%] bg-[#fff] flex flex-col items-center pn:max-sm:rounded-t-3xl">
                {/* Choose template or styles */}
                <div className="w-[100%] h-[100%] text-[#424242] p-3">
                  <div className="flex flex-col my-4 gap-3">
                    <div className="font-semibold">
                      <div>Edit Section</div>
                    </div>
                    <div className="flex flex-col gap-4 my-3">
                      <div className="flex flex-col w-full">
                        <div className="font-semibold">Show About Section</div>
                        <div className="flex w-full justify-between items-center">
                          <div className="text-sm max-w-[90%]">
                            Display a link to a screen with basic information
                            about you.
                          </div>
                          {perf.about ? (
                            <LiaToggleOnSolid
                              className="text-2xl"
                              onClick={() =>
                                dispatch(setPerf({ parameter: "about" }))
                              }
                            />
                          ) : (
                            <LiaToggleOffSolid
                              className="text-2xl"
                              onClick={() =>
                                dispatch(setPerf({ parameter: "about" }))
                              }
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col w-full">
                        <div className="font-semibold">Show Store Section</div>
                        <div className="flex w-full justify-between items-center">
                          <div className="text-sm max-w-[90%]">
                            Display your products
                          </div>
                          <div>
                            {perf.store ? (
                              <LiaToggleOnSolid
                                className="text-2xl"
                                onClick={() =>
                                  dispatch(setPerf({ parameter: "store" }))
                                }
                              />
                            ) : (
                              <LiaToggleOffSolid
                                className="text-2xl"
                                onClick={() =>
                                  dispatch(setPerf({ parameter: "store" }))
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col w-full">
                        <div className="font-semibold">
                          Show Community Section
                        </div>
                        <div className="flex w-full justify-between items-center">
                          <div className="text-sm max-w-[90%]">
                            Display your community with others
                          </div>
                          <div>
                            {perf.community ? (
                              <LiaToggleOnSolid
                                className="text-2xl"
                                onClick={() =>
                                  dispatch(setPerf({ parameter: "community" }))
                                }
                              />
                            ) : (
                              <LiaToggleOffSolid
                                className="text-2xl"
                                onClick={() =>
                                  dispatch(setPerf({ parameter: "community" }))
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* <div className="flex gap-2 items-center">
	<div
	  className="bg-white w-6 h-6 rounded-xl flex justify-center items-center
"
	>
	  <div>
		<GrAdd />
	  </div>
	</div>
	<div>Add a new</div>
  </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/* main */}
        <div className="h-[100%] w-[100%]  bg-[#f1f1f1] flex pn:max-sm:flex-col items-center justify-center">
          {/* Phone Switcher */}
          <div className="w-[50%] sm:hidden flex items-center justify-center fixed top-14 gap-2">
            <div
              onClick={() => {
                setSwitcher(true);
              }}
              className={` py-1 w-[100px] flex justify-center items-center rounded-lg gap-2 select-none cursor-pointer duration-100 ${
                switcher === true ? "bg-[#EEF2FF]" : "bg-[#ffffff]"
              }`}
            >
              <HiOutlineDesktopComputer
                className={`${
                  switcher === true ? "text-[#6366F1]" : "text-[#424242]"
                }`}
              />
              <div
                className={`${
                  switcher === true ? "text-[#6366F1]" : "text-[#424242]"
                }`}
              >
                Web
              </div>
            </div>
            <div
              onClick={() => {
                setSwitcher(false);
              }}
              className={` py-1 w-[100px] flex justify-center items-center rounded-lg gap-2 select-none cursor-pointer duration-100 ${
                switcher === false ? "bg-[#EEF2FF]" : "bg-[#ffffff]"
              }`}
            >
              <CiMobile2
                className={`${
                  switcher === false ? "text-[#6366F1]" : "text-[#424242]"
                }`}
              />
              <div
                className={`${
                  switcher === false ? "text-[#6366F1]" : "text-[#424242]"
                }`}
              >
                Mobile
              </div>
            </div>
          </div>
          <div
            className={`duration-75  ${
              switcher === true
                ? "h-[80%] w-[80%] bg-red-500 pn:max-ss:h-[30%] ss:max-pp:h-[40%] pp:max-sm:h-[60%] pn:max-sm:w-[98%] duration-75"
                : "h-[500px] w-[300px] bg-slate-100"
            }`}
          >
            {/* Template 1 */}
            {template === 1 ? (
              <div ref={webRef} className="w-[100%] h-[100%]">
                {switcher === true ? (
                  <div
                    style={{
                      backgroundImage: bgimage ? `url(${bgimage})` : null,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: background_color || "transparent",
                    }}
                    className="w-[100%] h-[100%] flex flex-row"
                  >
                    <div className="h-[100%] w-[50%] flex flex-col justify-center items-center">
                      <div className="h-[100%] w-[90%] flex flex-col justify-center items-center">
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          // ref={h1}
                          id="h1"
                          onClick={() => {
                            dispatch(setReduxActive("h1"));
                            setComponent(2);
                            setComponents(false);
                            const h1 = document.getElementById("h1");
                            setText(h1.innerText);
                            setActive("h1");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font1 ? font1 : Name,
                            color: color1 ? color1 : textcolor,
                          }}
                          className="text-[200%] pn:max-ss:text-[50%] ss:max-pp:text-[100%] pp:max-sm:text-[160%] hover:bg-[#e6e6e6] font-semibold text-black w-[100%] "
                        >
                          {header1}
                        </div>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h2"
                          onClick={() => {
                            dispatch(setReduxActive("h2"));

                            setComponent(2);
                            setComponents(false);
                            const h2 = document.getElementById("h2");
                            setText(h2.innerText);
                            setActive("h2");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font2 ? font2 : Name,
                            color: color2 ? color2 : textcolor,
                          }}
                          className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%] font-semibold text-black w-[100%] my-2"
                        >
                          {header2}
                        </div>
                        <div
                          onClick={() => dispatch(setReduxActive("h3"))}
                          className="w-[100%] flex justify-start"
                        >
                          <a href={Link1}>
                            <link rel="stylesheet" href={Linkes} />
                            <div
                              style={{
                                ...buttoncss,
                                // backgroundColor: buttoncolor,
                                // color: textcolor,
                                // fontFamily: Name,
                              }}
                              className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%]"
                            >
                              <div style={{ fontFamily: font3 ? font3 : Name }}>
                                {Button1}
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="h-[100%] w-[50%] justify-center items-center flex flex-col">
                      <img
                        src={primeimage}
                        alt="pic"
                        className="object-contain h-[300px] w-[300px] rounded-xl"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ backgroundColor: background_color }}
                    className="w-[100%] h-[100%] bg-slate-100 flex flex-col"
                  >
                    <div className="h-[100%] w-[100%] flex flex-col justify-center items-center">
                      <div className="h-[100%] w-[96%] flex flex-col justify-center items-center">
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h1"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h1 = document.getElementById("h1");
                            setText(h1.innerText);
                            setActive("h1");
                            setText1(true);
                          }}
                          style={{ fontFamily: font1, color: textcolor }}
                          className="text-[24px] hover:bg-[#e6e6e6] font-semibold text-black w-[100%]  "
                        >
                          {header1}
                        </div>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h2"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h2 = document.getElementById("h2");
                            setText(h2.innerText);
                            setActive("h2");
                            setText1(true);
                          }}
                          style={{ fontFamily: font2, color: textcolor }}
                          className="text-[14px] h-[90px] font-semibold text-black w-[100%] my-2"
                        >
                          {header2}
                        </div>
                        <div className="w-[100%] flex">
                          <a href={Link1}>
                            <link rel="stylesheet" href={Linkes} />
                            <div
                              style={{
                                ...buttoncss,
                                // backgroundColor: buttoncolor,
                                // color: textcolor,
                                // fontFamily: font2,
                              }}
                              // className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%]"
                            >
                              {console.log(buttoncss, "buttoncss")}
                              <div style={{ fontFamily: font3 }}>{Button1}</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="h-[100%] w-[100%] justify-center items-center flex flex-col">
                      <img
                        src={primeimage}
                        alt="pic"
                        className="object-contain h-[100%] w-[100%] "
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {template === 2 ? (
              <>
                {switcher === true ? (
                  <div
                    style={{
                      backgroundImage: bgimage ? `url(${bgimage})` : null,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: background_color || "transparent",
                    }}
                    className="w-[100%] h-[100%] bg-gray-400 flex flex-col justify-center items-center"
                  >
                    <div
                      className=" h-[95%] w-[95%] bg-cover"
                      style={{ backgroundImage: `url(${primeimage})` }}
                    >
                      <div className="h-[100%] w-[100%] flex flex-col justify-center items-center">
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h1"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h1 = document.getElementById("h1");
                            setText(h1.innerText);
                            setActive("h1");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font1 ? font1 : Name,
                            color: color1 ? color1 : textcolor,
                          }}
                          className="text-[24px] hover:bg-[#e6e6e6] text-center font-semibold text-black w-[100%]  "
                        >
                          {header1}
                        </div>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h2"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h2 = document.getElementById("h2");
                            setText(h2.innerText);
                            setActive("h2");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font2 ? font2 : Name,
                            color: color2 ? color2 : textcolor,
                          }}
                          className="text-[14px] font-semibold text-center text-black w-[70%] my-2"
                        >
                          {header2}
                        </div>
                        <div
                          onClick={() => dispatch(setReduxActive("h3"))}
                          className="w-[100%] flex justify-start"
                        >
                          <a href={Link1}>
                            <link rel="stylesheet" href={Linkes} />
                            <div
                              style={{
                                ...buttoncss,
                                // backgroundColor: buttoncolor,
                                // color: textcolor,
                                // fontFamily: Name,
                              }}
                              className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%]"
                            >
                              <div style={{ fontFamily: font3 ? font3 : Name }}>
                                {Button1}
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundImage: bgimage ? `url(${bgimage})` : null,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: background_color || "transparent",
                    }}
                    className="w-[100%] h-[100%] bg-gray-400 flex flex-col justify-center items-center"
                  >
                    <div
                      className=" h-[95%] w-[95%] bg-center"
                      style={{
                        backgroundImage: bgimage ? `url(${bgimage})` : null,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: background_color || "transparent",
                      }}
                    >
                      <div className="h-[100%] w-[100%] flex flex-col justify-center items-center">
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h1"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h1 = document.getElementById("h1");
                            setText(h1.innerText);
                            setActive("h1");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font1 ? font1 : Name,
                            color: color1 ? color1 : textcolor,
                          }}
                          className="text-[24px] hover:bg-[#e6e6e6] text-center font-semibold text-black w-[100%]  "
                        >
                          {header1}
                        </div>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h2"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h2 = document.getElementById("h2");
                            setText(h2.innerText);
                            setActive("h2");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font2 ? font2 : Name,
                            color: color2 ? color2 : textcolor,
                          }}
                          className="text-[14px] font-semibold text-center text-black w-[70%] my-2"
                        >
                          {header2}
                        </div>
                        <div
                          onClick={() => dispatch(setReduxActive("h3"))}
                          className="w-[100%] flex justify-start"
                        >
                          <a href={Link1}>
                            <link rel="stylesheet" href={Linkes} />
                            <div
                              style={{
                                ...buttoncss,
                                // backgroundColor: buttoncolor,
                                // color: textcolor,
                                // fontFamily: Name,
                              }}
                              className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%]"
                            >
                              <div style={{ fontFamily: font3 ? font3 : Name }}>
                                {Button1}
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : null}
            {/* Template 3 */}
            {template === 3 ? (
              <>
                {switcher === true ? (
                  <div
                    style={{
                      backgroundImage: bgimage ? `url(${bgimage})` : null,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: background_color || "transparent",
                    }}
                    className="w-[100%] h-[100%] bg-gray-400 flex flex-row-reverse"
                  >
                    <div className="h-[100%] w-[50%] flex flex-col justify-center items-center">
                      <div className="h-[100%] w-[90%] flex flex-col justify-center items-center">
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          // ref={h1}
                          id="h1"
                          onClick={() => {
                            dispatch(setDone1(true));
                            setComponent(2);
                            setComponents(false);
                            const h1 = document.getElementById("h1");
                            setText(h1.innerText);
                            setActive("h1");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font1 ? font1 : Name,
                            color: color1 ? color1 : textcolor,
                          }}
                          className="text-[200%] pn:max-ss:text-[50%] ss:max-pp:text-[100%] pp:max-sm:text-[160%] hover:bg-[#e6e6e6] font-semibold text-black w-[100%] "
                        >
                          {header1}
                        </div>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h2"
                          onClick={() => {
                            dispatch(setDone2(true));
                            setComponent(2);
                            setComponents(false);
                            const h2 = document.getElementById("h2");
                            setText(h2.innerText);
                            setActive("h2");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font2 ? font2 : Name,
                            color: color2 ? color2 : textcolor,
                          }}
                          className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%] font-semibold text-black w-[100%] my-2"
                        >
                          {header2}
                        </div>
                        <div
                          onClick={() => dispatch(setReduxActive("h3"))}
                          className="w-[100%] flex justify-start"
                        >
                          <a href={Link1}>
                            <link rel="stylesheet" href={Linkes} />
                            <div
                              style={{
                                ...buttoncss,
                                // backgroundColor: buttoncolor,
                                // color: textcolor,
                                // fontFamily: Name,
                              }}
                              className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%]"
                            >
                              <div style={{ fontFamily: font3 ? font3 : Name }}>
                                {Button1}
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="h-[100%] w-[50%] justify-center items-center flex flex-col">
                      <img
                        src={primeimage}
                        alt="pic"
                        className="object-contain h-[300px] w-[300px] rounded-xl"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundImage: bgimage ? `url(${bgimage})` : null,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: background_color || "transparent",
                    }}
                    className="w-[100%] h-[100%] bg-slate-100 flex flex-col-reverse"
                  >
                    <div className="h-[50%] w-[100%] flex flex-col justify-center items-center">
                      <div className="h-[100%] w-[96%] flex flex-col justify-center items-center">
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h1"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h1 = document.getElementById("h1");
                            setText(h1.innerText);
                            setActive("h1");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font1 ? font1 : Name,
                            color: color1 ? color1 : textcolor,
                          }}
                          className="text-[24px] hover:bg-[#e6e6e6] font-semibold text-black w-[100%]  "
                        >
                          {header1}
                        </div>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h2"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h2 = document.getElementById("h2");
                            setText(h2.innerText);
                            setActive("h2");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font2 ? font2 : Name,
                            color: color2 ? color2 : textcolor,
                          }}
                          className="text-[14px] h-[90px] font-semibold text-black w-[100%] my-2"
                        >
                          {header2}
                        </div>
                        <div className="w-[100%] flex">
                          <a href={Link1}>
                            <link rel="stylesheet" href={Linkes} />
                            <div
                              style={{
                                ...buttoncss,
                                backgroundColor: buttoncolor,
                                color: textcolor,
                                fontFamily: font2,
                              }}
                              // className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%]"
                            >
                              <div style={{ fontFamily: font3 }}>{Button1}</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="h-[100%] w-[100%] justify-center items-center flex flex-col">
                      <img
                        src={primeimage}
                        alt="pic"
                        className="object-contain h-[100%] w-[100%] "
                      />
                    </div>
                  </div>
                )}
              </>
            ) : null}
            {/* Template 4 */}
            {template === 4 ? (
              <>
                {switcher === true ? (
                  <div
                    style={{
                      backgroundImage: bgimage ? `url(${bgimage})` : null,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: background_color || "transparent",
                    }}
                    className="w-[100%] h-[100%] bg-gray-400 flex flex-row bg-cover"
                  >
                    <div className="h-[100%] w-[50%] flex flex-col justify-center items-center">
                      <div className="h-[100%] w-[90%] flex flex-col justify-center items-center">
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          // ref={h1}
                          id="h1"
                          onClick={() => {
                            dispatch(setDone1(true));
                            setComponent(2);
                            setComponents(false);
                            const h1 = document.getElementById("h1");
                            setText(h1.innerText);
                            setActive("h1");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font1 ? font1 : Name,
                            color: color1 ? color1 : textcolor,
                          }}
                          className="text-[200%] pn:max-ss:text-[50%] ss:max-pp:text-[100%] pp:max-sm:text-[160%] hover:bg-[#e6e6e6] font-semibold text-black w-[100%] "
                        >
                          {header1}
                        </div>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h2"
                          onClick={() => {
                            dispatch(setDone2(true));
                            setComponent(2);
                            setComponents(false);
                            const h2 = document.getElementById("h2");
                            setText(h2.innerText);
                            setActive("h2");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font2 ? font2 : Name,
                            color: color2 ? color2 : textcolor,
                          }}
                          className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%] font-semibold text-black w-[100%] my-2"
                        >
                          {header2}
                        </div>
                        <div
                          onClick={() => dispatch(setReduxActive("h3"))}
                          className="w-[100%] flex justify-start"
                        >
                          <a href={Link1}>
                            <link rel="stylesheet" href={Linkes} />
                            <div
                              style={{
                                ...buttoncss,
                                // backgroundColor: buttoncolor,
                                // color: textcolor,
                                // fontFamily: Name,
                              }}
                              className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%]"
                            >
                              <div style={{ fontFamily: font3 ? font3 : Name }}>
                                {Button1}
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundColor: background_color,
                      backgroundImage: `url(${primeimage})`,
                    }}
                    className="w-[100%] h-[100%] bg-slate-100 flex flex-col"
                  >
                    <div className="h-[50%] w-[100%] flex flex-col justify-center items-center">
                      <div className="h-[100%] w-[96%] flex flex-col justify-center items-center">
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h1"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h1 = document.getElementById("h1");
                            setText(h1.innerText);
                            setActive("h1");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font1 ? font1 : Name,
                            color: color1 ? color1 : textcolor,
                          }}
                          className="text-[24px] hover:bg-[#e6e6e6] font-semibold text-black w-[100%]  "
                        >
                          {header1}
                        </div>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h2"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h2 = document.getElementById("h2");
                            setText(h2.innerText);
                            setActive("h2");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font2 ? font2 : Name,
                            color: color2 ? color2 : textcolor,
                          }}
                          className="text-[14px] h-[90px] font-semibold text-black w-[100%] my-2"
                        >
                          {header2}
                        </div>
                        <div className="w-[100%] flex">
                          <a href={Link1}>
                            <link rel="stylesheet" href={Linkes} />
                            <div
                              style={{
                                ...buttoncss,
                                backgroundColor: buttoncolor,
                                color: textcolor,
                                fontFamily: font2,
                              }}
                              // className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%]"
                            >
                              <div style={{ fontFamily: font3 }}>{Button1}</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : null}
            {/* Template 5 */}
            {template === 5 ? (
              <>
                {switcher === true ? (
                  <div
                    style={{ backgroundColor: background_color }}
                    className="w-[100%] h-[100%] bg-gray-400 flex flex-col justify-center items-center"
                  >
                    <div
                      className=" h-[95%] w-[95%] bg-cover"
                      style={{
                        backgroundImage: bgimage ? `url(${bgimage})` : null,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: background_color || "transparent",
                      }}
                    >
                      <div className="h-[100%] w-[100%] flex flex-col justify-center items-center">
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h1"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h1 = document.getElementById("h1");
                            setText(h1.innerText);
                            setActive("h1");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font1 ? font1 : Name,
                            color: color1 ? color1 : textcolor,
                          }}
                          className="text-[24px] hover:bg-[#e6e6e6] text-center font-semibold text-black w-[100%]  "
                        >
                          {header1}
                        </div>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h2"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h2 = document.getElementById("h2");
                            setText(h2.innerText);
                            setActive("h2");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font2 ? font2 : Name,
                            color: color2 ? color2 : textcolor,
                          }}
                          className="text-[14px] font-semibold text-center text-black w-[70%] my-2"
                        >
                          {header2}
                        </div>
                        <div
                          onClick={() => dispatch(setReduxActive("h3"))}
                          className="w-[100%] flex justify-start"
                        >
                          <a href={Link1}>
                            <link rel="stylesheet" href={Linkes} />
                            <div
                              style={{
                                ...buttoncss,
                                // backgroundColor: buttoncolor,
                                // color: textcolor,
                                // fontFamily: Name,
                              }}
                              className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%]"
                            >
                              <div style={{ fontFamily: font3 ? font3 : Name }}>
                                {Button1}
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className=" w-[50%] justify-center items-center flex flex-col">
                          <img
                            src={primeimage}
                            alt="pic"
                            className="object-contain h-[300px] w-[300px] rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ backgroundColor: background_color }}
                    className="w-[100%] h-[100%] bg-gray-400 flex flex-col justify-center items-center"
                  >
                    <div
                      className=" h-[95%] w-[95%] bg-center"
                      style={{
                        backgroundImage: bgimage ? `url(${bgimage})` : null,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: background_color || "transparent",
                      }}
                    >
                      <div className="h-[100%] w-[100%] flex flex-col justify-center items-center">
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h1"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h1 = document.getElementById("h1");
                            setText(h1.innerText);
                            setActive("h1");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font1 ? font1 : Name,
                            color: color1 ? color1 : textcolor,
                          }}
                          className="text-[24px] hover:bg-[#e6e6e6] text-center font-semibold text-black w-[100%]  "
                        >
                          {header1}
                        </div>
                        <link rel="stylesheet" href={Linkes} />
                        <div
                          id="h2"
                          onClick={() => {
                            setComponent(2);
                            setComponents(false);
                            const h2 = document.getElementById("h2");
                            setText(h2.innerText);
                            setActive("h2");
                            setText1(true);
                          }}
                          style={{
                            fontFamily: font2 ? font2 : Name,
                            color: color2 ? color2 : textcolor,
                          }}
                          className="text-[14px] font-semibold text-center text-black w-[70%] my-2"
                        >
                          {header2}
                        </div>
                        <div
                          onClick={() => dispatch(setReduxActive("h3"))}
                          className="w-[100%] flex justify-start"
                        >
                          <a href={Link1}>
                            <link rel="stylesheet" href={Linkes} />
                            <div
                              style={{
                                ...buttoncss,
                                // backgroundColor: buttoncolor,
                                // color: textcolor,
                                // fontFamily: Name,
                              }}
                              className="text-[100%] pn:max-ss:text-[30%] ss:max-pp:text-[60%] pp:max-sm:text-[80%]"
                            >
                              <div style={{ fontFamily: font3 ? font3 : Name }}>
                                {Button1}
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
