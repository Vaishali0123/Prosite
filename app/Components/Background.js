"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setBgImage,
  setPremium,
  setRemovePremium,
  setbackground,
  setbuttoncss,
  settClic,
} from "../redux/reducer/prosite_data";
// import axios from "axios";
import style from "../pages/CustomScrollbar.module.css";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { FaCrown } from "react-icons/fa6";

function Background({ bgimg }) {
  const dispatch = useDispatch();
  const [color, setColor] = useColor("#561ecb");

  const [clickk, setClickk] = useState(false);

  // const Buttons = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:7191/api/getbuttons`);

  //     setBut(res.data);
  //   } catch (e) {
  //     console.log("Items not fetched");
  //   }
  // };
  // useEffect(() => {
  //   Buttons();
  // }, []);

  useEffect(() => {
    dispatch(setbackground(color.hex));
  }, [color]);

  return (
    <>
      <div className="my-2">
        <div className="text-[#424242] font-medium text-[14px]">
          Background color
        </div>
        <div
          className=" h-[40px] w-[40px] mt-2 bg-[#424242]  rounded-lg"
          onClick={() => {
            dispatch(settClic(true));
            setClickk(true);
          }}
        ></div>
      </div>
      <div className={clickk === false ? "hidden" : "absolute w-[250px] "}>
        <ColorPicker color={color} onChange={setColor} width="100%" />
      </div>

      <div
        className={`w-[100%] pn:max-sm:w-[100%] grid grid-cols-2 ${style.customScrollbar} overflow-auto h-[100%]`}
      >
        {bgimg &&
          bgimg.map((p, i) => (
            <div
              onClick={() => {
                dispatch(setBgImage(p.link));
                if (p.premium) {
                  dispatch(setPremium({ type: "bgimage" }));
                } else {
                  dispatch(setRemovePremium({ type: "bgimage" }));
                }
              }}
              className={`flex items-center justify-center w-[140px] h-[140px] ${style.customScrollbar} overflow-auto hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75 select-none cursor-pointer bg-slate-200`}
            >
              <div className="w-[90%] h-[90%]">
                <img
                  key={i}
                  src={p.link}
                  alt="pic"
                  className="p-2 flex-row flex shadow-lg h-full w-full rounded-sm bg-slate-200 "
                />
                {p.premium && (
                  <div
                    className=" bg-[#171717] 
                     p-1 rounded-full self-end flex ml-10 "
                  >
                    <FaCrown className=" text-orange-300 " />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      {/* <div>Recent Images</div>
      <div
        className={`w-[100%] pn:max-sm:w-[100%] grid grid-cols-2 ${style.customScrollbar} overflow-auto h-[100%]`}
      > */}
      {/* {bgimg &&
          bgimg.map((p, i) => (
            <div
              onClick={() => {
                dispatch(setBgImage(p));
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
          ))} */}
      {/* </div> */}
    </>
  );
}

export default Background;
