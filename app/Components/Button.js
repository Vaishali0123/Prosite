"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setbuttoncss } from "../redux/reducer/prosite_data";
import axios from "axios";
import { APIPRO } from "@/Essentials";

function Button() {
  const dispatch = useDispatch();
  // const [isHovered, setIsHovered] = useState(false);
  const [but, setBut] = useState([]);
  const Buttons = async () => {
    try {
      const res = await axios.get(`${APIPRO}/getbuttons`);

      setBut(res.data);
    } catch (e) {
      console.log("Items not fetched");
    }
  };
  useEffect(() => {
    Buttons();
  }, []);
  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };
  console.log(but);
  const buttondata = [
    {
      padding: "8px 16px", // px-4 py-2 equivalent
      color: "black", // text-white equivalent
      borderRadius: "0rem", // rounded-md equivalent
      backgroundColor: "#FFFFFF", // bg-red-500 equivalent
      borderBottom: "solid",
    },
    {
      padding: "8px 16px", // px-4 py-2 equivalent
      color: "red", // text-white equivalent
      borderRadius: "20rem", // rounded-md equivalent
      backgroundColor: "#077ff0", // bg-red-500 equivalent
    },
  ];

  return (
    <div className="h-[100%] select-none w-full grid grid-cols-2 overflow-auto ">
      {but.map((b, i) => (
        <div className="flex items-center justify-center w-[96%] h-[100px] overflow-auto mt-2 hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75 select-none cursor-pointer bg-slate-200">
          <div
            key={i}
            onClick={() => {
              console.log(b.padding)
              dispatch(setbuttoncss({
                padding: b?.padding,
                color: b?.color,
                borderRadius: b?.borderRadius,
                borderStyle: b?.borderStyle,
                backgroundColor: b?.backgroundColor,
                borderColor: b?.borderColor,
                borderTop: b?.borderTop,
                borderBottom: b?.borderBottom,
                borderRight: b?.borderRight,
                borderLeft: b?.borderLeft,
                borderRadiusTop: b?.borderRadiusTop,
                borderRadiusBottom: b?.borderRadiusBottom,
                borderRadiusRight: b?.borderRadiusRight,
                borderRadiusLeft: b?.borderRadiusLeft,
                boxShadow: b?.boxShadow,
                fontBold: b?.fontBold,
              }));
              // setButton(1);
              // setBorder(2);
              // setBgbutton("#BC3433");
              // setRound(10);
            }}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            style={{
              padding: b?.padding,
              color: b?.color,
              borderRadius: b?.borderRadius,
              borderStyle: b?.borderStyle,
              backgroundColor: b?.backgroundColor,
              borderColor: b?.borderColor,
              borderTop: b?.borderTop,
              borderBottom: b?.borderBottom,
              borderRight: b?.borderRight,
              borderLeft: b?.borderLeft,
              borderRadiusTop: b?.borderRadiusTop,
              borderRadiusBottom: b?.borderRadiusBottom,
              borderRadiusRight: b?.borderRadiusRight,
              borderRadiusLeft: b?.borderRadiusLeft,
              boxShadow: b?.boxShadow,
              fontBold: b?.fontBold,
            }}
          // className="px-4 py-2 shadow-lg rounded-sm bg-white text-black self-start"
          >
            Click Now
            {console.log(b?.backgroundColor)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Button;
