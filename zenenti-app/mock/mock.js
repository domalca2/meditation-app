const mock = {
  user: {
    name: "Zeny",
    finishedTutorial: false,
  },
  practice: {
    categories: [
      {
        id: 0,
        title: "Calma",
        icon: {
          primary: require("../assets/images/sentiment-calm-primary.png"),
          secondary: require("../assets/images/sentiment-calm-white.png"),
        },
      },
      {
        id: 1,
        title: "Dormir",
        icon: {
          primary: require("../assets/images/sleep-sounds-primary.png"),
          secondary: require("../assets/images/sleep-sounds-white.png"),
        },
      },
      {
        id: 2,
        title: "Bienestar",
        icon: {
          primary: require("../assets/images/yoga-primary.png"),
          secondary: require("../assets/images/yoga-white.png"),
        },
      },
      {
        id: 3,
        title: "Enfoque",
        icon: {
          primary: require("../assets/images/focus-primary.png"),
          secondary: require("../assets/images/focus-white.png"),
        },
      },
    ],
    types: ["Respiración", "Meditación"],
    practices: [
      {
        category: "Bienestar",
        type: ["Meditación"],
        name: "Intención Positiva",
        durationMillis: 104000,
        level: 1,
        audio: require("../assets/audio/practice/BI_ME_1-5_N1_Intención positiva.m4a"),
      },
      {
        category: "Calma",
        type: ["Meditación"],
        name: "Meditación guiada de un minuto para la calma",
        durationMillis: 61000,
        level: 1,
        audio: require("../assets/audio/practice/CA_ME_1-5_N1_Meditación guiada de un minuto para la calma.mp4"),
      },
    ],
  },
  quotes: ["«Dar no nos empobrece, ni retener nos enriquece.» B.K.S"],
};

/**
 * Utility function for querying into the mock data structure. Allows you to make 'fetch'-like requests with a query string.
 * @param queryString Path to item.
 * @returns Query function.
 */
const mockQuery = (queryString) => {
  return async () => {
    const pathElements = queryString.split("/");

    let queryItem = mock;
    for (const pathElement of pathElements) {
      if (queryItem[pathElement]) {
        queryItem = queryItem[pathElement];
        continue;
      }

      if (Array.isArray(queryItem)) {
        queryItem = queryItem[Number(pathElement)] || null;
        continue;
      }

      throw `${pathElement} does not exist.`;
    }

    return queryItem;
  };
};

/**
 * Function to generate a mutation against the mock data.
 * @param queryString
 * @returns {(function(*): Promise<void>)|*}
 */
const mockMutation = (queryString) => {
  return async (value) => {
    const pathElements = queryString.split("/");

    let queryItem = mock;
    for (let i = 0; i < pathElements.length - 1; i++) {
      const pathElement = pathElements[i];

      if (queryItem[pathElement]) {
        queryItem = queryItem[pathElement];
        continue;
      }

      if (Array.isArray(queryItem)) {
        queryItem = queryItem[Number(pathElement)] || null;
        continue;
      }

      throw `${pathElement} does not exist.`;
    }

    queryItem[pathElements[pathElements.length - 1]] = value;
  };
};

export { mockQuery, mockMutation };
