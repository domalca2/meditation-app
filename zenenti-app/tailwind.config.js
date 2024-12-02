/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3b53a1",
        secondary: "#e57400",
        tertiary: "#4444",
        quaternary: "#f4fb8a",
        disabled: "#4444",
        bgMain: "#fffefc",
        semitransparent: "rgba(244, 246, 250, 0.65)",
      },
      fontFamily: {
        "alegra-medium": ["AlegreyaSans-Medium"],
        "alegra-regular": ["AlegreyaSans-Regular"],
        "alegra-bold": ["AlegreyaSans-Bold"],
        "montserrat-bold": ["Montserrat-Bold"],
        "montserrat-medium": ["Montserrat-Medium"],
        "roboto-mono-regular": ["RobotoMono-Regular"],
      },
    },
  },
  plugins: [],
};
