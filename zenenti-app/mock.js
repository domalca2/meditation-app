const mock = {
  user: {
    name: "Zeny",
  },
  practice: {
    categories: ["Calma", "Dormir", "Bienestar", "Enfoque"],
    types: ["Respiración", "Meditación"],
    practices: [
      {
        category: "Bienestar",
        type: ["Meditación"],
        name: "Intención Positiva",
        durationMillis: 104000,
        level: 1,
        audio: require("assets/audio/practice/BI_ME_1-5_N1_Intención positiva.m4a"),
      },
      {
        category: "Calma",
        type: ["Meditación"],
        name: "Meditación guiada de un minuto para la calma",
        durationMillis: 61000,
        level: 1,
        audio: require("assets/audio/practice/CA_ME_1-5_N1_Meditación guiada de un minuto para la calma.mp4"),
      },
    ],
  },
  quotes: ["«Dar no nos empobrece, ni retener nos enriquece.» B.K.S"],
};

export default mock;
