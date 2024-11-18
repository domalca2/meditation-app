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
        background: require("../assets/images/practice-background/calma.png"),
      },
      {
        id: 1,
        title: "Dormir",
        icon: {
          primary: require("../assets/images/sleep-sounds-primary.png"),
          secondary: require("../assets/images/sleep-sounds-white.png"),
        },
        background: require("../assets/images/practice-background/dormir.png"),
      },
      {
        id: 2,
        title: "Bienestar",
        icon: {
          primary: require("../assets/images/yoga-primary.png"),
          secondary: require("../assets/images/yoga-white.png"),
        },
        background: require("../assets/images/practice-background/bienestar.png"),
      },
      {
        id: 3,
        title: "Enfoque",
        icon: {
          primary: require("../assets/images/focus-primary.png"),
          secondary: require("../assets/images/focus-white.png"),
        },
        background: require("../assets/images/practice-background/enfoque.png"),
      },
    ],
    types: ["Respiración", "Meditación"],
    practices: [
      {
        id: 0,
        categoryId: 2,
        type: ["Meditación"],
        name: "Intención Positiva",
        durationMillis: 104000,
        level: 1,
        audio: require("../assets/audio/practice/BI_ME_1-5_N1_Intención positiva.m4a"),
      },
      {
        id: 1,
        categoryId: 0,
        type: ["Meditación"],
        name: "Meditación guiada ",
        durationMillis: 61000,
        level: 1,
        audio: require("../assets/audio/practice/CA_ME_1-5_N1_Meditación guiada de un minuto para la calma.mp4"),
      },
    ],
  },
  quotes: [
    {
      id: 0,
      message: "La paz comienza con una sonrisa.",
      author: "Thich Nhat Hanh",
    },
  ],
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
