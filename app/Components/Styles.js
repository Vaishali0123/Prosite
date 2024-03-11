import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setstyle } from "../redux/reducer/prosite_data";
import axios from "axios";

function Styles() {
  const dispatch = useDispatch();
  const [sty, setSty] = useState([]);
  const stylesdata = [
    {
      buttoncolor: "#FCCF55",
      backgroundcolor: "#FF8811",
      textcolor: "#9DD9D2",
    },
    {
      buttoncolor: "#000000",
      backgroundcolor: "#242424",
      textcolor: "#1649FF",
    },
    {
      buttoncolor: "#8B73FF",
      backgroundcolor: "#E86AA7",
      textcolor: "#E1A3FF",
    },
    {
      buttoncolor: "yellow",
      backgroundcolor: "#000000",
      textcolor: "#FFD034",
    },
    {
      buttoncolor: "white",
      backgroundcolor: "black",
      textcolor: "gray",
    },
    {
      buttoncolor: "red",
      backgroundcolor: "yellow",
      textcolor: "green",
    },
    {
      buttoncolor: "yellow",
      backgroundcolor: "#000000",
      textcolor: "#FFD034",
    },
    {
      buttoncolor: "white",
      backgroundcolor: "black",
      textcolor: "gray",
    },
    {
      buttoncolor: "red",
      backgroundcolor: "yellow",
      textcolor: "green",
    },
    {
      buttoncolor: "yellow",
      backgroundcolor: "#000000",
      textcolor: "#FFD034",
    },
    {
      buttoncolor: "white",
      backgroundcolor: "black",
      textcolor: "gray",
    },
    {
      buttoncolor: "red",
      backgroundcolor: "yellow",
      textcolor: "green",
    },
  ];
  const Styles = async () => {
    try {
      const res = await axios.get(`https://pros.grovyo.xyz/api/getstyles`);

      setSty(res.data);
    } catch (e) {
      console.log("Items not fetched");
    }
  };
  useEffect(() => {
    Styles();
  }, []);

  return (
    <div className="h-[100%] select-none w-full grid grid-cols-2 overflow-auto ">
      {sty.map((d, i) => (
        <div className="flex items-center justify-center w-[96%] h-[100px] overflow-auto mt-2 hover:bg-[#28292c] hover:shadow-lg hover:scale-105 duration-75 select-none cursor-pointer bg-slate-200">
          <div className="w-[90%] h-[90%]">
            <div
              key={i}
              onClick={() => {
                dispatch(
                  setstyle({
                    textcolor: d?.color,
                    bgcolor: d?.backgroundColor,
                    buttoncss: d?.buttoncolor,
                  })
                );
              }}
              className="px-4 py-2 flex-row flex shadow-lg h-full w-full rounded-sm bg-slate-200 text-black self-start"
            >

              <div
                style={{
                  backgroundColor: d?.color,
                  width: "33%",
                  height: "100%",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: d?.buttoncolor,
                  width: "33%",
                  height: "100%",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: d?.backgroundColor,
                  width: "33%",
                  height: "100%",
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Styles;
