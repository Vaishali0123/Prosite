import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const prosite_data = createSlice({
  name: "prosite_data",
  initialState: {
    background_color: "#FFFFFF",
    premium: {
      type: [],
      ispremium: false,
    },
    link: "",
    buttontext: "Click Here",
    bgimage: "",
    // bgimage: "https://d3pirgi4usp8iq.cloudfront.net/1709921777235e5907464-9991-43ae-a731-178578054e64Animal_(2023_film)_poster.jpg",
    // bgimage: "",
    active: "",
    font1: "",
    font2: "",
    color1: "",
    color2: "",
    font3: "",
    perf: {
      about: true,
      community: true,
      store: true,
    },
    buttoncss: {
      backgroundColor: "#171717",
      padding: "4px 8px",
      color: "white",
      borderRadius: "0.4rem",
      alignSelf: "",
      borderTop: "",
      borderBottom: "",
      borderRight: "",
      borderLeft: "",
      borderRadiusTop: "",
      borderRadiusBottom: "",
      borderRadiusRight: "",
      borderRadiusLeft: "",
      boxShadow: "",
      fontBold: "",
    },
    text: "Enter your text",
    background_image: "",
    templates: "",
    styles: "",
    display_about: true,
    display_store: true,
    display_community: true,
    primeimage: "https://dn3w8358m09e7.cloudfront.net/def1234.jpeg",
    textcolor: "",
    buttoncolor: "#000",
    Linkes: "",
    Name: "",
    Clic: false,
  },
  reducers: {
    showabout: (state, action) => {
      return {
        ...state,
        display_about: true,
      };
    },
    switchbg_color: (state, action) => {
      return {
        ...state,
        background_color: action.payload,
      };
    },
    setimage: (state, action) => {
      return {
        ...state,
        primeimage: action.payload,
      };
    },
    setbuttoncss: (state, action) => {
      state.buttoncss = action.payload;
    },
    setstyle: (state, action) => {
      const { textcolor, bgcolor, buttoncss } = action.payload;
      // return {
      //   ...state,
      //   textcolor: textcolor,
      //   background_color: bgcolor,
      //   buttoncolor: buttoncss,
      // };
      state.textcolor = textcolor;
      state.background_color = bgcolor;
      state.buttoncss.backgroundColor = buttoncss;
      state.buttoncss.color = textcolor;
    },
    setFonts: (state, action) => {
      const { Linke, fontFamily } = action.payload;
      // return {
      //   ...state,
      //   Linkes: Linke,
      //   Name: fontFamily,
      // };
      if (state.font1 === "" && state.font2 === "" && state.font3 === "") {
        state.Linkes = Linke;
        state.Name = fontFamily;
      }
    },
    setbackground: (state, action) => {
      state.background_color = action.payload;
      state.bgimage = "";
    },
    setColor1: (state, action) => {
      if (state.active === "h1") {
        state.color1 = action.payload;
      }
    },
    setColor2: (state, action) => {
      if (state.active === "h2") {
        state.color2 = action.payload;
      }
    },
    setFont1: (state, action) => {
      if (state.active === "h1") {
        state.font1 = action.payload;
      }
      state.Name = "";
    },
    setFont2: (state, action) => {
      if (state.active === "h2") {
        state.font2 = action.payload;
      }
      state.Name = "";
    },
    setFont3: (state, action) => {
      if (state.active === "h3") {
        state.font3 = action.payload;
      }
      state.Name = "";
    },
    setReduxActive: (state, action) => {
      state.active = action.payload;
    },
    setBgImage: (state, action) => {
      state.bgimage = action.payload;
      state.background_color = "";
    },
    setPerf: (state, action) => {
      const { parameter } = action.payload;
      state.perf = {
        ...state.perf,
        [parameter]: !state.perf[parameter],
      };
    },
    setTextColor: (state, action) => {
      state.textcolor = action.payload;
    },
    settClic: (state, action) => {
      state.Clic = action.payload;
    },
    setPremium: (state, action) => {
      // const { ispremium, type } = action.payload
      // if (state.premium.type.length === 0 || state.premium.type.length < 0) {
      //   state.premium.ispremium = ispremium
      //   state.premium.type = [type]
      // } else {
      //   state.premium.type.push(type)
      // }
      const { type } = action.payload;
      const typeIndex = state.premium.type.indexOf(type);

      if (typeIndex === -1) {
        state.premium.type.push(type);
      } else if (typeIndex !== -1) {
        state.premium.type.splice(typeIndex, 1);
      }
      state.premium.ispremium = state.premium.type.length > 0;
    },
    setRemovePremium: (state, action) => {
      // const { ispremium, type } = action.payload
      // state.premium.ispremium = ispremium
      // state.premium.type.splice(type, 1)
      const { type } = action.payload;
      const typeIndex = state.premium.type.indexOf(type);

      if (typeIndex !== -1) {
        state.premium.type.splice(typeIndex, 1);
      }

      state.premium.ispremium = state.premium.type.length > 0;
    },
  },
});

export const {
  showabout,
  switchbg_color,
  setimage,
  setbuttoncss,
  setPremium,
  setbackground,
  setstyle,
  setFont1,
  setFont2,
  setFont3,
  setFonts,
  setColor1,
  setColor2,
  setRemovePremium,
  setTextColor,
  setReduxActive,
  setBgImage,
  setPerf,
  settClic,
} = prosite_data.actions;
export default prosite_data.reducer;
