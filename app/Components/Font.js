import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setColor1,
  setColor2,
  setFont1,
  setFont2,
  setFont3,
  setFonts,
  setPremium,
  setRemovePremium,
  setTextColor,
  settClic,
} from "../redux/reducer/prosite_data";
import axios from "axios";
import { ColorPicker, useColor } from "react-color-palette";
import { FaCrown } from "react-icons/fa6";
import { APIPRO } from "@/Essentials";

import style from "../pages/CustomScrollbar.module.css";
function Styles({ search }) {
  const dispatch = useDispatch();
  const [fonnt, setFonnt] = useState([]);
  const [color, setColor] = useColor("#000");
  const [clickk, setClickk] = useState(false);

  const Fonts = async () => {
    try {
      const res = await axios.get(`${APIPRO}/getfonts`);
      setFonnt(res.data);
    } catch (e) {
      console.log("Items not fetched");
    }
  };
  console.log(fonnt, "hi");
  useEffect(() => {
    Fonts();
  }, []);

  useEffect(() => {
    dispatch(setTextColor(color.hex));
    dispatch(setColor1(color.hex));
    dispatch(setColor2(color.hex));
  }, [color]);

  return (
    <>
      <div className="my-2">
        <div className="text-[#424242] font-medium text-[14px]">Text color</div>
        <div
          className=" h-[40px] w-[40px] bg-[#424242] my-2 rounded-lg"
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
        className={`h-[350px] ${style.customScrollbar} bg-white select-none w-full grid grid-cols-2 overflow-auto `}
      >
        {search ? (
          <>
            {fonnt
              .filter((f) => {
                return f.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((d, i) => (
                <div className="flex items-center justify-center w-[96%] h-[100px] overflow-auto mt-2 hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75 select-none cursor-pointer bg-slate-200">
                  <div className="w-[90%] h-[90%]">
                    <div
                      key={i}
                      onClick={() => {
                        dispatch(setFont1(d?.name));
                        dispatch(setFont2(d?.name));
                        dispatch(setFont3(d?.name));
                        dispatch(
                          setFonts({
                            Linke: d?.link,
                            fontFamily: d?.name,
                          })
                        );
                      }}
                      className="px-4 py-2 flex-row flex shadow-lg h-full w-full rounded-sm bg-slate-200 text-black self-start"
                    >
                      <link rel="stylesheet" href={d?.link} />
                      <div style={{ fontFamily: d?.name }}>{d?.name}</div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        ) : (
          <>
            {fonnt.map((d, i) => (
              <div className="flex w-[96%] h-[100px] mt-2 hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75 justify-center items-center select-none cursor-pointer bg-slate-100">
                <div
                  key={i}
                  onClick={() => {
                    dispatch(setFont1(d?.name));
                    dispatch(setFont2(d?.name));
                    dispatch(setFont3(d?.name));
                    dispatch(
                      setFonts({
                        Linke: d?.link,
                        fontFamily: d?.name,
                      })
                    );
                    if (d.premium) {
                      dispatch(setPremium({ type: "fonts" }));
                    } else {
                      dispatch(setRemovePremium({ type: "fonts" }));
                    }
                  }}
                  className="w-[90%] bg-purple-200 h-[90%]"
                >
                  <div className="px-4 py-2 flex-row flex shadow-lg h-full w-full rounded-sm bg-slate-200 text-black items-center justify-center">
                    <link rel="stylesheet" href={d?.link} />
                    <div style={{ fontFamily: d?.name }}>{d?.name}</div>
                    {d.premium && (
                      <div
                        className=" bg-[#171717] 
                     p-1 rounded-full self-end flex ml-10 "
                      >
                        <FaCrown className=" text-orange-300 " />
                      </div>
                    )}
                  </div>
                </div>
                <div className=" bottom-0"></div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Styles;
